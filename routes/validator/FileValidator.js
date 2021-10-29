const { check } = require("express-validator");
const FileStorage = require("../../models/FileStorage");

const fileValidator = [
    check("title").not().isEmpty().withMessage("제목을 작성해주세요."),
    check("content").not().isEmpty().withMessage("자기소개서를 작성해주세요."),
    check("versionName").not().isEmpty().withMessage("version이름을 작성해주세요.")

]

module.exports = { fileValidator }