import {connection, rewards, wallet} from "./index";
import {Keypair, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet} from "@project-serum/anchor";
import {UnstakeableTicket} from "../src";
const secondaryWallet = new Wallet(Keypair.generate())

const exampleUnstakeTicketsForMain = async ()=>{
    // gets list of tickets that are being unstaked or are already unstaked
    const tickets= await rewards.getUnstakingTickets()
}
const exampleUnstakeTicketsForSecondary = async ()=>{
    // gets list of tickets that are being unstaked or are already unstaked
    const tickets= await rewards.getUnstakingTickets(secondaryWallet.publicKey)
}
const exampleUnstakeableTicketsMain = async()=>{
    const unstakingTickets= await rewards.getUnstakingTickets()
    // only gets tickets which can be unstaked including the position in the array stored on the metadata account
    const tickets= await rewards.getUnstakeableTickets(unstakingTickets)
}
const exampleUnstakeableTicketsSecondary = async()=>{
    const unstakingTickets= await rewards.getUnstakingTickets(secondaryWallet.publicKey)
    // only gets tickets which can be unstaked including the position in the array stored on the metadata account
    const tickets= await rewards.getUnstakeableTickets(unstakingTickets)
}
const exampleGetTotalUnstakeClaimableMain = async()=>{
    const unstakingTickets= await rewards.getUnstakingTickets()
    const tickets= await rewards.getUnstakeableTickets(unstakingTickets)
    // only gets tickets which can be unstaked including the position in the array stored on the metadata account
    const total= await rewards.getTotalUnstakeClaimable(tickets)
}
const exampleGetTotalUnstakeClaimableSecondaryWallet= async()=>{
    const unstakingTickets= await rewards.getUnstakingTickets(secondaryWallet.publicKey)
    const tickets= await rewards.getUnstakeableTickets(unstakingTickets)
    // only gets tickets which can be unstaked including the position in the array stored on the metadata account
    const total= await rewards.getTotalUnstakeClaimable(tickets)
}
const exampleResolveUnstakingTicketMain = async()=>{
    const unstakingTickets = await rewards.getUnstakingTickets(wallet.publicKey)
    const unstakeableTickets: UnstakeableTicket[] = await rewards.getUnstakeableTickets(unstakingTickets)
    // unstake all available tickets - returns the amount to users wallet
    const txn= await rewards.resolveUnstakingTicket(unstakeableTickets.map(x=>x.index))
    const confirmation = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[wallet.payer],{
        commitment:'confirmed'
    })
    console.log('TXN: ',confirmation)
}
const exampleResolveUnstakingTicketSecondary = async()=>{
    const unstakingTickets = await rewards.getUnstakingTickets(secondaryWallet.publicKey)
    const unstakeableTickets: UnstakeableTicket[] = await rewards.getUnstakeableTickets(unstakingTickets)
    // unstake all available tickets - returns the amount to users wallet
    const txn= await rewards.resolveUnstakingTicket(unstakeableTickets.map(x=>x.index),secondaryWallet.publicKey)
    const confirmation = await sendAndConfirmTransaction(connection,new Transaction().add(txn),[secondaryWallet.payer],{
        commitment:'confirmed'
    })
    console.log('TXN: ',confirmation)
}