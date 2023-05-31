import {rewards,wallet,connection} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet} from "@project-serum/anchor";
const secondaryWallet = new Wallet(Keypair.generate())

const exampleStakeDefault = async ()=>{
    // stake 1 GOFX
    const txn= await rewards.stake(1e9)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleStakeSecondary= async ()=>{
    // stake 1 GOFX
    const txn= await rewards.stake(1e9,secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}