import {rewards} from "./index";
import {Wallet} from "@project-serum/anchor";
import {Keypair} from "@solana/web3.js";
const secondaryWallet =  new Wallet(Keypair.generate())
const exampleChangeWallet = async ()=>{
    await rewards.setWallet(secondaryWallet)
}
