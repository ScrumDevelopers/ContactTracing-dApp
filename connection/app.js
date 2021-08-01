const contract = require('truffle-contract');

const appContract = require('../build/contracts/Authentication.json');
var appC = contract(appContract);
var accAdd="0xF8C6244D8740bA30D64048Fb50765A12B724B7D7"
module.exports = {
  Register: function(b_id,status) {
    var self = this;

    appC.setProvider(self.web3.currentProvider);

    let app;
    appC.deployed().then(function(instance) {
      app = instance;
      app.Register(b_id,status,{from:accAdd});
      // return meta.getBalance.call(account, {from: account})

    }).then(function(value) {
      console.log("registration done")
    }).catch(function(e) {
        console.log(e);
    });

  },
  getUsers: function(id){
    var self = this;

    appC.setProvider(self.web3.currentProvider);

    let app;
    appC.deployed().then(async function(instance) {
      app = instance;
      app.users(id).then((res)=>{
        console.log(res.Bt)
      })
    }).then(function(value) {
      // console.log("registration done")
    }).catch(function(e) {
        console.log(e);
    });
  },
  checkUser: function(id,callback){
    var self = this;

    appC.setProvider(self.web3.currentProvider);

    let app;
    var y;
    var res1

    appC.deployed().then(async function(instance) {
      app = instance;
      res1 = await app.users(id)
      callback(res1.check)
    }).then(function(value) {
      // return res1.check
      // console.log(res1.check);

    }).catch(function(e) {
        console.log(e);
    });
    

    // return res1.check

  },
  updateBData: function(userId,b_id,timestamp){
    var self = this;

    appC.setProvider(self.web3.currentProvider);

    let app;
    appC.deployed().then(async function(instance) {
      app = instance;
      app.updateBData(userId,b_id,timestamp,{from:accAdd}).then(()=>{
        console.log("BTdata")
      })
    }).then(function(value) {
      // console.log("registration done")
    }).catch(function(e) {
        console.log(e);
    });
  }

 
}
