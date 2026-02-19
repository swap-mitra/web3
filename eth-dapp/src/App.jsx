import {
  http,
  createConfig,
  WagmiProvider,
  useConnect,
  useConnectors,
  useConnection,
  useSendTransaction,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnect />
        <UserAddress />
        <EthSend />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function WalletConnect() {
  const connect = useConnect();
  const connectors = useConnectors();
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect.mutate({ connector })}>
      Connect: {connector.name}
    </button>
  ));
}

function UserAddress() {
  const { address } = useConnection();

  return <div>{address}</div>;
}

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction();

  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: "100000000000000000",
    });
  }

  return (
    <div>
      <input type="text" placeholder="Address ..." />
      <br />
      <button onClick={sendEth}>Send 0.1 ETH</button>
    </div>
  );
}

export default App;
