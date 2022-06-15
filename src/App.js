import './App.css';

import { getDefaultProvider, providers, Wallet, Contract, utilsm, utils } from "ethers";

import React, { Component, useState, useEffect } from "react";
import Select from 'react-select'

import sass from './sass/app.scss';

function App() {

  const networks = [
    { value: 'rinkeby', label: 'Rinkeby' },
    { value: 'ropsten', label: 'Ropsten' },
    { value: 'kovan', label: 'Kovan' },
    { value: 'Mainnet', label: 'Mainnet' },
  ]

  const addresses = [
    { value: 'metamask', label: 'Metamask' },
    { value: 'smart_contract_address', label: 'Smart Contract Address' },
    { value: 'robs_eth_wallet', label: 'Robs ETH wallet' },
    { value: 'robs_eth_wallet_2', label: 'Robs ETH wallet 2' },
  ]

  const [greeting, setGreeting] = useState('none');
  const [greetingInputValue, setGreetingInputValue] = useState('');
  const [network, setNetwork] = useState('ropsten');
  const [txSigner, setTxSigner] = useState('robs_eth_wallet');
  const [reciever, setReciever] = useState('robs_eth_wallet');
  const [signerAddress, setSignerAddress] = useState('');
  const [signerBalance, setSignerBalance] = useState(0);
  const [recieverAddress, setRecieverAddress] = useState('');
  const [recieverBalance, setRecieverBalance] = useState(0);

  const infuraKey = process.env.REACT_APP_INFURA_KEY;

  const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
  const abi = '[{"inputs":[],"name":"Greet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sayHey","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"what","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';

  const contractProvider = new providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  const contract = new Contract(contractAddress, abi, contractProvider);

  const provider = new providers.JsonRpcProvider(`https://${network}.infura.io/v3/${infuraKey}`)

  const wallet1 = new Wallet(process.env.REACT_APP_ETH_METAMASK_PRIVATE , provider)
  // const wallet2 = new Wallet(process.env.REACT_APP_ETH_METAMASK_PRIVATE_2 , provider)

  const sendEth = async() => {
    const tx = await wallet1.sendTransaction({
      to: process.env.REACT_APP_ETH_METAMASK_ADDRESS_2,
      value: utils.parseEther("0.1")
    })

    console.log('sending...')
    await tx.wait()
    console.log(tx)
    fetchBalances()
  }

  const fetchBalances = async () => {
    if (signerAddress !== "") {
      const balance = await provider.getBalance(signerAddress);
      setSignerBalance(utils.formatEther(balance));
    }

    if (recieverAddress !== "") {
      const balance = await provider.getBalance(recieverAddress);
      setRecieverBalance(utils.formatEther(balance));
    }
  }

  const fetchGreeting = async () => {
    const greeting = await contract.greet()
    setGreeting(greeting)
  }

  fetchBalances()
  fetchGreeting()

  const onNetworkChange = (val) => {
    const { value } = val;
    setNetwork(val.value)
  };

  const onTxSignerChange = (val) => {
    const { value } = val.value;
    setTxSigner(val.value);
    if (val.value === 'robs_eth_wallet') {
      setSignerAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    } else if (val.value === 'robs_eth_wallet_2') {
      setSignerAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS_2);
    } else {
      setSignerBalance(0);
      setSignerAddress('');
    }
  };

  const onRecieverChange = (val) => {
    const { value } = val.value;
    setReciever(val.value);
    if (val.value === 'robs_eth_wallet') {
      setRecieverAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    } else if (val.value === 'robs_eth_wallet_2') {
      setRecieverAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS_2);
    } else {
      setRecieverBalance(0);
      setRecieverAddress('');
    }
  };

  const updateGreeting = async() => {
    console.log('updating smart contract data')
    const signer = new Wallet(
      process.env.REACT_APP_ETH_METAMASK_PRIVATE,
      provider
    );

    const contractX = new Contract(contractAddress, abi, signer);
    const tx = await contractX.setGreeting(greetingInputValue);
    await tx.wait()
    console.log(tx)
    console.log('after tx')
    fetchBalances()
    fetchGreeting()
  }

  const onInputChange = (event) => {
    setGreetingInputValue(event.target.value)
  }

  useEffect(() => {
    if (txSigner === 'robs_eth_wallet') {
      setSignerAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    } else if (txSigner === 'robs_eth_wallet_2') {
      setSignerAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS_2);
    } else {
      setSignerBalance(0);
      setSignerAddress('');
    }

    if (reciever === 'robs_eth_wallet') {
      setRecieverAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS);
    } else if (txSigner === 'robs_eth_wallet_2') {
      setRecieverAddress(process.env.REACT_APP_ETH_METAMASK_ADDRESS_2);
    } else {
      setRecieverBalance(0);
      setRecieverAddress('');
    }

    fetchBalances()
  }, []);

  return (
    <div className="App">
      <div className="background-container">
        {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt=""/> */}
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      <div className="container z-10">
        <div className="card m-5 p-4">
          <div className="cardBody">
            <h3>Smart Contract Greeting: {greeting}</h3>
            <h4>Wallet Name: </h4>
            <div className="row">
              <div className="col-md-4">
                <label>Networks:</label>
                <Select options={networks} value={networks.find(item => item.value === network)} onChange={onNetworkChange} />
              </div>
              <div className="col-md-4">
                <label>Transaction Signer:</label>
                <Select options={addresses} value={addresses.find(item => item.value === txSigner)} onChange={onTxSignerChange} />
                <label>Signer address:</label>
                <p>{signerAddress}</p>
                <label>Signer balance:</label>
                <p>{signerBalance} ETH</p>
                <button className="btn btn-success" onClick={sendEth}>Send 0.1 ETH</button>
              </div>
              <div className="col-md-4">
                <label>Reciever</label>
                <Select options={addresses} value={addresses.find(item => item.value === reciever)} onChange={onRecieverChange} />
                <label>Reciever address:</label>
                <p>{recieverAddress}</p>
                <label>Reciever balance:</label>
                <p>{recieverBalance} ETH</p>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-12">
                <input onChange={onInputChange} type="text" placeholder="new greeting..."></input>
                <button className="btn btn-danger m-3" onClick={updateGreeting}>Update greeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>   
  );
}

export default App;
