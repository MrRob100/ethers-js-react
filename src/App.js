import './App.css';

import { getDefaultProvider, providers, Wallet, Contract, utils } from "ethers";

function App() {
  const greeting = 'none';
  const infuraKey = process.env.REACT_APP_INFURA_KEY;

  const provider = new providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${infuraKey}`)

  const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
  const abi = '[{"inputs":[],"name":"Greet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sayHey","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"what","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';

  const contract = new Contract(contractAddress, abi, provider);

  const main = async () => {
    const balance = await provider.getBalance(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    console.log('balance', utils.formatEther(balance));

    const greeting2 = await contract.greet()
    console.log('greeting', greeting2); 
  }

  main()



  return (
    <div className="App">
      <h3>Greeting: {greeting}</h3>
    </div>
  );
}

export default App;
