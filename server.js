const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
var cors = require('cors');
// app.use(cors());
app.use(cors({origin: true, credentials: true}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use('/',(req,res)=>{
// res.send("App Running")
// });
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.post('/Register',(req,res)=>{
  console.log(req.body)
  truffle_connect.Register(req.body.b_id,req.body.covidStatus)
});

// [{
//   b_id,
//   timestamp
// },
// {

// },...]

app.get('/saveBTdata',(req,res)=>{
  req.body.btdata.forEach((item)=>{
    truffle_connect.checkUser(item.b_id,(x)=>{
      console.log(x)
      if(x=='registered'){
        console.log(item)
        truffle_connect.updateBData(req.body.userId,item.b_id,item.timestamp)
      }
    })
   
  })
})

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);

});
