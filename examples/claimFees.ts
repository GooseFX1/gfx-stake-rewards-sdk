import {rewards,wallet,connection} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet} from "@project-serum/anchor";
const secondaryWallet = new Wallet(Keypair.generate())

const exampleWalletInstanceUsed = async ()=>{
    // claims available fees
    const txn= await rewards.claimFees()
    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}
const exampleAnotherWallet = async ()=>{
    // claims available fees
    const txn= await rewards.claimFees(secondaryWallet.publicKey)
    const confirmationId = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{commitment:'confirmed'})
    console.log("TXN: ",confirmationId)
}