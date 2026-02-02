import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    const toElement = document.getElementById("to") as HTMLInputElement;
    const amountElement = document.getElementById("amount") as HTMLInputElement;

    if (!toElement || !amountElement || !wallet.publicKey) return;

    const to = toElement.value;
    const amount: any = amountElement.value;

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    );

    await wallet.sendTransaction(transaction, connection);
    alert("Sent " + amount + " SOL to " + to);
  }

  return (
    <div>
      <input id="to" type="text" placeholder="To" />
      <input id="amount" type="text" placeholder="Amount" />
      <button onClick={sendTokens}>Send</button>
    </div>
  );
}
