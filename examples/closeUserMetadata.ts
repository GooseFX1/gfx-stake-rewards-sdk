import {rewards,wallet,connection} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet} from "@coral-xyz/anchor";
const secondaryWallet = new Wallet(Keypair.generate())

const exampleRentToMain= async ()=>{
    const txn= await rewards.closeUserAccount()

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleCloseMainButRentToSecondary = async ()=>{
    // send rent lamport to second wallet
    const txn= await rewards.closeUserAccount(secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleCloseSecondary = async ()=>{
    // closes your account for another wallet than your main - as an example
    // send rent lamport to second wallet
    const txn= await rewards.closeUserAccount(null,secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleCloseSecondaryAndRentToMain = async ()=>{
    // closes your account for another wallet than your main and your main receives the rent
    // send rent lamport to second wallet
    const txn= await rewards.closeUserAccount(wallet.publicKey,secondaryWallet.publicKey)

    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}