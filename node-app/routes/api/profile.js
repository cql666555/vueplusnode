const express = require("express");
const router = express.Router();

const conn = require("../../db/index");

// 创建信息接口
router.post("/add", (req, res) => {
    const fields = {};
    if (req.body.type) fields.type = req.body.type;
    if (req.body.describe) fields.describe = req.body.describe;
    if (req.body.income) fields.income = req.body.income;
    if (req.body.expend) fields.expend = req.body.expend;
    if (req.body.cash) fields.cash = req.body.cash;
    if (req.body.remark) fields.remark = req.body.remark;

    const sql = `insert into profiles set ?`;
    conn.query(sql, fields, (err, result) => {
        if (err) return res.status(400).json(err);
        if (result.affectedRows !== 1) return res.status(400).json("添加失败");
        res.json(fields);
    });
});

// 查询所有信息
router.get("/all", (req, res) => {
    const sql = `select * from profiles order by id desc`;
    conn.query(sql, (err, result) => {
        if (err) return res.status(400).json(err);
        if (result.length === 0) return res.status(200).json("暂无数据");
        res.json(result);
    });
});

// 编辑某条信息
router.post("/edit/:id", (req, res) => {
    const fields = {};
    if (req.body.type) fields.type = req.body.type;
    if (req.body.describe) fields.describe = req.body.describe;
    if (req.body.income) fields.income = req.body.income;
    if (req.body.expend) fields.expend = req.body.expend;
    if (req.body.cash) fields.cash = req.body.cash;
    if (req.body.remark) fields.remark = req.body.remark;

    const sql = `update profiles set ? where id=?`;
    conn.query(sql, [fields, req.params.id], (err, result) => {
        if (err) res.status(400).json(err);
        if (result.affectedRows !== 1) return res.status(400).json("编辑失败");
        res.json(fields);
    });
});

// 删除某条信息
router.post("/delete/:id", (req, res) => {
    const sql = `delete from profiles where id=?`;
    conn.query(sql, req.params.id, (err, result) => {
        if (err) return res.status(400).json(err);
        if (result.affectedRows !== 1) return res.status(400).json("删除失败");
        res.json("删除成功");
    });
});

module.exports = router;
