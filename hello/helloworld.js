
var http = require('http');
var dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');

// Import ngôn ngữ tiếng Việt
require('dayjs/locale/vi');

dayjs.extend(localizedFormat); // Kích hoạt plugin
dayjs.locale('vi'); // Đặt ngôn ngữ về tiếng Việt

function serverCallback(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    const name = process.argv[2] || "bạn"; // Nếu không có tên, mặc định là "bạn"
    const now = dayjs().format('LLLL'); // Định dạng thời gian chuẩn

    console.log("Server sending response:", now); // Debug

    res.end(`Xin chào ${name}. Now is: ${now}`);
}

// Chạy server
http.createServer(serverCallback).listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});
