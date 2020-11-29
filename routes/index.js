var express = require('express');
var router = express.Router();
var path =require('path');
var mysql = require('mysql');
var con= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'employee'
})
con.connect((err)=>{
  if(err) {throw err;}
  else{
    console.log("successfully connected..........");
  }
})
router.use(express.static(__dirname+'/public/'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Managment',records:''});
});

router.post('/', function(req, res, next) {
  let name = req.body.ename;
  let email = req.body.empmail;
  let etype = req.body.emptype;
  let hourlyrate = req.body.hrlyrate;
  let totalHour = req.body.ttlhrs;
  let total = parseInt(hourlyrate)*parseInt(totalHour);
  let insertedQuery= 'insert into `users` (`name`,`email`,`etype`,`hourlyrate`,`totalhour`,`total`) VALUES (?,?,?,?,?,?)';
  let query= mysql.format(insertedQuery,[name,email,etype,hourlyrate,totalHour,total]);
  con.query(query,function(err,responce){
    if(err){throw err;}
    else{
      let getdata = 'select * from `users`';
      con.query(getdata,(err,data)=>{
        if(err){throw err;}
        else{
          res.render('record', { title: 'Password Managment', records:data });
        }
      })
    }
  })
});




module.exports = router;
