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
import {
  createAssociatedTokenAccountIdempotentInstruction, 
  getAccount, 
  getAssociatedTokenAddress, 
  getAssociatedTokenAddressSync, 
  NATIVE_MINT, 
  TOKEN_PROGRAM_ID
} from '@solana/spl-token'
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
    GfxStakeRewardsProgramTypes,
    IDL
} from '../types'
import {SSL, Swap} from 'goosefx-ssl-sdk'
import BN from 'bn.js'

export interface SwapRouteParams {
  ammProgram: PublicKey,
  state: PublicKey,
  config: PublicKey,
  authority: PublicKey,
  inputVault: PublicKey,
  outputVault: PublicKey,
  inputTokenProgram: PublicKey,
  outputTokenProgram: PublicKey,
  observationState: PublicKey,
  inputMint: PublicKey,
  outputMint: PublicKey,
  amountIn: anchor.BN,
  minOut?: anchor.BN,
  inputTokenAccount?: PublicKey
};


type LSTRewardsAccount = anchor.IdlAccounts<GfxStakeRewardsProgramTypes>['lstRewards']
type TokenCrankAccount = anchor.IdlAccounts<GfxStakeRewardsProgramTypes>['tokenCrank']

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
            IDL,
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
        const usdcMint = ADDRESSES[this.network].USDC_MINT
        const accounts = {
            owner: currentWallet,
            funder: secondaryFunder ?? currentWallet,
            stakePool: ADDRESSES[this.network].STAKE_POOL,
            userMetadata: userMetadata[0],
            systemProgram: SystemProgram.programId,
            usdcMint,
            userRewardsHoldingAccount: getAssociatedTokenAddressSync(usdcMint, userMetadata[0], true)
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
     * Cranks the current rewards program
     * @param mint specific token the user wants to crank e.g. USDC, BTC, GOFX
     * @returns Promise<TransactionInstruction>
     */
    async crankV2Single(swap: SwapRouteParams): Promise<TransactionInstruction> {
      const usdcFeeSigner = PublicKey.findProgramAddressSync(
        [TOKEN_SEEDS.feeCollector],
        GfxStakeRewards.programId
      )
      const feeSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.feeCollector], GfxStakeRewards.programId)
      const usdcFeeVault = await getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, feeSigner[0], true)
      const userInAta = swap.inputTokenAccount ?? await getAssociatedTokenAddress(swap.inputMint, feeSigner[0], true)

      return await this.program.methods
        .crankV2Single(swap.minOut ?? CRANK_AMOUNT)
        .accounts({
          stakePool: ADDRESSES[this.network].STAKE_POOL,
          usdcFeeVault: usdcFeeVault,
          usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
          usdcFeeSigner: usdcFeeSigner[0],
          gfxAmmProgram: swap.ammProgram,
          ammAuthority: swap.authority,
          ammConfig: swap.config,
          ammPoolState: swap.state,
          ammInputVault: swap.inputVault,
          ammOutputVault: swap.outputVault,
          ammObservationState: swap.observationState,
          inputTokenMint: swap.inputMint,
          outputTokenMint: ADDRESSES[this.network].USDC_MINT,
          inputTokenProgram: swap.inputTokenProgram,
          outputTokenProgram: TOKEN_PROGRAM_ID,
          userInAta
        })
        .instruction()
    }

    /**
     * Cranks the current rewards program via a two-hop swap
     * @param mint specific token the user wants to crank e.g. USDC, BTC, GOFX
     * @returns Promise<TransactionInstruction>
     */
    async crankV2TwoHop(swap1: SwapRouteParams, swap2: SwapRouteParams): Promise<TransactionInstruction[]> {
      const usdcFeeSigner = PublicKey.findProgramAddressSync(
        [TOKEN_SEEDS.feeCollector],
        GfxStakeRewards.programId
      )
      const feeSigner = PublicKey.findProgramAddressSync([TOKEN_SEEDS.feeCollector], GfxStakeRewards.programId)
      const usdcFeeVault = await getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, feeSigner[0], true)
      const userInAta = swap1.inputTokenAccount ?? await getAssociatedTokenAddress(swap1.inputMint, feeSigner[0], true)
      const intermediateAta = await getAssociatedTokenAddress(swap1.outputMint, feeSigner[0], true)

      const createAta = createAssociatedTokenAccountIdempotentInstruction(
        this.wallet.publicKey,
        intermediateAta,
        feeSigner[0],
        swap1.outputMint
      )

      const crank = await this.program.methods
        .crankV2TwoHop(swap1.minOut ?? CRANK_AMOUNT, swap2.minOut ?? CRANK_AMOUNT)
        .accounts({
          stakePool: ADDRESSES[this.network].STAKE_POOL,
          usdcFeeVault: usdcFeeVault,
          usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
          usdcFeeSigner: usdcFeeSigner[0],
          gfxAmmProgram: swap1.ammProgram,
          ammAuthority: swap1.authority,
          ammConfig: swap1.config,
          hop1AmmPoolState: swap1.state,
          hop1AmmInputVault: swap1.inputVault,
          hop1AmmOutputVault: swap1.outputVault,
          hop1AmmObservationState: swap1.observationState,
          userInAta,

          inputTokenMint: swap1.inputMint,
          intermediateTokenMint: swap1.outputMint,
          outputTokenMint: swap2.outputMint,
          inputTokenProgram: swap1.inputTokenProgram,
          intermediateTokenProgram: swap1.outputTokenProgram,
          outputTokenProgram: TOKEN_PROGRAM_ID,
          intermediateTokenAccount: intermediateAta,

          hop2AmmPoolState: swap2.state,
          hop2AmmInputVault: swap2.inputVault,
          hop2AmmOutputVault: swap2.outputVault,
          hop2AmmObservationState: swap2.observationState,
        })
        .instruction()

      return [createAta, crank]
    }

    /**
     * Runs a permissionless crank to transfer usdc from the usdc-reward-vault to
     * a particular user's rewards-holding-account
     * @param user user to crank rewards for
     * @returns Promise<TransactionInstruction>
     */
    async crankUserRewardsHoldingAccount(user?: PublicKey): Promise<TransactionInstruction> {
      user = user ?? this.wallet.publicKey;
      const [usdcRewardSigner, userMetadata] = await Promise.all([
        PublicKey.findProgramAddressSync(
            [TOKEN_SEEDS.usdcRewardSigner],
            GfxStakeRewards.programId
        )
        ,
        PublicKey.findProgramAddressSync(
            [TOKEN_SEEDS.userMetaData, user.toBuffer()],
            GfxStakeRewards.programId
        )
      ])
      const userRewardsHoldingAccount = await getAssociatedTokenAddress(
        ADDRESSES[this.network].USDC_MINT,
        userMetadata[0],
        true
      )

      return await this.program.methods
        .crankUserRewardsHoldingAccount()
        .accounts({
          user,
          userRewardsHoldingAccount,
          stakePool: ADDRESSES[this.network].STAKE_POOL,
          gofxVault: ADDRESSES[this.network].GOFX_VAULT,
          usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
          usdcRewardSigner: usdcRewardSigner[0],
          userMetadata: userMetadata[0],
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .instruction()
    }
    
    /**
     * Stakes x amount of GoFX
     * @param amount amount of gofx to be staked (should be amount * 1e9 for 9 decimals)
     * @param walletPublicKey optional wallet pubkey to act upon
     * @returns Promise<TransactionInstruction>
     */
    async stake(amount: anchor.BN, walletPublicKey?: PublicKey,): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const [ownerGofx, usdcRewardSigner, userMetadata] = await Promise.all([
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
        const userRewardsHoldingAccount = await getAssociatedTokenAddress(
          ADDRESSES[this.network].USDC_MINT,
          userMetadata[0],
          true
        )
        return this.program.methods
            .stake(amount)
            .accounts({
                owner: wallet,
                stakePool: ADDRESSES[this.network].STAKE_POOL,
                usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
                userRewardsHoldingAccount,
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
    async unstake(amount: anchor.BN, walletPublicKey?: PublicKey): Promise<TransactionInstruction> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const [gofxVaultSigner, usdcRewardSigner, userMetadata] = await Promise.all([
            PublicKey.findProgramAddressSync(
              [TOKEN_SEEDS.gofxVaultSigner],
              GfxStakeRewards.programId
            ),
            PublicKey.findProgramAddressSync(
              [TOKEN_SEEDS.usdcRewardSigner],
              GfxStakeRewards.programId
            ),
            PublicKey.findProgramAddressSync(
              [TOKEN_SEEDS.userMetaData, wallet.toBuffer()],
              GfxStakeRewards.programId
            )
        ])
        const userRewardsHoldingAccount = await getAssociatedTokenAddress(
          ADDRESSES[this.network].USDC_MINT,
          userMetadata[0],
          true
        )
        return this.program.methods
          .unstake(amount)
          .accounts({
              owner: wallet,
              stakePool: ADDRESSES[this.network].STAKE_POOL,
              gofxVault: ADDRESSES[this.network].GOFX_VAULT,
              gofxUnstakedVault: ADDRESSES[this.network].GOFX_UNSTAKED_VAULT,
              gofxVaultSigner: gofxVaultSigner[0],
              usdcRewardSigner: usdcRewardSigner[0],
              usdcRewardVault: ADDRESSES[this.network].USDC_REWARD_VAULT,
              userRewardsHoldingAccount,
              userMetadata: userMetadata[0],
              tokenProgram: TOKEN_PROGRAM_ID,
          })
          .instruction()
    }

    /**
     * Initializes a token-crank account with configured params
     * @param tokenCrank The newly-created address for the token-crank state
     * @param outputMint The output mint for crank operations
     * @param destinationOwner The owner of token-accounts for crank tokens output
     * @param payer The payer
     * @returns 
     */
    async initializeTokenCrank(
      tokenCrank: PublicKey,
      outputMint: PublicKey,
      destinationOwner: PublicKey,
      payer?: PublicKey
    ): Promise<TransactionInstruction> {
      const crankSigner = this.getCrankSignerPDA(tokenCrank).publicKey
      const crankOutputVault = await getAssociatedTokenAddress(
        outputMint,
        crankSigner,
        true
      )

      return await this.program.methods
        .initializeTokenCrank(destinationOwner)
        .accounts({
          payer: payer ?? this.wallet.publicKey,
          tokenCrank,
          crankSigner,
          outputMint,
          crankOutputVault,
        })
        .instruction()
    }

    /**
     * Crank tokens for a specific crank account
     * @param crank The account for which to crank tokens
     * @param swap The swap route params
     * @returns an array on instructions
     */
    async crankTokensViaGammaSwap(
      crank: PublicKey,
      swap: SwapRouteParams,
      output?: {
        owner: PublicKey,
        mint: PublicKey,
      } 
    ): Promise<TransactionInstruction[]> {
      const crankSigner = this.getCrankSignerPDA(crank).publicKey
      const crankOutput = output ?? await this.getTokenCrankAccount(crank).then((res) => {
        return {
          owner: res.destinationOwner,
          mint: res.outputMint
        }
      })
      if (!crankOutput) {
        throw new Error(`Failed to fetch crank information`)
      }
      const isFinalStep = swap.outputMint.toBase58() === crankOutput.mint.toBase58()

      const inputTokenAccount = swap.inputTokenAccount ?? getAssociatedTokenAddressSync(swap.inputMint, crankSigner, true)
      const outputTokenAccount = getAssociatedTokenAddressSync(swap.outputMint, crankSigner, true)

      const instructions: TransactionInstruction[] = []
      if (!isFinalStep) {
        // crank-signer token-account for its output mint is expected to be initialized, so only create the token-account if
        // it is an intermediate(and not final) step
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            this.wallet.publicKey,
            outputTokenAccount,
            crankSigner,
            swap.outputMint,
          )
        )
      }

      const destinationOutputTokenAccount = isFinalStep ? getAssociatedTokenAddressSync(crankOutput.mint, crankOutput.owner, true) : null
      if (destinationOutputTokenAccount) {
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            this.wallet.publicKey,
            destinationOutputTokenAccount,
            crankOutput.owner,
            crankOutput.mint,
          )
        )
      }

      const crankIx = await this.program.methods
        .crankTokensGammaStep(swap.amountIn, swap.minOut ?? new BN(0))
        .accounts({
          crank,
          crankSigner,
          inputTokenMint: swap.inputMint,
          outputTokenMint: swap.outputMint,
          inputTokenAccount,
          outputTokenAccount,
          gammaAuthority: swap.authority,
          gammaConfig: swap.config,
          gammaPoolState: swap.state,
          gammaPoolObservationState: swap.observationState,
          gammaPoolInputVault: swap.inputVault,
          gammaPoolOutputVault: swap.outputVault,
          inputTokenProgram: swap.inputTokenProgram,
          outputTokenProgram: swap.outputTokenProgram,
          destinationOwner: crankOutput.owner,
          destinationOutputTokenAccount,
          gammaProgram: swap.ammProgram,
        })
        .instruction()

      instructions.push(crankIx)

      return instructions
    }

    /**
     * Initialize the `LSTRewards` account
     * @param authority The configured authority for the account
     * @param destinationReserveAccount The reserve-account to receive SOL
     * @param payer The rent payer
     * @returns an instruction
     */
    async initializeLstRewards(
      authority: PublicKey,
      destinationReserveAccount: PublicKey,
      payer?: PublicKey
    ): Promise<TransactionInstruction> {
      return this.program.methods
        .initializeLstRewards(authority, destinationReserveAccount)
        .accounts({
          payer: payer ?? this.wallet.publicKey,
        })
        .instruction()
    }

    /**
     * Updates params for the `LSTRewards` account
     * @param newAuthority The (optional) new authority to configure
     * @param newDestinationReserveAccount The (optional) new destination-reserve-account to configure
     * @param authority The authority for the transaction
     * @returns An instruction
     */
    async updateLstRewards(
      newAuthority: PublicKey | null,
      newDestinationReserveAccount: PublicKey | null,
      authority?: PublicKey
    ): Promise<TransactionInstruction> {
      return this.program.methods
        .updateLstRewardsParams(newAuthority, newDestinationReserveAccount)
        .accounts({
          authority: authority ?? this.wallet.publicKey,
        })
        .instruction()
    }

    /**
     * Transfer LST rewards
     * @param reserveAccount The stake reserve account to transfer SOL to
     * @param outputMint Typically SOL
     * @returns An instruction
     */
    async transferLSTRewards(reserveAccount: PublicKey, outputMint?: PublicKey): Promise<TransactionInstruction> {
      const lstRewards = this.getLSTRewardsPDA().publicKey
      const outputTokenMint = outputMint ?? NATIVE_MINT
      const rewardsTokenAccount = await getAssociatedTokenAddress(outputTokenMint, lstRewards, true)

      return this.program.methods
        .transferLstRewards()
        .accounts({
          rewardsTokenAccount, 
          reserveAccount,         
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
        const [usdcSigner, ownerUsdc,  userMetadata] = await Promise.all([
            PublicKey.findProgramAddressSync(
              [TOKEN_SEEDS.usdcRewardSigner],
              GfxStakeRewards.programId
            ),
            getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, wallet),
            PublicKey.findProgramAddressSync([TOKEN_SEEDS.userMetaData, wallet.toBuffer()], GfxStakeRewards.programId)
        ])
        const userRewardsHoldingAccount = await getAssociatedTokenAddress(
          ADDRESSES[this.network].USDC_MINT,
          userMetadata[0],
          true
        )
        return await this.program.methods
            .claimFees()
            .accounts({
                owner: wallet,
                userMetadata: userMetadata[0],
                userRewardsHoldingAccount,
                userUsdcAccount: ownerUsdc,
                usdcRewardSigner: usdcSigner[0],
                tokenProgram: TOKEN_PROGRAM_ID,
                usdcMint: ADDRESSES[this.network].USDC_MINT
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
        const userRewardsHoldingAccount = await getAssociatedTokenAddress(
          ADDRESSES[this.network].USDC_MINT,
          userMetadata[0],
          true
        )
        return await this.program.methods
            .closeUserAccount()
            .accounts({
                owner: wallet,
                rentRecipient: rentRecipient ?? wallet,
                userMetadata: userMetadata[0],
                systemProgram: SystemProgram.programId,
                userRewardsHoldingAccount, 
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
     * Derives the address of the crank-signer
     * @param programOverride optional program-id override
     * @returns the derived public-key and nonce
     */
    getCrankSignerPDA(crank: PublicKey, programOverride?: PublicKey): { publicKey: PublicKey, nonce: number } {
      const [publicKey, nonce] =  PublicKey.findProgramAddressSync(
        [Buffer.from('crank_signer', 'utf-8'), crank.toBuffer()], programOverride ?? GfxStakeRewards.programId
      )
      return { publicKey, nonce }
    }

    /**
     * Derives the address of the LSTRewards account
     * @param programOverride optional program-id override
     * @returns the derived public-key and nonce
     */
    getLSTRewardsPDA(programOverride?: PublicKey): { publicKey: PublicKey, nonce: number } {
      const [publicKey, nonce] =  PublicKey.findProgramAddressSync(
        [Buffer.from('lst_rewards', 'utf-8')], programOverride ?? GfxStakeRewards.programId
      )
      return { publicKey, nonce }
    }

    /**
     * Fetches deserialized state for a `LSTRewards` account
     * @param address the account address
     * @returns the deserialized account
     */
    async getLSTRewardsAccount(address?: PublicKey): Promise<LSTRewardsAccount> {
      const lstRewards = address ?? this.getLSTRewardsPDA().publicKey
      return this.program.account.lstRewards.fetch(lstRewards)
    }

    /**
     * Fetches deserialized state for a `TokenCrank` account
     * @param address the account address
     * @returns the deserialized account
     */
    async getTokenCrankAccount(address: PublicKey): Promise<TokenCrankAccount> {
      return this.program.account.tokenCrank.fetch(address)
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
    async getUserRewardsHoldingAccount(walletPublicKey?:PublicKey): Promise<PublicKey> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const [userMetadata] = await Promise.all([
            PublicKey.findProgramAddressSync([TOKEN_SEEDS.userMetaData, wallet.toBuffer()], GfxStakeRewards.programId)
        ])
        return await getAssociatedTokenAddress(ADDRESSES[this.network].USDC_MINT, userMetadata[0],true)
    }
    async getUserRewardsHoldingAmount(walletPublicKey?:PublicKey): Promise<string> {
        const wallet = walletPublicKey ?? this.wallet.publicKey
        const userRewardsHoldingAccount = await this.getUserRewardsHoldingAccount(wallet)
        const accountInfo = await this.connection.getParsedAccountInfo(userRewardsHoldingAccount,'confirmed')
        if(!accountInfo || !accountInfo.value)return "0.0"
        
        return (accountInfo.value.data as any).parsed.info.tokenAmount.uiAmountString ?? "0.0"
    }
}
