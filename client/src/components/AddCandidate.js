import React, {Component} from "react";
import Navigation from "./Navigation";
import NavigationAdmin from "./NavigationAdmin";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class AddCandidate extends Component{
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
            this.location.reload(false)

    }
}
    
    
    

export default AddCandidate;