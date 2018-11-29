const _ = require("lodash");

const rows = Symbol("rows");
const columns = Symbol("columns");

const defaultSize = { rows: 1, columns: 1};

// element.addEventListener("click", () => {... this === element });
class Matrix{
    constructor(size = defaultSize, ...values){
        this[rows] = size.rows;
        this[columns] = size.columns;
        this.values = _.flattenDeep(values)
            .filter((value) => typeof value === 'number');
        const length = this.values.length;
        const difference = this.values.length - (size.rows * size.columns);
        if(!difference) return;
        if(difference > 0){
            this.values = _.dropRight(this.values, difference);
        } else {
            this.values.length = this.values.length + Math.abs(difference);
            this.values = _.fill(
                this.values,
                0,
                length
            )
        }
    }

    toString(){
        return _.chunk(this.values, this[columns]).reduce((string, matrixElement, index) => {
            return string + "\n|" + matrixElement.join("  ") + "|";
        }, `Matrix \nSize: ${this[rows]}x${this[columns]}`);
    }

    multiplyBuNumber(number){
        const newValues = this.values.map((value) => value * number);
        return new Matrix({
            rows: this[rows],
            columns: this[columns]
        }, newValues);
    }

    reverse(){
        const reverseValues = this.values.sort((elem, index) => {
        //
        });
        return new Matrix({
            rows: this[columns],
            columns: this[rows]
        }, this.values.reverse());
    }

    multiplyByMatrix(matrix){
        if(matrix instanceof Matrix){
            return new Matrix({
                rows: this[rows],
                columns: this[columns]
            }, this.values);
        } else {
            throw new TypeError("Argument must be instance of 'Matrix' class");
        }
    }
}
const matr1 = new Matrix({
    rows: 5,
    columns: 3
}, [[34, 11, 33], [9, -1, 5], [-6, 33, 11], [-5, 11, 19, 10, .2], [-7, "dada"]]);
const matr2 = new Matrix({
    rows: 2,
    columns: 2
}, 1, 2, 3, 4);

class OneMatrix extends Matrix{
    constructor(size = defaultSize){
        super(size, _.fill(new Array(size.columns * size.rows), 1));
    }
}

class SquareMatrix extends Matrix{
    constructor(size = 1, ...values){
        super({
            rows: size,
            columns: size
        }, ...values);
    }

    toString(){
        const string = `Square${super.toString()}`;
        return string;
    }

    determinant(){
        // Дописать функцию вычисляющую determinant
    }
}

console.log(matr2.multiplyBuNumber(5).toString());
console.log(matr2.toString());
const matr3 = new OneMatrix({
    rows: 3,
    columns: 3
});
console.log(matr3.toString());
const matr4 = new SquareMatrix(3, _.range(9));
console.log(matr4.toString());
console.log(matr3.multiplyByMatrix(matr4));

console.log(matr1.toString());
console.log(matr1.reverse().toString());
module.exports = Matrix;

// Крестики Нолики
// Шахматы
// Покер-like
// Вектора(Тензоры, Графы)
// Календарь задач
// Тетрис
