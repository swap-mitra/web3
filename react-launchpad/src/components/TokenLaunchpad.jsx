import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export function TokenLaunchpad() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function generateToken() {
    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const initialSupply = document.getElementById("initialSupply").value;

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        mintKeypair.publicKey,
        6,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID,
      ),
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    transaction.partialSign(mintKeypair);
    const response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input
        id="name"
        className="inputText"
        type="text"
        placeholder="Name"
      ></input>{" "}
      <br />
      <input
        id="symbol"
        className="inputText"
        type="text"
        placeholder="Symbol"
      ></input>{" "}
      <br />
      <input
        id="imageUrl"
        className="inputText"
        type="text"
        placeholder="Image URL"
      ></input>{" "}
      <br />
      <input
        id="initialSupply"
        className="inputText"
        type="text"
        placeholder="Initial Supply"
      ></input>{" "}
      <br />
      <button onClick={generateToken} className="btn">
        Create a token
      </button>
    </div>
  );
}
