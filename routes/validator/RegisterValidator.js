const { check } = require("express-validator");
const User = require("../../models/UserStorage");

const registerValidator = [

    check("id").not().isEmpty().withMessage("아이디를 작성하세요.")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,15}/)
    .withMessage("아이디의 길이는 6-15자 이며, 영어 소문자와 숫자를 결합해서 작성해주세요.")
    .bail()
    .custom( (value) => {
        return User.findOne({id: value}).then((user) => {
            if (user) {
                return Promise.reject("이미 존재하는 아이디입니다.")
            }
        })
    }),

    check("pw").not().isEmpty().withMessage("비밀번호를 작성하세요.")
        .bail()
        .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[a-z\d$@$!%*?&]{6,15}/).withMessage(
            "비밀번호의 길이는 6-15자이며, 적어도 1개 이상의 소문자, 숫자, 특수문자를 포함해야 합니다."
            )
            ,


    check("emailAddress").not().isEmpty().withMessage("이메일 주소를 작성하세요.")
    .bail()
    .isEmail().withMessage("유효하지 않은 이메일 주소 입니다.")
    .bail()
    .custom( (value) => {
        return User.findOne({emailAddress: value})
        .then((user) => {
            if (user) {
                console.log(user.emailAddress);
                return Promise.reject("이미 존재하는 이메일주소 입니다.");
            }
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
   
]

module.exports = { registerValidator }