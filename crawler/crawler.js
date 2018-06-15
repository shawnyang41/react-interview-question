var superAgent = require('superagent');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var DBURL = "mongodb://localhost:27017/";
var TERM = '201801';


function parseHtml(htmlText){
    var $ = cheerio.load(htmlText);
    //get courses' title
    title_arr = [];
    var titles = $('.pagebodydiv .datadisplaytable tbody tr td.nttitle');
    titles.each(
        function(i, el){
            title_arr.push($(el).text());
        }
    );

    //get courses' desc
    descs_arr = [];
    var descs = $('.pagebodydiv .datadisplaytable tbody tr td.ntdefault');
    descs.each(
        function(i, el){
            //split descs to what we really want
            descs_arr.push($(el).text().split(/Prerequisite(s)*|Credits|Exclusion(s)*/)[0].trim());
        }
    );

    //combin title and desc to object
    objList = [];
    for(i = 0; i < title_arr.length; i++){
        var title = title_arr[i];
        var descs = descs_arr[i];
        obj = {
            //title example: BF 190 - Modernity & Contemporary World
            //courseName: Modernity & Contemporary World
            //courseTag: BF 190
            //courseSubject: BF
            //courseNumber: 190
            courseName : title.split('-')[1].trim(),
            courseTag: title.split('-')[0].trim(),
            courseSubject: title.split('-')[0].trim().split(' ')[0],
            courseNumber: title.split('-')[0].trim().split(' ')[1],
            courseDesc : descs,
            //for soft delete
            deleted: false
        };
        objList.push(obj);
    }
    return objList;
}

function insertToDB(dburl, objList){
    MongoClient.connect(dburl, 
        function(err, db) {
        //callback function for mongoDB connection
            if (err) throw err;
            var dbo = db.db("interviewDB");
            dbo.collection("courses").insertMany(objList, 
                function(err, res){
                //callback function for insert
                    if(err) throw err;
                    console.log(res.insertedCount +" inserted");
                //callback function for insert end
                }
            );
            db.close();
        //callback function for mongoDB connection end
        }
    );
}

function extractData(url){
    superAgent.get(url).then(
        res => {
        //callback function for http request
            var objList = parseHtml(res.text);
            insertToDB(DBURL, objList);
        //callback function for http request end
        }
    ).catch(
        err => {
        //callback function for catching error
            console.log(err);
        //callback function for catching error end
        }
    );
}
//run.py + input.txt to get the following list of subjects
var subjs = [   'AN', 'AB', 'AR', 'AF', 'AS', 'BH', 
                'BI', 'BF', 'BU', 'MB', 'BE', 'ART', 'DME', 'ENT', 
                'PRG', 'CH', 'CL', 'CS', 'CMEG', 'CP', 'CC', 'CQ', 
                'KS', 'DH', 'JN', 'EC', 'EU', 'EM', 'EN', 'ENTR', 
                'ES', 'FS', 'FI', 'FR', 'DD', 'GG', 'GESC', 'GL', 
                'GM', 'GC', 'GV', 'GS', 'HE', 'HS', 'HI', 'HP', 'HN', 
                'HR', 'ID', 'UU', 'IP', 'IT', 'KP', 'LL', 'LA', 'LY', 
                'OL', 'MF', 'MS', 'MA', 'MX', 'ML', 'MI', 'MU', 'MZ', 
                'ED', 'NO', 'PP', 'PC', 'PD', 'PO', 'PS', 'SAFE', 'RE', 
                'SNID', 'SC', 'SJ', 'CT', 'SE', 'SK', 'SY', 'SP', 'ST', 
                'TM', 'TH', '36', 'AP', 'CF', '04', 'CX', '05', '08', '59', 
                'IO', 'JA', 'KO', '15', 'MW', 'PM', '17', 'SM', '20', '52', 
                'UX', 'WASC', 'WS', 'YC']

function run(){
    for(i = 0; i < subjs.length; i++){
        //plugin TERM and subjects abbv
        //course number starts from 000 to 999
        var start = '000';
        var end = '999';
        var url = 'https://loris.wlu.ca/ssb_prod/bwckctlg.p_display_courses?term_in=' + TERM 
        + '&one_subj=' + subjs[i]
        + '&sel_crse_strt='+ start
        +'&sel_crse_end='+ end 
        +'&sel_subj=&sel_levl=&sel_schd=&sel_coll=&sel_divs=&sel_dept=&sel_attr=';
        extractData(url);
        //0.8s timeout
        setTimeout(function(){}, 800);
    }
}
run();