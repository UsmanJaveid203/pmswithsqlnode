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

router.get('/', function(req, res, next) {
    let getdata = 'select * from `users`';
      con.query(getdata,(err,data)=>{
        if(err){throw err;}
        else{
          res.render('record', { title: 'Password Managment', records:data });
        }
      })
  });

  router.get('/edit/:id', function(req, res, next) {
    let getid=req.params.id;
    let getdata = 'select * from `users` WHERE `id`=?';
    let gettdata=mysql.format(getdata,[getid]);
      con.query(gettdata,(err,data)=>{
        if(err){throw err;}
        else{
            var string=JSON.stringify(data);
            var json =  JSON.parse(string);
            res.render('edit', { title: 'Password Managment', record:json });
        }
      })
  });

  router.post('/edit', function(req, res, next) {
    let getid=req.body.id;
    let name = req.body.ename;
    let email = req.body.empmail;
    let etype = req.body.emptype;
    let hourlyrate = req.body.hrlyrate;
    let totalHour = req.body.ttlhrs;
    let total = parseInt(hourlyrate)*parseInt(totalHour);
    
    let updateQuery='UPDATE `users` SET `name`=? ,`email`=?,`etype`=?,`hourlyrate`=?,`totalhour`=?,`total`=? where `id`=?';
    let query=mysql.format(updateQuery,[name,email,etype,hourlyrate,totalHour,total,getid]);
    con.query(query,function(err,response){
        if(err){throw err;} 
        else{res.redirect('/record');}
  });
  });

  router.get('/delete/:id', function(req, res, next) {
    let getid=req.params.id;
    let getdata = 'DELETE FROM `users` WHERE `id`=?';
    let deldata=mysql.format(getdata,getid);
      con.query(deldata,(err,data)=>{
        if(err){throw err;}
        else{
            res.render('record', { title: 'Password Managment', records:data });
        }
      })
  });

module.exports = router;