const ImportedClass = require('./module.es6');

class Test {
    constructor(a, b) {
        this._a = a;
        this._b = b;
        this._c = new ImportedClass();
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    let t = new Test(0,0);
});