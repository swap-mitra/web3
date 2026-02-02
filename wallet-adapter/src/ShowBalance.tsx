import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ShowBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function getUserBalance() {
    const publicKey: any = wallet.publicKey;
    const balance: any =
      (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
      balanceElement.innerHTML = balance;
    }
  }

  getUserBalance();

  return (
    <div>
      Balance <span id="balance"></span> SOL
    </div>
  );
}
