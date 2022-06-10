import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
// import {useEffect} from "react";

function App() {
  // const providerUrl = process.env.PROVIDER_URL;
  // const infuraKey = process.env.INFURA_KEY;
  //
  // const web3 = new Web3(providerUrl + infuraKey);

  // const contractAddress = process.env.SMART_CONTRACT_ADDRESS;
  // const abi = JSON.parse('[{"inputs": [],"name": "Greet","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_greeting","type": "string"}],"name": "setGreeting","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "greet","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "greeting","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}]');
  //
  // const myContract = new web3.eth.Contract(abi, contractAddress);
  // // const myContract = web3.eth.Contract(abi, contractAddress);
  //
  // myContract.methods.greet().call().then( function( info ) {
  //   console.log("info: ", info);
  // });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
