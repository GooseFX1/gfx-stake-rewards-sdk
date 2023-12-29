import {GfxStakeRewards} from "../src";
import {Connection, Keypair, PublicKey} from "@solana/web3.js";
import { Wallet } from "@coral-xyz/anchor";

// initialize the SDK
const programId = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS")
export const connection = new Connection("http://localhost:8899",'confirmed')
export const wallet = new Wallet(Keypair.generate())
export const rewards = new GfxStakeRewards(connection,"MAINNET",programId,wallet)
// on local net requesting airdrop
const airdrop = async()=>{
    const airdropSignature=await connection.requestAirdrop(wallet.publicKey,1e9)
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
    },'confirmed');
}
airdrop()
