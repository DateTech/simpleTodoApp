var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// connection
var connectionString = mysql.createConnection({
  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
  user      : 'root',
  password  : "root",
  database  : 'todo'
});

connectionString.connect(function(err){
  if(err){console.log(err);}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connectionString.query('SELECT * FROM todo_activity', function(err, rows, next){
    if(err){throw err;}
    var result = rows;
    res.render('index', {title : 'Todo App', results : result});
  });
});

router.get('/view/:tagId', (req, res) => {
  connectionString.query('SELECT * FROM todo_activity WHERE activity_id="'+req.params.tagId+'"', function(err, rows, next){
    if(err){throw err;}
    res.json(rows);
  });
}); 

router.post('/add', (req, res) => {
  var txtTodo = req.body.txtTodo;
  var txtTodoTitle = req.body.txtTodoTitle;
  var today = new Date();
  var curDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  connectionString.query('INSERT INTO todo_activity (activity_title,activity_text,activity_status,activity_date) VALUES ("'+txtTodoTitle+'","'+txtTodo+'","0","'+curDate+'")', function(err, result, next){
    if(err){throw err;}
    res.json({msg : "success"});
    //res.redirect('/');
  });
});

module.exports = router;
