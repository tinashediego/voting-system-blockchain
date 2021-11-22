import React, {Component} from "react";
import Navigation from "./Navigation";
import NavigationAdmin from "./NavigationAdmin";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import SimpleStorage from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";

class AddCandidate extends Component{

    constructor (props){
        super(props)
        
    this.state = {
        SimpleStorageInstance: undefined,
        account: null,
        web3: null,
        name: '',
        party: '',
        manifesto: '',
        constituency: '',
        candidates: null,
        isOwner: false
    }
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
    
    
    updateName = event => {
        this.setState({name: event.target.value});
    }

    updateParty= (event)=>{
        this.setState({party: event.target.value});
    }

    updateConstituency= (event)=>{
        this.setState({constituency: event.target.value});
    }

    addCandidate = async() => {
        await this.state.SimpleStorageInstance.methods.addCandidate(
            this.state.name,
            this.state.party,
            this.state.manifesto,
            this.state.constituency).send({
                from: this.state.account,
                gas: 1000000
            });
            window.alert("candidate added")
            window.location.reload(false)
            console.log(this.state)

    }

    render(){
        
        return(
            <div className="App">
            <div className="CandidateDetails">
            <div className="CandidateDetails-title">
              <h1>
                ADD CANDIDATE
              </h1>
            </div>
            
              {this.state.isOwner ? <NavigationAdmin/> : <Navigation/>}
            <div className="form">
          
              <FormGroup>
                  <div className="form-label">Enter Name - </div>
                  <div className="form-input">
                      <FormControl input="text" value={this.state.name} onChange={this.updateName} />
                  </div>
              </FormGroup>
  
              <FormGroup>
                  <div className="form-label">Enter Party - </div>
                  <div className="form-input">
                      <FormControl input="text" value={this.state.party} onChange={this.updateParty} />
                  </div>
              </FormGroup>
  
              <FormGroup>
                  <div className="form-label">Enter Constituency - </div>
                  <div className="form-input">
                      <FormControl input="text" value={this.state.constituency} onChange={this.updateConstituency} />
                  </div>
              </FormGroup>
  
              <Button onClick = {this.addCandidate} className="button-vote">Add Candidate</Button>
            </div>
            <div>Made by tinlee</div>
            </div>
          </div>
        )
    }
}
    
    
    

export default AddCandidate;