import {rewards,wallet} from "./index";

const exampleGetAccount = async ()=>{
    const rewardVault= await rewards.getUserRewardsHoldingAccount(wallet.publicKey)
}
const exampleGetAccountValue = async()=>{
    const rewardVault= await rewards.getUserRewardsHoldingAmount(wallet.publicKey)
}