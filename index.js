import {generateMnemonic, mnemonicToSeed} from "bip39"
import {derivePath} from "ed25519-hd-key"
import {Keypair} from "@solana/web3.js"
import nacl from "tweetnacl"
import {Wallet, HDNodeWallet} from "ethers"

// spits out random 12 words => mnemonic
async function generateMn() {
    const mn = await generateMnemonic(); //This what user needs to keep safe to derive his wallets on any machine
    console.log("Mnemonic: "+mn);
    const seed = await mnemonicToSeed(mn); //Seed is just binary representation of mnemonic
    console.log("Seed Phrase: "+seed);
    deriveSolanaWallets(seed);
    deriveEthWallets(seed);
}

async function deriveSolanaWallets(seed) {
    const path = `m/44'/501'/${0}'/0'`;
    console.log("path: "+path);
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    console.log("derivedSeed: "+derivedSeed);
    const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(privateKey).publicKey;
    console.log("Solana privateKey: "+privateKey);
    console.log("Solana publicKey: "+publicKey.toBase58());
}

async function deriveEthWallets(seed) {
    const path = `m/44'/60'/${0}/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    console.log("Eth privateKey: "+privateKey);
    const wallet = new Wallet(privateKey);
    const publicKey = wallet.address;
    console.log("Eth publicKey: "+publicKey);
}

generateMn();