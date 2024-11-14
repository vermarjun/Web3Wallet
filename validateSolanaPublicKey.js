// to verify if the given public key has a private key associated or not
// only the public keys that lie of ed25519 curve can be controlled by a user with associated private key

import {PublicKey} from "@solana/web3.js"

const key = new PublicKey("4BJXYkfvg37zEmBbsacZjeQDpTNx91KppxFJxRqrz48e");
console.log(PublicKey.isOnCurve(key.toBytes()));