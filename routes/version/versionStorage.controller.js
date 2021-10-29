const express = require("express");
const { verifyToken } = require("../jwtTokenValidator");
const jwt = require("jsonwebtoken");
const FileStorage = require("../../models/FileStorage");
const VersionInfo = require("../../models/VersionStorage");
const { validationResult } = require("express-validator");
const { fileValidator } = require("../validator/FileValidator");
const hanspell = require("hanspell");
const { check } = require("express-validator");
const { version } = require("mongoose");

const router = express.Router();

//버젼 생성
router.post("/create", verifyToken, fileValidator, async(req, res, next) => {
    try {
        const token = req.decoded;
        const errMessages = validationResult(req);
        //const findVersion = VersionInfo.findOne({"author": token.id, "versionName": req.body.versionName});
        
        const errForm = {
            title: null,
            content: null,
            versionName: null,
        };

        if (!errMessages.isEmpty()) {

            for (var i=0; i<errMessages.errors.length; i++) {
                errForm[ errMessages.errors[i].param ] = errMessages.errors[i].msg ;
            };

            return res.status(201).json({
                code: 201,
                message: "validate exception",
                detail: errForm
            });

        } else {
            const { versionName, title, content } = req.body;
            
            const versionInfo = new VersionInfo();
            versionInfo.author = token.id;
            versionInfo.versionName = versionName;
            versionInfo.title = title;
            versionInfo.content = content;
            versionInfo.createAt = new Date();

            console.log(versionInfo);

            let result1 = await VersionInfo.insertMany([versionInfo]);
            const findFile = await FileStorage.find({"author": token.id, "title": title});
            console.log("findFile: ", findFile);

            if (findFile.length == 0) {
                const fileStorage = new FileStorage();
                fileStorage.author = token.id;
                fileStorage.title = title;
                fileStorage.content = content;
                fileStorage.createAt = new Date();
                console.log(fileStorage);

                let result2 = await FileStorage.insertMany([fileStorage]);
                return res.json({code: 200, message: "file register success", detail: result2});
            } else {
                return res.json({code: 200, message: "version register success", detail: result1});
            }
        }
    } catch(err) {
        console.log(err);
        return res.status(401).json({
            code: 401,
            message: "server error",
            detail: err
        })
    }
})


//버젼 삭제
router.delete("/delete/:author/:title/:versionName", async(req, res) => {
    try {
        const token = req.decoded;
        const {author, title, versionName} = req.params;

        const result = await VersionInfo.deleteOne({"author": author,
                               "title": title,
                                "versionName": versionName});

        return res.status(200).json({
            code: 200,
            message: "delete complete",
            detail: result
        })
    } catch(err) {
        return res.status(401).json({
            code: 401,
            message: "delete fail",
            detail: err
        })
    }
})

router.get("/find/:title/:verName", verifyToken, async(req, res) => {
    try {
        const result = await VersionInfo.findOne({
            "title": req.params.title,
            "versionName": req.params.verName
        });

        return res.status(200).json({
            code: 200,
            message: "success",
            data: result
        })
    } catch(err) {
        return res.status(401).json({
            code: 401,
            message: "get fail",
            detail: err
        })
    }
})


//문자열 문법 검사기 돌리기
router.post("/check/grammar", verifyToken, async(req, res) => {
    try {
        const token = req.decoded;

        let data = [];
        const checkContent = (json) => {
            data = data.concat(json);
        };

        const end = function () {
            return res.json({
                code: 200,
                data: data 
            });
        };

        const error = function (err) {
            console.error('// error: ' + err);
        };

        //hanspell.spellCheckByDAUM(req.body.sentence, 6000, checkContent, end, error)
        hanspell.spellCheckByPNU(req.body.sentence, 100000, checkContent, end, error)
        console.log(data);

    } catch(err) {
        return res.status(401).json({
            code: 401,
            message: "check fail",
            detail: err
        })
    }
})

module.exports = router;