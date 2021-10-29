const hanspell = require("hanspell");

const spellCheck = (sentence) => {
    let data = [];

    const check = function(json) {
        data = data.concat(json);
    };
    const end = function () {
      console.log();
    };
    const error = function (err) {
      console.error('// error: ' + err);
    };
    
    hanspell.spellCheckByDAUM(sentence, 6000, check, end, error);

    return data;
}

console.log(spellCheck('리랜드는 얼굴 골격이 굵은게,'));