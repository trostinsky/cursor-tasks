const _ = require("lodash");
const defaultSize = { rows: 1, columns: 1};
class Matrix{
    constructor(size = defaultSize, ...values){
        this.values = _.flattenDeep(values);
        console.log(this.values);
    }
}
const matr1 = new Matrix({
    rows: 4,
    columns: 3
}, [[34, 11, 33], [9, -1, 5], [-6, 33, 11], [-5, 11, 19], [-7, "dada"]]);

module.exports = Matrix;