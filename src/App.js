import './App.css';

import { getDefaultProvider, providers, Wallet, Contract, utils } from "ethers";

import React, { Component, useState } from "react";
import Select from 'react-select'

import sass from './sass/app.scss';

function App() {

  const appSigners = [
    { value: 'metamask', label: 'Metamask' },
    { value: 'smart_contract_address', label: 'Smart Contract Address' },
    { value: 'robs_eth_wallet', label: 'Robs ETH wallet' },
  ]

  const networks = [
    { value: 'rinkbey', label: 'Rinkbey' },
    { value: 'ropsten', label: 'Ropsten' },
    { value: 'covan', label: 'Covan' },
    { value: 'Mainnet', label: 'Mainnet' },
  ]

  const [greeting, setGreeting] = useState('none');

  const infuraKey = process.env.REACT_APP_INFURA_KEY;

  const provider = new providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${infuraKey}`)

  const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
  const abi = '[{"inputs":[],"name":"Greet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sayHey","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"what","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';

  const contract = new Contract(contractAddress, abi, provider);

  const fetchBalance = async () => {
    const balance = await provider.getBalance(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    console.log('balance', utils.formatEther(balance));
  }

  const fetchGreeting = async () => {
    const greeting = await contract.greet()
    setGreeting(greeting)
  }

  fetchBalance()
  fetchGreeting()

  return (
    <div className="App">
      <div className="background-container">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt=""/>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      <div className="container z-10">
        <div className="card m-5 p-4">
          <div className="cardBody">
            <h3>Smart Contract Greeting: {greeting}</h3>
            <div className="row">
              <div className="col-md-4">
                <label>Networks:</label>
                <Select options={networks} />
              </div>
              <div className="col-md-4">
                <label>Transaction Signer:</label>
                <Select options={appSigners} />
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>   
  );
}

export default App;
