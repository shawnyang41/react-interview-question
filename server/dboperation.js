var MongoClient = require('mongodb').MongoClient;
var DBURL = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId; 

var dbOperation = {
    //search by id
    getOneCourse: function(res, id){
        MongoClient.connect(DBURL, 
            function(err, db) {
            //callback function for mongoDB connection
                if (err) throw err;
                var dbo = db.db("interviewDB");
                dbo.collection("courses").findOne(new ObjectId(id), function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.json(result);
                    db.close();
                });
            //callback function for mongoDB connection end
            }
        );
    },
    //search by matching String
    searchByString: function(res, target){
        MongoClient.connect(DBURL, 
            function(err, db) {
            //callback function for mongoDB connection
                if (err) throw err;
                var dbo = db.db("interviewDB");
                dbo.collection("courses").find({ $or:[{courseTag : RegExp(target)}, {courseDesc : RegExp(target)}, {courseName : RegExp(target)}]}).toArray((err, docs)=>{
                    //callback function for toArray 
                    if(err) throw err;
                    res.json(docs);
                    //callback function for toArray end
                    db.close();
                });
            //callback function for mongoDB connection end        
            });
            
    },
    //update course
    updateCourse: function(res, id, updateDetail){
        MongoClient.connect(DBURL, 
            function(err, db) {
            //callback function for mongoDB connection
                if (err) throw err;
                var dbo = db.db("interviewDB");
                dbo.collection("courses").updateOne({_id : new ObjectId(id)}, {$set : updateDetail}).then(err=> {
                    console.log(updateDetail);
                    console.log(id);
                    console.log('changed');
                    db.close();
                });
            //callback function for mongoDB connection end        
            });
    }
}
module.exports = dbOperation