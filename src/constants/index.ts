import {PublicKey} from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import {Buffer} from 'buffer'

export type Network = 'MAINNET' | 'DEVNET'
export const ADDRESSES = {
    MAINNET: {
        GOFX_MINT: new PublicKey(
            'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD'
        ),
        USDC_MINT: new PublicKey(
            'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        ),
        CONTROLLER_PROGRAM_ID: new PublicKey(
            '8KJx48PYGHVC9fxzRRtYp4x4CM2HyYCm2EjVuAP4vvrx'
        ),
        GFX_CONTROLLER: new PublicKey(
            '8CxKnuJeoeQXFwiG6XiGY2akBjvJA5k3bE52BfnuEmNQ'
        ),
        SSL_PROGRAM_ID: new PublicKey(
            '7WduLbRfYhTJktjLw5FDEyrqoEv61aTTCuGAetgLjzN5'
        ),
        STAKE_POOL: new PublicKey(
            'Eu8eZF1dfR1hXUwHbngEsDBf3kMhLuRSSaYcr67USBbj'
        ),
        USDC_REWARD_VAULT: new PublicKey(
            '7QUUirYGtKRnNjTXqjofX3oDsRnAwNw5ngSz9e8EQdec'
        ),
        GOFX_VAULT: new PublicKey(
            'D9DhGq6MctzCzABhFybyuj3KHj3QbeG5H3JzXMGysY3T'
        ),
        GOFX_UNSTAKED_VAULT: new PublicKey(
            '5GZjjTaiB6FW8kgBwh8egSBuRk7HEBkzdUGrHmf3QzJt'
        ),
        SSL_SWAP_FEE_COLLECTOR: new PublicKey(
            "GFXSwpZBSU9LF1gHRpRv2u967ACKKncFnfy3VKyQqwhp"
        )
    },
    DEVNET: {
        GOFX_MINT: new PublicKey(
            'GFXMaFQyhNSfjLcjyT1p1iHyJUT8kWbGkH3WXudynuYU'
        ),
        USDC_MINT: new PublicKey(
            'USDC4bFm2MkhE24BJy8VTT3r2Pr14V6E7fX6fm4w2q9'
        ),
        CONTROLLER_PROGRAM_ID: new PublicKey(
            '3Gwyhoudx8XgYry8dzKQ2GGsofkUdm7VZUvddHxchL3x'
        ),
        GFX_CONTROLLER: new PublicKey(
            'ApkmzBaTPUAeVj3QuqDcz6iLE6xZSLd29nke4McqrKw5'
        ),
        SSL_PROGRAM_ID: new PublicKey(
            'JYe7AcuQ7CqhkGvchJGvSKF8ei41FuDKb1h47qkbFNf'
        ),
        STAKE_POOL: new PublicKey(
            'Eu8eZF1dfR1hXUwHbngEsDBf3kMhLuRSSaYcr67USBbj'
        ),
        USDC_REWARD_VAULT: new PublicKey(
            '8G6dPFQcdrqGwyb7sJSCthNQr1b6WsN5j7cJzFMfE3iG'
        ),
        GOFX_VAULT: new PublicKey(
            '37QhJWmUX4gNDiYsadxjqkoWZRUeb3ahVaUtrFawtTXy'
        ),
        GOFX_UNSTAKED_VAULT: new PublicKey(
            '28BSkwKCGDMfUcKLZzLUgKtZzRKAFei1wYJ5deHxLjku'
        ),
        SSL_SWAP_FEE_COLLECTOR: new PublicKey(
            "11111111111111111111111111111111"
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