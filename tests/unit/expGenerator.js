const signs = ['/','*','-','+'];

function randomFloatRange(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(5));
}
function randomBoolean() {
    return  Math.random() < 0.5;
}

function buildMathExp(numCount) {
    if (numCount === 1)
        return randomFloatRange(0, 10);

    let numLeft = Math.floor(numCount / 2);
    let leftSubTree = buildMathExp(numLeft);
    let numRight = Math.ceil(numCount / 2);
    let rightSubTree = buildMathExp(numRight);

    let m = Math.floor(randomFloatRange(0, signs.length));
    let str = signs[m];
    return (randomBoolean ? '0':'') + leftSubTree + ' ' + str + ' ' + (randomBoolean ? '':'0') + rightSubTree;
}

export {
    buildMathExp
}
