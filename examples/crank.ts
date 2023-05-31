import {rewards,wallet,connection} from "./index";
import {PublicKey, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
const usdcMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
const example = async ()=>{
    const txn= await rewards.crank(usdcMint)
    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}