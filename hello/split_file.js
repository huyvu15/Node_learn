var http = require('http');
var fs = require('fs'); 
var request = require('request');
var csv = require('csv');
var url = require('url');

var html = require('./html.js');

var content = undefined;   

var content_file = undefined;

request.get('https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/brisbane-city-council-events/exports/csv?lang=en&timezone=Asia%2FJakarta&use_labels=true&delimiter=%2C', function(err, res, body){
    csv.parse(body, function(err,data)
    {
        content = data;
        console.log(content);
    })
});

request.get('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, res, body){
    content = body;
});

http.createServer(function(req, res){
    if (content && content_file) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var req_url = url.parse(req.url)

        switch (req.url.path){
            case '/json':
                res.end(html.convertTable(JSON.parse(content)));
                break;
            case '/csv':
                res.end(html.convertCSV(content));
                break;
        }

    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Nothing !!!');
    }
}).listen(8080)


fs.readFile('./index.html', function(err, data) {
    if (err) {
        throw err;
    } else {
        content_file = data.toString();
    }
})