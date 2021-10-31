class Circle{
    constructor(equation){
        this.equation = equation.replace(/ /g, '');
        this.valid_eq = /^\(x[\+\-]\d+\)\^2\+\(y[\+\-]\d+\)\^2=\d+$/
        this.h = null;
        this.k = null;
        this.radius = null;
        this.diameter = null;
        this.area = null;
        this.circumference = null;
    }

    validate(){
        return this.equation.match(this.valid_eq);
    }

    assign_values(){
        this.center = this.getCenter();
        this.radius = Math.round(Math.sqrt(parseInt(this.equation.match(/=\d+/)[0].slice(1))) * 1000 ) / 1000;
        this.diameter = this.radius * 2;
        this.area = Math.round((Math.PI * this.radius ** 2) * 1000) / 1000;
        this.circumference = Math.round((2 * Math.PI * this.radius) * 1000) / 1000;
    }

    getCenter(){
        this.h = parseInt(this.equation.match(/x[\+\-]\d+/)[0].slice(1)) * -1;
        this.k = parseInt(this.equation.match(/y[\+\-]\d+/)[0].slice(1)) * -1;

        return `(${this.h}, ${this.k})`;
    }

    // getRadius(){
    //     let num = parseInt(this.equation.match(/=\d+/)[0].slice(1));

    //     if(temp.match(/\./)){
    //         return '√' + num;
    //     }else{
    //         return Math.sqrt(num).toString();
    //     }
    // }

    get_parts_value(){
        return [this.center, this.radius, this.diameter, this.area, this.circumference];
    }
}