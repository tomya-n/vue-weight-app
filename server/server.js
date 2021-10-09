const express = require('express')
const app = express()
const mysql = require('mysql')
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
  httpOnly: true,
  secure: false,
  maxage: 1000 * 60
  }
}));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "weight_app",
})

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});

app.use('/img', express.static(__dirname + '/dist/img/'));
app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));
// app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

//LOGIN
app.post('/',(req,res) => {
  const username = req.body.name;
  const password = req.body.password;
  const sql = 'select * from users where name = ? and password = ?;'
  con.query(sql,[username,password],function(err,result,fields){
    if (err) {
      res.send({err: err})
    }

    if(result.length > 0){
      req.session.user = username; //sessionにidを登録
      console.log('セッション登録');
      res.send(result);
    }else{
      res.send({message: "no message"})
    }
  })
})

//LOGOUT
app.get('/logout',(req,res) => {
  req.session.destroy(function(err){
    if (err) {
      res.send(err)
      return
    }
  })
  res.redirect('/')
})


//SIGNUP
app.post('/signup',(req,res) =>{
  //DBに保存
  const name = req.body.name;
  const password = req.body.password;
  const sql = 'insert into users (name, password)values(?,?);'
  con.query(sql,[name,password],function(err, result,fields){
    if (err) throw err;
    console.log(result);
  })
  res.redirect('/');
})


// DASHBOARD
app.get('/dashboard',(req,res) => {
  console.log(req.session);
  res.send(req.session.user);
})