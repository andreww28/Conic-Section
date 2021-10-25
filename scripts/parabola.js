class Parabola{
    constructor(equation){
        this.equation = equation;
        this.valid_eq_re = /^\([xy][\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)\^2(\s?)+=(\s?)+\-?(\d?(\/\d+)?(\.{0,1}\d+){0,1})+(\s?)+\([xy][\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)$/;
        this.opening = null;
        this.h = null;
        this.k = null;
        this.c = null;
    }

    validate(){
        return this.equation.match(this.valid_eq_re);
    }

    assign_values(){
        this.opening = this.getOpening();
        this.h = this.getVertex()[0];
        this.k = this.getVertex()[1];
        this.c = eval(this.getFocalLength());
    }

    getOpening(){
        const directions = {
            Upward:  /\=(\s?)+(\d?)+(\/\d+)?(\.\d+)?\(y/,
            Downward: /\=(\s?)+\-(\d?)+(\/\d+)?(\.\d+)?\(y/,
            "To the right": /\=(\s?)+(\d?)+(\/\d+)?(\.\d+)?\(x/,
            "To the left": /\=(\s?)+\-(\d?)+(\/\d+)?(\.\d+)?\(x/
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
            wholeNumber : /\=(\s?)+\-?\d+(\s?)+\(/,
            noNumber : /\=(\s?)+\-?(\s?)+\(/,
            fraction: /\=(\s?)+\-?\d+(.\d+)?\/\d+(.\d+)?(\s?)+\(/,
            decimal : /\=(\s?)+\-?\d+\.\d+(\s?)+\(/,
        }

        let c ;
        if(this.equation.match(cases.noNumber)){
            return 1/4;
        }else if(this.equation.match(cases.wholeNumber)){
            c = this.equation.match(cases.wholeNumber)[0].split(' ')[1].slice(0,-1);
        }else if(this.equation.match(cases.fraction)){
            c = this.equation.match(cases.fraction)[0].split(' ')[1].slice(0,-1)
            c = eval(c);
        }else if(this.equation.match(cases.decimal)){
            c = this.equation.match(cases.decimal)[0].split(' ')[1].slice(0,-1)
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