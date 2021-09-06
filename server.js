const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
var cors = require('cors');
var admin = require("firebase-admin");

var serviceAccount = require("./contact-tracing-app-fbadmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var registrationToken = ["eEt29hnhT6KiWGhmd1SJOS:APA91bEd6Qy6EGXxrOsJzWMZcFj0W1qJ8CM9aNwswOCnP03jG6VWUkDRo-RMxmlzTTl_VO516WprbuvHrayJu2quNCA-MAZlX2h4MV1usIAc8Jxu8_jtZ3KfU643WV8KqTO1XduMJFvr"
];

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
  truffle_connect.Register(req.body.b_id,req.body.covidStatus,()=>{res.send("registration done")})
});

app.post('/saveBTdata',(req,res)=>{
  console.log(req.body)
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

app.post('/checkuser',(req,res)=>{
  truffle_connect.checkUser(b_id,(x)=>{
    console.log(x)
    if(x=='registered'){
      console.log(b_id)
      res.send("registered")
    }
  })
  console.log(req.body)
})


app.post('/changeCStatus',(req,res)=>{
  truffle_connect.updateStatus(req.body.b_id,req.body.cstatus, ()=>{
    res.send("c status updated")
    truffle_connect.getBTdata(req.body.b_id,()=>{
      admin.messaging().sendToDevice(registrationToken, payload, options)
      .then(function(response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });

    })

    
  })

  console.log(req.body)
})

var payload = {
  notification: {
    title: "This is a Notification",
    body: "This is the body of the notification message."
  }
};

 var options = {
  priority: "high",
  timeToLive: 60 * 60 *24
};

// app.post('/sendNoti',(req,res)=>{
//   console.log("noti route")
//   admin.messaging().sendToDevice(registrationToken, payload, options)
//   .then(function(response) {
//     console.log("Successfully sent message:", response);
//   })
//   .catch(function(error) {
//     console.log("Error sending message:", error);
//   });

// })

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);

});
