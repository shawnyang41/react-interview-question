var http = require('http');


var db = {
    search : function(target, callback){
        if (target === ""){
            callback([]);
            return;
        }
        
        var bodyToSend = {target : target}
        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/course/searchByString',
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            }
        }
        var body = '';
        var request = http.request(options, function(res){
            res.on('data', function(chunk){
                body += chunk;
            })
            res.on('end', function(){
                console.log("got response: ", JSON.parse(body));
                callback(JSON.parse(body));
            })
        });

        request.write(JSON.stringify(bodyToSend));
        request.end();
    },
    getCourse: function(target, callback){
        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/course?id=' + target,
            method: 'GET',
            headers:{
                'Content-type' : 'application/json'
            }
        }
        var body = '';
        var request = http.request(options, function(res){
            res.on('data', function(chunk){
                body += chunk;
            })
            res.on('end', function(){
                console.log("got response: ", JSON.parse(body));
                callback(JSON.parse(body));
            })
        });
        request.write("");
        request.end();
    },
    updateCourse: function(target, updateDetail, callback){
        console.log('target = ', target);
        var bodyToSend = {target, updateDetail};
        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/course/modifyCourse',
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            }
        }
        var body = '';
        var request = http.request(options, function(res){
        });
        request.on()
        request.write(JSON.stringify(bodyToSend));
        request.end();
        callback();
    }
}

export default db;