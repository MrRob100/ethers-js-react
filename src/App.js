import './App.css';

import { getDefaultProvider, providers, Wallet, Contract, utils } from "ethers";

function App() {
  const greeting = 'none';
  const infuraKey = process.env.REACT_APP_INFURA_KEY;

  const provider = new providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraKey}`)

  const main = async () => {
    const balance = await provider.getBalance(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    console.log(utils.formatEther(balance));
  }

  main()



  return (
    <div className="App">
      <h3>Greeting: {greeting}</h3>
    </div>
  );
}

export default App;
