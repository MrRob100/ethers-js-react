import logo from './logo.svg';
import './App.css';

import { getDefaultProvider, providers, Wallet, Contract } from "ethers";

import {useEffect, useState} from "react";

function App() {
  const [greeting, setGreeting] = useState('empty');
  const providerUrl = process.env.REACT_APP_PROVIDER_URL;
  const infuraKey = process.env.REACT_APP_INFURA_KEY;
  const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;

  const provider = new getDefaultProvider("ropsten", {
    infura: "b59953df17ce4e248a1198806fe9c4bd",
  });

  const signer = Wallet.createRandom();

  const abi = '[{ "inputs": [], "name": "Greet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_greeting", "type": "string" }], "name": "setGreeting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "greet", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "greeting", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]'

  const contract = new Contract(contractAddress, abi, provider)

  console.log('contract', contract);

  return (
    <div className="App">
      <h3>Greeting: {greeting}</h3>
    </div>
  );
}

export default App;
