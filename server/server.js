const express = require('express')
const app = express()
const mysql = require('mysql')
const session = require('express-session')
const bcrypt = require('bcrypt')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
  httpOnly: true,
  secure: false,
  maxage: 1000 * 60 * 60
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
      req.session.username = username; //sessionにidを登録
      console.log('セッション登録');
      console.log(req.session);
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
  let username = req.body.name;
  let password = req.body.password;

  //ハッシュ化
  username = bcrypt.hashSync(username, 10);
  password = bcrypt.hashSync(password, 10);

  console.log(username,password);

  //ハッシュ化したusername password を保存
  const sql = 'insert into users (name, password)values(?,?);'
  con.query(sql,[username,password],function(err, result,fields){
    if (err) throw err;
    console.log(result);
  })
  res.redirect('/');
})


// DASHBOARD
app.get('/dashboard/',(req,res) => {
  const output = {
    username: req.session.username,
  }
  const sql = 'select user_id,weight,height,created_at from physical where user_id=? order by created_at';
  con.query(sql,[req.session.username],function(err, result,fields){
    if (err) throw err;
    console.log(result);
    output.physical = result;
    res.json(output);
  })
})

app.post('/dashboard/',(req,res) => {
  const data = req.body;
  const weight = Number(data.weight);
  const date = new Date(data.date);
  const height = Number(data.height);
  const user_id = req.session.username;

  console.log(date);
  console.log(weight);
  console.log(height);
  console.log(user_id);
  // console.log(req.session);

  const sql = 'insert into physical (weight,height,user_id,created_at) values (?,?,?,?)'
  con.query(sql,[weight,height,user_id,date],function(err, result,fields){
    if (err) throw err;
    console.log(result);
    console.log(fields);
  })
})