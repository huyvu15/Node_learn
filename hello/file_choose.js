var http = require('http');
var fs = require('fs'); 
var request = require('request');
var csv = require('csv');
var url = require('url');


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

function convertTable(data_json) {

    var body_start =  content_file.indexOf('<body>');

    var body_end = content_file.indexOf('</body>');


    var string_to_body = content_file.slice(0, body_start + 6 );
    var string_to_end_body = content_file.slice(body_end);


    var html = '<table>';

    // Kiểm tra nếu có dữ liệu
    if (data_json.length === 0) {
        return html + "<p>No data available</p></body></html>";
    }

    // Tạo hàng tiêu đề
    html += '<tr>\n';
    for (var key in data_json[0]) {
        if (typeof data_json[0][key] !== 'object') {
            html += '<th>' + key + '</th>\n';
        }
    }
    html += '</tr>\n';

    // Tạo các hàng dữ liệu
    data_json.forEach(function (object) {
        html += '<tr>\n';
        for (var thuoc_tinh in object) {
            if (typeof object[thuoc_tinh] !== 'object') {
                html += '<td>' + object[thuoc_tinh] + '</td>\n';
            }
        }
        html += '</tr>\n';
    });

    html += '</table>';

    return string_to_body + html + string_to_end_body;
}


function convertCSV(data_csv) {

    var body_start =  content_file.indexOf('<body>');

    var body_end = content_file.indexOf('</body>');


    var string_to_body = content_file.slice(0, body_start + 6 );
    var string_to_end_body = content_file.slice(body_end);


    var html = '<table>';

    // Tạo hàng tiêu đề
    html += '<tr>\n';
    data_csv[0].forEach(function(thuoc_tinh) {
        html += '<td>' + thuoc_tinh + '</td>\n';
    });
    html += '</tr>\n';

    data = data_csv.slice(1);



    // Tạo các hàng dữ liệu
    data.forEach(function (dong) {
        html += '<tr>\n';
        dong.forEach(function (cell){
            html += '<td>' + cell + '</td>\n';
        });
        html += '</tr>\n';
    });

    html += '</table>';

    return string_to_body + html + string_to_end_body;
}



http.createServer(function(req, res){
    if (content && content_file) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var req_url = url.parse(req.url)

        switch (req.url.path){
            case '/json':
                res.end(convertTable(JSON.parse(content)));
                break;
            case '/csv':
                res.end(convertCSV(content));
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