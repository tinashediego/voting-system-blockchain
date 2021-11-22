import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Navigation from "./components/Navigation";
import NavigationAdmin from "./components/NavigationAdmin";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { SimpleStorageInstance: undefined, web3: null, account: null, isOwner: null };

  }
  
  componentDidMount = async () => {
    
    // FOR REFRESHING PAGE ONLY ONCE -
if(!window.location.hash){
  window.location = window.location + '#loaded';
  window.location.reload();
  }

    try {  
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      
      const deployedNetwork = SimpleStorage.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorage.abi,SimpleStorage.address,
        deployedNetwork && deployedNetwork.address,
      );

      instance.options.address = "0x44295683e5709A3a87ab75Dd8e7a065390647c53"

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3: web3, account: accounts[0], SimpleStorageInstance: instance });
      const owner = await this.state.SimpleStorageInstance.methods.getOwner().call();
      console.log(owner)
      if(this.state.account === "0x44295683e5709A3a87ab75Dd8e7a065390647c53"){
        this.setState({isOwner: true});
      }
      
      let start=await this.state.SimpleStorageInstance.methods.getStart().call();
      let end=await this.state.SimpleStorageInstance.methods.getEnd().call();

      this.setState({start: start, end: end});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <div className="CandidateDetails">
          <div className="CandidateDetails-title">
            <h1>
              Loading Web3, accounts, and contract....
            </h1>
          </div>
          
            {this.state.isOwner ? <NavigationAdmin/> : <Navigation/>}
          
        </div>
      
  
      );
    }
    
    return (
      <div className="App">
        <div className="CandidateDetails-title">
          <h1>
            ADMIN PORTAL
          </h1>
        </div>
        
          {this.state.isOwner ? <NavigationAdmin/> : <Navigation/>}
        <div className="home">
          WELCOME TO VOTING SYSTEM
        </div>
        <div>Made by tinlee</div>
      </div>
    

    );
  
  }
}

export default App;
