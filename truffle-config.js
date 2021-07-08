require('babel-register')
module.exports = {
  networks: {
    develop: {
      port: 8545,      
      host: 'localhost',
      network_id: '*',
      gas: 6700000
    }
    ,
    alter: {
      port: 8545,      
      host: 'localhost',
      network_id: '*',
      gas: 6700000
    }
  },
  compilers: {
    solc: {
      version: "0.8.4"
   }
  }
}
