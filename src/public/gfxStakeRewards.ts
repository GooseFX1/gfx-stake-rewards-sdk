import {
    ADDRESSES,
    CRANK_AMOUNT,
    Network,
    SEVEN_DAYS,
    TOKEN_SEEDS,
} from '../constants'
import {
    ConfirmOptions,
    Connection,
    PublicKey,
    SystemProgram,
    TransactionInstruction
} from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import {
    Program,
    AnchorProvider,
    Wallet,
} from '@project-serum/anchor'
import {getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from '@solana/spl-token'
import * as GfxStakeRewardsProgram from '../idl/gfx_stake_rewards.json'
import {Buffer} from 'buffer'
import {
    FeesCollected,
    GOFXUnstaked,
    GOFXVault,
    StakePool,
    UnstakeableTicket,
    UnstakeTicket,
    USDCRewardVault,
    UserMetadata,
    GfxStakeRewardsProgramTypes
} from '../types'
import {SSL, Swap} from 'goosefx-ssl-sdk'

export class GfxStakeRewards {
    program: Program<GfxStakeRewardsProgramTypes>
    swap: Swap
    static programId: PublicKey = new PublicKey("STKRWxT4irmTthSJydggspWmkc3ovYHx62DHLPVv1f1")
    constructor(
        public connection: Connection,
        public network: Network,
        public wallet: Wallet
    ) {
        this.program = this.newProgram()
        this.swap = this.newSwap()
    }

    /**
     * Changes connection and reinitialized the program
     * @param conn Connection to solana network
     * @param network Network it should target
     * @param commitment Optional confirm options for txn
     */
    setConnection(conn: Connection, network: Network, commitment?: ConfirmOptions) {
        this.connection = conn
        this.network = network
        this.program = this.newProgram(commitment)
        this.swap = this.newSwap()
    }

    /**
     * Sets new wallet
     * @param wallet new wallet being connected
     * @param commitment optional commitment for txn resolution
     */
    setWallet(wallet: Wallet, commitment?: ConfirmOptions) {
        this.wallet = wallet
        this.program = this.newProgram(commitment)
        this.swap = this.newSwap()
    }

    /**
     * Changes the network and reinitialized the program
     * @param network MAINNET or DEVNET
     * @param commitment optional commitment for txn resolution
     */
    setNetwork(network: Network, commitment?: ConfirmOptions) {
        this.network = network
        this.program = this.newProgram(commitment)
        this.swap = this.newSwap()
    }

    /**
     * creates a new instance of the current program
     */
    newProgram(commitment?: ConfirmOptions) {
        return new Program(
            GfxStakeRewardsProgram as GfxStakeRewardsProgramTypes,
            GfxStakeRewards.programId.toBase58(),
            new AnchorProvider(
                this.connection,
                this.wallet,
                commitment ?? {commitment: 'confirmed'}
            )
        )
    }

    /**
     * Creates a new swap instance
     */
    newSwap() {
        return new Swap(this.connection, ADDRESSES[this.network].GFX_CONTROLLER, ADDRESSES[this.network].SSL_PROGRAM_ID)
    }

    /**
     * One Time instruction called to initialize all user accounts
     * @param secondaryFunder secondary signer if they want to sign for gas fees
     * @param walletPublicKey optional wallet pubkey to act upon
     * @return TransactionInstruction to initialize user metadata account
     */
    async initializeUserAccount(
        secondaryFunder?: PublicKey,
        walletPublicKey?: PublicKey
    ): Promise<TransactionInstruction> {
        const currentWallet = (walletPublicKey ?? this.wallet.publicKey)

        const userMetadata = PublicKey.findProgramAddressSync(
            [TOKEN_SEEDS.userMetaData, currentWallet.toBuffer()],
            GfxStakeRewards.programId
        )
        const accounts = {
            owner: currentWallet,
            funder: secondaryFunder ?? currentWallet,
            stakePool: ADDRESSES[this.network].STAKE_POOL,
            userMetadata: userMetadata[0],
            systemProgram: SystemProgram.programId,
        }

        return await this.program.methods
            .initializeUserAccount()
            .accounts(accounts)
            .instruction()
    }

    /**
     * Cranks the current rewards program
     * @param mint specific token the user wants to crank e.g. USDC, BTC, GOFX
     * @returns Promise<TransactionInstruction>
     */
    async crank(mint: PublicKey): Promise<TransactionInstruction> {
        const usdcFeeSigner = PublicKey.findProgramAddressSync(
            [TOKEN_SEEDS.feeCollector],
            GfxStakeRewards.programId
        )
        const sslIn = SSL.findAddress(
            ADDRESSES[this.network].GFX_CONTROLLER,
            mint
        )
        const sslOut = SSL.findAddress(
            ADDRESSES[this.network].GFX_CONTROLLER,
            ADDRESSES[this.network].USDC_MINT
        )
        const pair = this.swap.getPairAddress(sslIn, sslOut)
        const feeSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.feeCollector], GfxStakeRewards.programId)
        const [
            liabilityVaultIn,
            swappedLiabilityVaultIn,
            liabilityVaultOut,
            swappedLiabilityVaultOut,
            userInAta,
            feeCollectorAta,
            usdcFeeVault,
        ] = await Promise.all([
            getAssociatedTokenAddress(mint, sslIn, true),
            getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, sslIn, true),
            getAssociatedTokenAddress(mint, sslOut, true),
            getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, sslOut, true),
            getAssociatedTokenAddress(mint, feeSigner[0], true),
            getAssociatedTokenAddress(mint, new PublicKey("GFXSwpZBSU9LF1gHRpRv2u967ACKKncFnfy3VKyQqwhp")),
            getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, feeSigner[0], true),
        ])

        return await this.program.methods
            .crank(CRANK_AMOUNT)
            .accounts({
                stakePool: ADDRESSES[this.network].STAKE_POOL,
                usdcFeeVault: usdcFeeVault,
                usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
                usdcFeeSigner: usdcFeeSigner[0],
                gfxSslProgram: ADDRESSES[this.network].SSL_PROGRAM_ID,
                controller: ADDRESSES[this.network].GFX_CONTROLLER,
                pair,
                sslIn,
                sslOut,
                liabilityVaultIn,
                swappedLiabilityVaultIn,
                liabilityVaultOut,
                swappedLiabilityVaultOut,
                userInAta,
                feeCollectorAta,
                userWallet: feeSigner[0],
                feeCollector: ADDRESSES[this.network].SSL_SWAP_FEE_COLLECTOR,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction()

    }

    /**
     * Stakes x amount of GoFX
     * @param amount amount of gofx to be staked (should be amount * 1e9 for 9 decimals)
     * @param walletPublicKey optional wallet pubkey to act upon
     * @returns Promise<TransactionInstruction>
     */
    async stake(amount: number, walletPublicKey?: PublicKey,): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const [ownerUsdc, ownerGofx, usdcRewardSigner, userMetadata] = await Promise.all([
            getAssociatedTokenAddress(
                ADDRESSES[this.network].USDC_MINT,
                wallet
            ),
            getAssociatedTokenAddress(
                ADDRESSES[this.network].GOFX_MINT,
                wallet
            ),
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.usdcRewardSigner],
                GfxStakeRewards.programId
            )
            ,
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.userMetaData, wallet.toBuffer()],
                GfxStakeRewards.programId
            )
        ])
        return this.program.methods
            .stake(new anchor.BN(amount))
            .accounts({
                owner: wallet,
                stakePool: ADDRESSES[this.network].STAKE_POOL,
                usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
                ownerUsdc: ownerUsdc,
                usdcRewardSigner: usdcRewardSigner[0],
                ownerGofx: ownerGofx,
                gofxVault: ADDRESSES[this.network].GOFX_VAULT,
                userMetadata: userMetadata[0],
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction()
    }

    /**
     * Unstakes a certain amount of GoFX
     * @param amount amount of GoFX to be unstaked (should be amount * 1e9 for 9 decimals)
     * @param walletPublicKey optional wallet pubkey to act upon
     * @returns Promise<TransactionInstruction>
     */
    async unstake(amount: number, walletPublicKey?: PublicKey): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const [gofxVaultSigner, usdcRewardSigner, ownerUsdc, userMetadata] = await Promise.all([
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.gofxVaultSigner],
                GfxStakeRewards.programId
            ),
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.usdcRewardSigner],
                GfxStakeRewards.programId
            ),
            getAssociatedTokenAddress(
                ADDRESSES[this.network].USDC_MINT,
                wallet
            ),
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.userMetaData, wallet.toBuffer()],
                GfxStakeRewards.programId
            )
        ])
        return this.program.methods
            .unstake(new anchor.BN(amount))
            .accounts({
                owner: wallet,
                stakePool: ADDRESSES[this.network].STAKE_POOL,
                gofxVault: ADDRESSES[this.network].GOFX_VAULT,
                gofxUnstakedVault: ADDRESSES[this.network].GOFX_UNSTAKED_VAULT,
                gofxVaultSigner: gofxVaultSigner[0],
                usdcRewardSigner: usdcRewardSigner[0],
                usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
                ownerUsdc: ownerUsdc,
                userMetadata: userMetadata[0],
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction()
    }

    /**
     * Checks if an unstake ticket is claimable
     * @param createdAt unix timestamp
     * @returns boolean true if ticket is older or equal to 7 days
     */
    isUnstakingTicketClaimable(createdAt: number) {
        const currentDate = new Date()
        // unix timestamp -> * 1000
        const sevenDaysFromCreation = new Date(createdAt * 1000)
        sevenDaysFromCreation.setTime(sevenDaysFromCreation.getTime() + SEVEN_DAYS)
        return (
            sevenDaysFromCreation.getTime() <= currentDate.getTime()
        )
    }

    /**
     * Unstake all unstakeable tickets older than 7 days
     * @param walletPublicKey optional wallet pubkey to act upon
     * @param unstakeableTickets array of unstakeable ticket indices
     * @returns Promise<TransactionInstruction>
     */
    async resolveUnstakingTicket(unstakeableTickets: number[], walletPublicKey?: PublicKey): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey

        if (!unstakeableTickets || unstakeableTickets.length == 0) {
            console.warn('[WARN]: No tickets to unstake')
        }
        const [gofxSigner, ownerGofx, userMetadata] = await Promise.all([
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.gofxUnstakedSigner],
                GfxStakeRewards.programId
            ),
            getAssociatedTokenAddress(
                ADDRESSES[this.network].GOFX_MINT,
                wallet
            ),
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.userMetaData, wallet.toBuffer()],
                GfxStakeRewards.programId
            )
        ])


        return await this.program.methods.resolveUnstakingTicket(Buffer.from(unstakeableTickets))
            .accounts({
                owner: wallet,
                gofxUnstakedVault: ADDRESSES[this.network].GOFX_UNSTAKED_VAULT,
                gofxUnstakedSigner: gofxSigner[0],
                ownerGofx: ownerGofx,
                userMetadata: userMetadata[0],
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction()
    }

    /**
     * Claims fees of the user wallet in question
     * @param walletPublicKey optional wallet to process the claim against
     * @returns Promise<TransactionInstruction>
     */
    async claimFees(walletPublicKey?: PublicKey): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const [usdcSigner, ownerUsdc, userMetadata] = await Promise.all([
            PublicKey.findProgramAddressSync(
                [TOKEN_SEEDS.usdcRewardSigner],
                GfxStakeRewards.programId
            ),
            getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, wallet),
            PublicKey.findProgramAddressSync([TOKEN_SEEDS.userMetaData, wallet.toBuffer()], GfxStakeRewards.programId)
        ])
        return await this.program.methods
            .claimFees()
            .accounts({
                owner: wallet,
                userMetadata: userMetadata[0],
                ownerUsdc: ownerUsdc,
                usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
                usdcRewardSigner: usdcSigner[0],
                gofxVault: ADDRESSES[this.network].GOFX_VAULT,
                stakePool: ADDRESSES[this.network].STAKE_POOL,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction()
    }

    /**
     * Closes the accounts for the user in question
     * @param rentRecipient person to delegate the rent to
     * @param walletPublicKey wallet of the user in question
     * @returns Promise<TransactionInstruction>
     */
    async closeUserAccount(rentRecipient?: PublicKey, walletPublicKey?: PublicKey,): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const userMetadata = PublicKey.findProgramAddressSync(
            [TOKEN_SEEDS.userMetaData, wallet.toBuffer()],
            GfxStakeRewards.programId
        )

        return await this.program.methods
            .closeUserAccount()
            .accounts({
                owner: wallet,
                rentRecipient: rentRecipient ?? wallet,
                userMetadata: userMetadata[0],
                systemProgram: SystemProgram.programId,
            })
            .instruction()
    }

    /**
     * Gets the current global stake pool
     * @returns global stake pool
     */
    async getStakePool(): Promise<StakePool> {
        const stakePoolAddress = PublicKey.findProgramAddressSync([TOKEN_SEEDS.stakePool], GfxStakeRewards.programId)
        const result = await this.program.account.stakePool.fetch(stakePoolAddress[0], 'confirmed')
        return result as any;
    }

    /**
     * Returns Global USDC Reward Vault
     * @returns USDC Reward Vault
     */
    async getUSDCRewardVault(): Promise<USDCRewardVault> {

        const usdcRewardVaultSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.usdcRewardSigner], GfxStakeRewards.programId)
        const usdcAddress = await getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, usdcRewardVaultSigner[0], true)
        return await getAccount(this.connection, usdcAddress, "processed")
    }

    /**
     * Returns fee collector global program
     * @param mint fee collector of mint to retrieve - defaults to USDC
     * @returns FeesCollected
     */
    async getFeesCollected(mint?: PublicKey): Promise<FeesCollected> {

        const mintSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.feeCollector], GfxStakeRewards.programId)
        const mintAddress = await getAssociatedTokenAddress(mint ?? ADDRESSES[this.network].USDC_MINT, mintSigner[0], true)
        return await getAccount(this.connection, mintAddress, "processed")
    }

    /**
     * Returns Global GOFX Vault
     * @returns GoFX Vault
     */
    async getGoFxVault(): Promise<GOFXVault> {

        const mintSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.gofxVaultSigner], GfxStakeRewards.programId)
        const mintAddress = await getAssociatedTokenAddress(ADDRESSES[this.network].GOFX_MINT, mintSigner[0], true)
        return await getAccount(this.connection, mintAddress, "confirmed")
    }

    /**
     * Returns Global GoFX Unstake Vault
     * @returns GoFX unstake vault
     */
    async getGoFxUnstakedVault(): Promise<GOFXUnstaked> {
        const mintSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.gofxUnstakedSigner], GfxStakeRewards.programId)
        const mintAddress = await getAssociatedTokenAddress(ADDRESSES[this.network].GOFX_MINT, mintSigner[0], true)
        return await getAccount(this.connection, mintAddress, "confirmed")
    }

    /**
     * Returns user metadata
     * @param walletPublicKey optional user wallet
     * @returns UserMetadata
     */
    async getUserMetaData(walletPublicKey?: PublicKey): Promise<UserMetadata> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const userMetaDataAddress = PublicKey.findProgramAddressSync([TOKEN_SEEDS.userMetaData, wallet.toBuffer()], GfxStakeRewards.programId)
        return await this.program.account.userMetadata.fetch(userMetaDataAddress[0], 'processed') as any
    }

    /**
     * Gets all tickets that are currently being unstaked or that can be claimed
     * @param walletPublicKey user wallet
     * @returns UnstakeTicket array
     */
    async getUnstakingTickets(walletPublicKey?: PublicKey): Promise<UnstakeTicket[]> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const userMetadata = await this.getUserMetaData(wallet)
        if (!userMetadata) {
            console.warn('[WARNING]: Could not get the users metadata')
            return []
        }
        const tickets: UnstakeTicket[] = []
        for (let i = 0; i < userMetadata.unstakingTickets.length; i++) {
            const ticket = userMetadata.unstakingTickets[i]
            if (ticket.createdAt.toNumber() > 0) {
                tickets.push(ticket)
            }
        }
        return tickets
    }

    /**
     * Returns array of unstakeable tickets
     * @param unstakingTickets user wallet
     * @returns array of {index , UnstakeTicket}
     */
    getUnstakeableTickets(unstakingTickets: UnstakeTicket[]): UnstakeableTicket[] {
        const tickets: UnstakeableTicket[] = []
        for (let i = 0; i < unstakingTickets.length; i++) {
            const createdAt = unstakingTickets[i].createdAt.toNumber()
            if (createdAt === 0) {
                // empty slot -- filled with 0's
                continue
            }
            if (this.isUnstakingTicketClaimable(unstakingTickets[i].createdAt.toNumber())) {
                tickets.push({index: i, ticket: unstakingTickets[i]})
            }
        }
        return tickets
    }

    /**
     * Gets total amount that can be withdrawn to users account
     * @param unstakeableTickets the array of unstakeable tickets
     * @returns total GFX that can be unstaked
     */
    getTotalUnstakeClaimable(unstakeableTickets: UnstakeableTicket[]): number {
        return unstakeableTickets.reduce((a, b) => a + b.ticket.totalUnstaked.toNumber(), 0.0)
    }
}
