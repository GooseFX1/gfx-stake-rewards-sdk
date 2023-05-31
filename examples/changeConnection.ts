import {rewards} from "./index";
import {Connection} from "@solana/web3.js";

const exampleSetCustomRPC = async ()=>{
  await rewards.setConnection(new Connection("http://my.custom.rpc.node",'confirmed'),"DEVNET")
}
const exampleSetCustomRPCWithCustomResolution = async ()=>{
  await rewards.setConnection(new Connection("http://my.custom.rpc.node",'confirmed'),"DEVNET",{commitment:'finalized'})
}