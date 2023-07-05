import {rewards,wallet,connection} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet,BN} from "@project-serum/anchor";
const secondaryWallet = new Wallet(Keypair.generate())
const oneGOFX = new BN(1e9)
const exampleUnstakeMain = async ()=>{
    // unstake 1 GOFX
    const txn= await rewards.unstake(oneGOFX)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleUnstakeSecondary = async ()=>{
    // unstake 1 GOFX
    const txn= await rewards.unstake(oneGOFX,secondaryWallet.publicKey)
    if(!txn)return

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}