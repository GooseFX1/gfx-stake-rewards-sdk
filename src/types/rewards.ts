import {BN} from "@project-serum/anchor";
export interface UnstakeableTicket {
    index: number
    ticket:UnstakeTicket
}
export interface UnstakeTicket {
    totalUnstaked: BN
    createdAt: BN
}
export interface UserMetadata {
    accountOpenedAt: BN
    totalStaked: BN
    lastObservedTap: BN
    lastClaimed: BN
    totalEarned: BN
    unstakingTickets: UnstakeTicket[]
}

export interface StakePool {
    totalAccumulatedProfit: BN
    protocolActivatedAt: BN
}
export interface USDCRewardVault {}
export interface FeesCollected {}

export interface GOFXVault {}
export interface GOFXUnstaked {}
