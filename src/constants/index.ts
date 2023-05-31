import {PublicKey} from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import {Buffer} from 'buffer'
import 'dotenv/config'

export type Network = 'MAINNET' | 'DEVNET'
export const ADDRESSES = {
    MAINNET: {
        GOFX_MINT: new PublicKey(
            process.env.GOFX_MINT || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        STAKE_POOL: new PublicKey(
            process.env.STAKE_POOL || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        USDC_REWARD_VAULT: new PublicKey(
            process.env.USDC_REWARD_VAULT || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        GOFX_VAULT: new PublicKey(
            process.env.GOFX_VAULT || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        GOFX_UNSTAKED_VAULT: new PublicKey(
            process.env.GOFX_UNSTAKED_VAULT || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        USDC_MINT: new PublicKey(
            process.env.USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        ),
        CONTROLLER_PROGRAM_ID: new PublicKey(
            process.env.CONTROLLER_PROGRAM_ID || '8KJx48PYGHVC9fxzRRtYp4x4CM2HyYCm2EjVuAP4vvrx'
        ),
        GFX_CONTROLLER: new PublicKey(
            process.env.GFX_CONTROLLER || '8CxKnuJeoeQXFwiG6XiGY2akBjvJA5k3bE52BfnuEmNQ'
        ),
        SSL_PROGRAM_ID: new PublicKey(
            process.env.SSL_PROGRAM_ID || '7WduLbRfYhTJktjLw5FDEyrqoEv61aTTCuGAetgLjzN5'
        ),
        FEE_COLLECTOR: new PublicKey(
            process.env.FEE_COLLECTOR || "GFXSwpZBSU9LF1gHRpRv2u967ACKKncFnfy3VKyQqwhp"
        )
    },
    DEVNET: {
        GOFX_MINT: new PublicKey(
            process.env.GOFX_MINT_DEVNET || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        STAKE_POOL: new PublicKey(
            process.env.STAKE_POOL_DEVNET || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        USDC_REWARD_VAULT: new PublicKey(
            process.env.USDC_REWARD_VAULT_DEVNET || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        GOFX_VAULT: new PublicKey(
            process.env.GOFX_VAULT_DEVNET || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        GOFX_UNSTAKED_VAULT: new PublicKey(
            process.env.GOFX_UNSTAKED_VAULT_DEVNET || 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        USDC_MINT: new PublicKey(
            process.env.USDC_MINT_DEVNET || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        ),
        CONTROLLER_PROGRAM_ID: new PublicKey(
            process.env.CONTROLLER_PROGRAM_ID_DEVNET || '8KJx48PYGHVC9fxzRRtYp4x4CM2HyYCm2EjVuAP4vvrx'
        ),
        GFX_CONTROLLER: new PublicKey(
            process.env.GFX_CONTROLLER_DEVNET || '8CxKnuJeoeQXFwiG6XiGY2akBjvJA5k3bE52BfnuEmNQ'
        ),
        SSL_PROGRAM_ID: new PublicKey(
            process.env.SSL_PROGRAM_ID_DEVNET || '7WduLbRfYhTJktjLw5FDEyrqoEv61aTTCuGAetgLjzN5'
        ),
        FEE_COLLECTOR: new PublicKey(
            process.env.FEE_COLLECTOR_DEVNET || "GFXSwpZBSU9LF1gHRpRv2u967ACKKncFnfy3VKyQqwhp"
        )
    },
}
export const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

export const TOKEN_SEEDS = {
    gofxVaultSigner: Buffer.from('gofx_vault', 'utf-8'),
    gofxUnstakedSigner: Buffer.from('gofx_unstaked', 'utf-8'),
    feeCollector: Buffer.from('fees_collected', 'utf-8'),
    usdcRewardSigner: Buffer.from('usdc_reward_vault', 'utf-8'),
    stakePool: Buffer.from('stake_pool', 'utf-8'),
    userMetaData: Buffer.from('user_metadata', 'utf-8'),
    gfxSSLPair: Buffer.from('GFX-SSL-Pair', 'utf-8'),
}
export const CRANK_AMOUNT = new anchor.BN(0.0)
