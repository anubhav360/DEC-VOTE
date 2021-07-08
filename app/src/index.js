import Web3 from "web3";
import votingArtifact from "../../build/contracts/Voting.json";
import "./styles.css";
let candidates = {"BJP": "candidate-1", "INC": "candidate-2", "AAP": "candidate-3"}

const App = {
  web3: null,
  account: null,
  voting: null,

  start: async function() {
    const { web3 } = this;

    try {
      /* Get the network we are connected to and then read the build/contracts/Voting.json and instantiate a contract object to use
      */

      // 
      const networkId = await web3.eth.net.getId();
      
      const deployedNetwork = votingArtifact.networks[networkId];
      
      this.voting = new web3.eth.Contract(
        votingArtifact.abi,
        deployedNetwork.address,
        
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      console.log("accounts done");
      
      this.loadCandidatesAndVotes();
      this.is_voting_on();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  loadCandidatesAndVotes: async function() {
    const { totalVotesFor } = this.voting.methods;
    //const { sendCoin } = this.meta.methods;
    //await sendCoin(receiver, amount).send({ from: this.account });
    let candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      var count = await totalVotesFor(this.web3.utils.asciiToHex(name)).call();
      $("#" + candidates[name]).html(count);
    }
  },

  voteForCandidate: async function() {
    let candidateName = $("#candidate").val();
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#candidate").val("");

    const { totalVotesFor, voteForCandidate } = this.voting.methods;
    

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    await voteForCandidate(this.web3.utils.asciiToHex(candidateName)).send({gas: 140000, from: this.account});
    let div_id = candidates[candidateName];
    var count = await totalVotesFor(this.web3.utils.asciiToHex(candidateName)).call();
    $("#" + div_id).html(count);
    $("#msg").html("");
  }
  ,
  start_vote: async function() {

    const { start_vote } = this.voting.methods;
    

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    
    await start_vote().send({gas: 140000, from: this.account});
    
    location.reload();
  }
  ,
  end_vote: async function() {

    const { end_vote} = this.voting.methods;
    

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    await end_vote().send({gas: 140000, from: this.account});
    location.reload();
  }
  ,
  is_voting_on: async function() {

    const { is_voting_on } = this.voting.methods;
    

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    var f= await is_voting_on().call();
    f=f.toString();
    console.log(f);
    if (f=="true")
    document.getElementById("is_on").innerHTML="ON";
    if (f=="false")
    document.getElementById("is_on").innerHTML="OFF";
  }
  
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. ",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }
 
  App.start();
});
 
