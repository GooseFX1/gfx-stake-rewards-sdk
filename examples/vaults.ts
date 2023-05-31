import {rewards,wallet} from "./index";

const exampleUsdcVault = async ()=>{
    const rewardVault= await rewards.getUSDCRewardVault()
}
const exampleGofxVault = async ()=>{
    const rewardVault= await rewards.getGoFxVault()
}
const exampleGofxUnstakedVault = async()=>{
    const rewardVault =  await rewards.getGoFxUnstakedVault()
}