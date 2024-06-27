const mysql = require("mysql");

// 创建一个数据库连接池
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vueplusnode",
    port: 3306,
});
//连接
conn.connect(function (err) {
    if (err) {
        console.log("error");
    } else {
        console.log("connect success!");
    }
});

module.exports = conn;
