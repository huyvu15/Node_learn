var http = require('http');
var request = require('request');

var content = undefined;   

request.get('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, res, body){
    content = body;
});

function convertTable(data_json) {
    var html = '<html>\n<head>\n<title> Tổng hợp dữ liệu </title>\n</head>\n<body>\n<table border="1">\n';

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

    html += '</table>\n</body>\n</html>';

    return html;
}

http.createServer(function(req, res){
    if (content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(convertTable(JSON.parse(content)));
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Nothing !!!');
    }
}).listen(8080)


