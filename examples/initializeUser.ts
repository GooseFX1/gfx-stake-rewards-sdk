import {rewards,wallet,connection} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet} from "@coral-xyz/anchor";
const secondaryWallet = new Wallet(Keypair.generate())

const exampleInitializeForMainWallet = async ()=>{
    const txn= await rewards.initializeUserAccount()

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleInitializeMainButPayForSecondary = async ()=>{
    const txn= await rewards.initializeUserAccount(secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleInitializeForSecondary = async ()=>{
    const txn= await rewards.initializeUserAccount(null,secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleInitializeForSecondaryButMainPays = async ()=>{
    const txn= await rewards.initializeUserAccount(wallet.publicKey,secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}