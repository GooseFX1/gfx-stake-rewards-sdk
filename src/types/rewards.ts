import {BN} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor"
import {PublicKey} from "@solana/web3.js";
export interface UnstakeableTicket {
    index: number
    ticket:UnstakeTicket
}
export interface UnstakeTicket {
    totalUnstaked: anchor.BN
    createdAt: anchor.BN
}
export interface UserMetadata {
    owner: PublicKey
    accountOpenedAt: anchor.BN
    totalStaked: anchor.BN
    lastObservedTap: anchor.BN
    lastClaimed: anchor.BN
    totalEarned: anchor.BN
    unstakingTickets: UnstakeTicket[]
}

export interface StakePool {
    totalAccumulatedProfit: anchor.BN
    protocolActivatedAt: anchor.BN
}
export interface USDCRewardVault {}
export interface FeesCollected {}

export interface GOFXVault {}
export interface GOFXUnstaked {}
