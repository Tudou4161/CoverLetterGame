const express = require("express");
const { verifyToken } = require("../jwtTokenValidator");
const jwt = require("jsonwebtoken");
const VersionInfo = require("../../models/VersionStorage");
const FileStorage = require("../../models/FileStorage");
const VersionStorage = require("../../models/VersionStorage");

const router = express.Router();

router.get('/history', verifyToken, async(req, res) => {
    const token = req.decoded;
    
    const result = await FileStorage.find({"author": token.id});

    return res.json({
        code: 200,
        username: token.id,
        data: result
    });
});

router.get("/history/:title", verifyToken, async(req, res) => {
    const token = req.decoded;

    const result = await VersionInfo.find({"title": req.params.title, "author": token.id}).sort({"createAt": -1});
    
    return res.json({
        code: 200,
        username: token.id,
        data: result
    })
})

module.exports = router;