import {rewards} from "./index";
import {PublicKey} from "@solana/web3.js";
const gofxMint = new PublicKey("GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD")
const example = async ()=>{
    //defaults to USDC
    const feesCollected= await rewards.getFeesCollected()
}

const example2 = async()=>{
    //specific mint
    const feesCollected = await rewards.getFeesCollected(gofxMint)
}