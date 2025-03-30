exports.convertTable = function(data_json, content_file) {

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


exports.convertCSV = function(data_csv, content_file) {

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
