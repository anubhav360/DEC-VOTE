const Voting=artifacts.require("Voting");
module.exports = function(deployer) {
  deployer.deploy(Voting, ['BJP', 'INC', 'AAP'].map(name => web3.utils.asciiToHex(name)));
};
