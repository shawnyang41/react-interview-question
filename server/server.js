const express = require('express');
const app = express();
const dbOperation = require('./dboperation');
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


// var corsOptions = {
//   origin: 'http://localhost:8000'
// }
// app.use(cors(corsOptions));

 // for parsing application/json
app.use(bodyParser.json());


app.get('/course', (req, res) => {
  // course.get start
    console.log(req.query.id);
    dbOperation.getOneCourse(res, req.query.id);
  // course.get end
  }
);

app.post('/course/searchByString', (req, res)=>{
  //course.searchByString start
    console.log(req.body.target);
    dbOperation.searchByString(res, req.body.target);
  // course.searchByString end
  }
);

app.post('/course/modifyCourse', (req, res)=>{
  //course.searchByString start
    console.log(req.body.target);
    dbOperation.updateCourse(res, req.body.target, req.body.updateDetail);
  // course.searchByString end
  }
);


app.listen(3000, () => console.log('Example app listening on port 3000!'))