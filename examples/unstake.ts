import {rewards,wallet,connection} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet} from "@project-serum/anchor";
const secondaryWallet = new Wallet(Keypair.generate())

const exampleUnstakeMain = async ()=>{
    // unstake 1 GOFX
    const txn= await rewards.unstake(1e9)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleUnstakeSecondary = async ()=>{
    // unstake 1 GOFX
    const txn= await rewards.unstake(1e9,secondaryWallet.publicKey)
    if(!txn)return

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}