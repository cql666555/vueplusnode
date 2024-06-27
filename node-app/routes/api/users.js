const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const conn = require("../../db/index");
const config = require("../../config");

// 注册接口
router.post("/register", (req, res) => {
    console.log(req.body);
    const adminInfo = req.body;
    if (!adminInfo.name || !adminInfo.password)
        return res.status(400).json("用户名或密码为空");

    const sql = `select * from users where name=?`;
    conn.query(sql, [adminInfo.name], (error, result) => {
        if (error) {
            return res.status(404).json(error);
        }
        if (result.length > 0) {
            return res.status(400).json("用户名已被注册");
        }
        adminInfo.password = bcrypt.hashSync(adminInfo.password, 10);
        const sqlStr = `insert into users set ?`;
        conn.query(
            sqlStr,
            {
                name: adminInfo.name,
                password: adminInfo.password,
                identify: adminInfo.identify,
            },
            (error2, result2) => {
                if (error2) {
                    return res.status(400).json(error2);
                }
                if (result2.affectedRows !== 1) {
                    return res.status(400).json("用户名注册失败");
                }
                res.json({
                    status: 200,
                    message: "注册成功",
                    name: adminInfo.name,
                    password: adminInfo.password,
                    identify: adminInfo.identify,
                });
            }
        );
    });
});

// 登录接口
router.post("/login", (req, res) => {
    const adminInfo = req.body;
    const sql = `select * from users where name=?`;
    conn.query(sql, adminInfo.name, (error, result) => {
        if (error) return res.status(400).json(error);
        if (result.length !== 1) return res.status(400).json("用户名不存在");

        const compareResult = bcrypt.compareSync(
            adminInfo.password,
            result[0].password
        );
        if (!compareResult) {
            return res.status(400).json("用户名或密码输入错误，请重新输入");
        }
        const user = {
            name: result[0].name,
            password: result[0].password,
            identify: result[0].identify,
        };
        const tokenStr = jwt.sign(user, config.key, {
            expiresIn: "10h",
        });
        res.json({
            status: 200,
            message: "登录成功",
            token: tokenStr,
        });
    });
});

module.exports = router;
