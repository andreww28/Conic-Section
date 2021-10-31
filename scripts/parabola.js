class Parabola{
    constructor(equation){
        this.equation = equation.replace(/ /g, '').replace(/²/g, '^2');
        this.opening = null;
        this.h = null;
        this.k = null;
        this.c = null;
    }

    validate(){
        this.equation = this.equation.replace(/x\^2/, '(x-0)^2').replace(/y\^2/, '(y-0)^2').replace(/y$/, '(y-0)').replace(/x$/, '(x-0)');

        const valid_format = {
            case1 : /^\(x[\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)\^2\=\-?(\d?(\/\d+)?(\.{0,1}\d+){0,1})+\(y[\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)$/,
            case2 : /^\(y[\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)\^2\=\-?(\d?(\/\d+)?(\.{0,1}\d+){0,1})+\(x[\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)$/,
        }
        
        for(const [key,value] of Object.entries(valid_format)){
            let result = this.equation.match(value);
            if(result){
                return true;
            }
        }
        return false;
    }

    assign_values(){
        this.opening = this.getOpening();
        this.h = this.getVertex()[0];
        this.k = this.getVertex()[1];
        this.c = eval(this.getFocalLength());
    }

    getOpening(){
        const directions = {
            Upward:  /\=(\d?)+(\/\d+)?(\.\d+)?\(y/,
            Downward: /\=\-(\d?)+(\/\d+)?(\.\d+)?\(y/,
            "To the right": /\=(\d?)+(\/\d+)?(\.\d+)?\(x/,
            "To the left": /\=\-(\d?)+(\/\d+)?(\.\d+)?\(x/
        };

        for(const [key,value] of Object.entries(directions)){
            let result = this.equation.match(value);
            if(result){
                return key;
            }
        }
    }

    getFocalLength(){
        const cases = {
            wholeNumber : /\=\-?\d+\(/,
            noNumber : /\=\-?\(/,
            fraction: /\=\-?\d+(.\d+)?\/\d+(.\d+)?\(/,
            decimal : /\=\-?\d+\.\d+\(/,
        }

        let c ;
        if(this.equation.match(cases.noNumber)){
            return 1/4;
        }else if(this.equation.match(cases.wholeNumber)){
            c = this.equation.match(cases.wholeNumber)[0].split('(')[0].substring(1);
            console.log(this.equation.match(cases.wholeNumber)[0].split('('));
        }else if(this.equation.match(cases.fraction)){
            c = this.equation.match(cases.fraction)[0].split('(')[0].substring(1);
            c = eval(c);
        }else if(this.equation.match(cases.decimal)){
            c = this.equation.match(cases.decimal)[0].split('(')[0].substring(1);
        }
        return Math.abs(parseFloat(c/4));
    }

    getVertex(){
        const h = this.equation.match(/x.\d+(\/\d+)?(\.\d+)?/)[0].slice(1);
        const k = this.equation.match(/y.\d+(\/\d+)?(\.\d+)?/)[0].slice(1);

        return [h,k].map((num) => parseFloat(eval(num)) * -1);
    }

    getOtherParts(){
        let focus,directrix,aos,lr,elr;

        if(this.opening == "Upward"){
            focus = `(${this.h}, ${this.k + this.c})`
            directrix = `y = ${this.k-this.c}`
            aos = `x = ${this.h}`
            lr = 4 * this.c
            elr = `[(${this.h + 2*this.c}, ${this.k + this.c}), (${this.h- 2*this.c}, ${this.k + this.c})]`
        }else if(this.opening == "Downward"){
            focus = `(${this.h}, ${this.k - this.c})`
            directrix = `y = ${this.k + this.c}`
            aos = `x = ${this.h}`
            lr = 4 * this.c
            elr = `[(${this.h + 2*this.c}, ${this.k - this.c}), (${this.h- 2*this.c}, ${this.k - this.c})]`
        }else if(this.opening == "To the left"){
            focus = `(${this.h-this.c}, ${this.k})`
            directrix = `x = ${this.h+this.c}`
            aos = `y = ${this.k}`
            lr = 4 * this.c
            elr = `[(${this.h-this.c}, ${this.k + 2*this.c}), (${this.h-this.c}, ${this.k - 2*this.c})]`
        }else if(this.opening == "To the right"){
            focus = `(${this.h+this.c}, ${this.k})`
            directrix = `x = ${this.h-this.c}`
            aos = `y = ${this.k}`
            lr = 4 * this.c
            elr = `[(${this.h+this.c}, ${this.k + 2*this.c}), (${this.h+this.c}, ${this.k - 2*this.c})]`
        }

        return [focus,directrix,aos,`${lr} unit/s`,elr]
    }

    get_all_parts_value(){
        const parts_values = [this.opening, this.c, `(${this.h}, ${this.k})`, ...this.getOtherParts()];
        return parts_values;
    }
}