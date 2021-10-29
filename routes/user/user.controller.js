const express = require("express");
const { verifyToken } = require("../jwtTokenValidator");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserStorage");
const { registerValidator } = require("../validator/RegisterValidator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const config = require("../../config");
const router = express.Router();

router.get("/tokenCheck", verifyToken, async(req, res) => {

    try {
        const token = req.decoded;
        
        return res.status(200).json({
            code: 200,
            id: token.id
        })
    } catch(err) {
        console.log(err);
        res.status(400).json({
            code: 400,
            message: "server error",
            detail: err
        });
    }
})

router.post("/login", async(req, res) => {

    try {
        const { id, pw } = req.body;
        console.log(`${id} -- ${pw}`)

        let result = await User.findOne({"id": id});

        console.log(result);
        
        if ( !result || result === "" || typeof result === undefined || result === null ) {

            return res.status(201).json({
                code: 201,
                message: "아이디와 비밀번호를 확인해주세요.",
            });

        } else {

            let authFlag = await bcrypt.compare(pw, result.pw);

            if (authFlag == true) {
                
                const token = jwt.sign({
                    id: result.id,
                    _id: result._id,
                }, config.JWT_SECRET, {
                    expiresIn: "10m",
                    issuer: "devmatch_manager",
                });

                res.cookie("user", token);
                return res.json({
                    code: 200,
                    message: "login success",
                    token,
                })

            } else {
                return res.status(201).json({
                    code: 201,
                    message: "비밀번호를 확인해주세요.",
                });
            };
        };

    } catch(err) {
        console.log(err);
        res.status(400).json({
            code: 400,
            message: "server error",
            detail: err
        });

    };
});


router.post("/register", registerValidator, async(req, res) => {
    try {
        const errMessages = validationResult(req);

        console.log(errMessages);

        if (!errMessages.isEmpty()) {
            const errForm = {
                id: null,
                pw: null,
                emailAddress: null 
            };
    
            for (var i=0; i < errMessages.errors.length; i++) {
                errForm[ errMessages.errors[i].param ] = errMessages.errors[i].msg ;
            };

            return res.status(201).json({
                code: 201,
                message: "validate exception",
                detail: errForm
            });
        } else {
            const { id, pw, name, emailAddress } = req.body;

            const user = new User();
            let hashedPassword = await bcrypt.hash(pw, 12);
    
            user.id = id;
            user.pw = hashedPassword;
            user.name = name;
            user.emailAddress = emailAddress;
    
            console.log(user);
    
            user.save().then((result) => {
                console.log(result);
                return res.json({code: 200, message: "account register success"});
            }).catch((err) => {
                return res.status(400).json({code: 400, message: "unexpected db error", detail: err});
            }); 
        }

    } catch(err) {
        return res.status(401).json({
            code: 401,
            message: "server error",
            detail: err
        })
    }
});


router.get("/logout", verifyToken, (req, res) => {
    const tokenContent = req.decoded;

    const token = jwt.sign({
        id: tokenContent.id,
        _id: tokenContent._id,
    }, config.JWT_SECRET, {
        expiresIn: 1,
        issuer: "devmatch_manager",
    });

    res.cookie("user", token);
    return res.status(200).send({
        code: 200,
        message: "last-token issue complete",
        token,
    });

});


module.exports = router;