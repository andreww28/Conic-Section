class Ellipse{
    constructor(equation){
        this.equation = equation.replace(/ /g, '').replace(/²/g, '^2');
        this.h = 0;
        this.k = 0;
        this.a2 = null;
        this.b2 = null;
        this.a = null;
        this.b = null;
        this.c = null;
        this.center = null;
        this.foci = null;
        this.major_axis = null;
        this.minor_axis = null;
        this.major_vertices = null;
        this.minor_vertices = null;
    }

    validate(){
        this.equation = this.equation.replace(/x\^2/, '(x-0)^2').replace(/y\^2/, '(y-0)^2');
        const valid_format = {
            h: /^\(x[\+\-]\d+\)\^2\/\d+\+\(y[\+\-]\d+\)\^2\/\d+\=1$/,
            v: /^\(y[\+\-]\d+\)\^2\/\d+\+\(x[\+\-]\d+\)\^2\/\d+\=1$/,
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
        this.set_independent_var();
        this.setCenter();
        this.set_other_parts();
    }

    set_independent_var(){
        let x_num = eval(this.equation.match(/\(?x.(\d+\)\^)?2\/\d+/g)[0].split('/')[1]);
        let y_num = eval(this.equation.match(/\(?y.(\d+\)\^)?2\/\d+/g)[0].split('/')[1]);
    
        if(x_num > y_num){
            this.a2 = x_num;
            this.b2 = y_num;
            this.major_axis = 'horizontal';
            this.minor_axis = 'vertical';
        }else if(x_num < y_num){
            this.a2 = y_num;
            this.b2 = x_num;
            this.major_axis = 'vertical';
            this.minor_axis = 'horizontal';
        }

        this.c = Math.sqrt(this.a2 - this.b2);
    }

    setCenter(){
        if(this.equation.match(/\(x.\d+/)){
            this.h = eval(this.equation.match(/\(x.\d+/)[0].substring(2)) * -1;
        }
        
        if(this.equation.match(/\(y.\d+/)){
            this.k = eval(this.equation.match(/\(y.\d+/)[0].substring(2)) * -1;
        }
    }

    set_other_parts(){
        this.a = Math.sqrt(this.a2);
        this.b = Math.sqrt(this.b2);
        this.center = `(${this.h}, ${this.k})`;

        if(this.major_axis === 'horizontal'){
            this.foci = `{(${this.h - this.c}, ${this.k}), (${this.h + this.c}, ${this.k})}`;
            this.major_vertices = `{(${this.h - this.a}, ${this.k}), (${this.h + this.a}, ${this.k})}`;
            this.minor_vertices = `{(${this.h}, ${this.k + this.b}), (${this.h}, ${this.k - this.b})}`;
        }else if(this.major_axis === 'vertical'){
            this.foci = `{(${this.h}, ${this.k - this.c}), (${this.h}, ${this.k + this.c})}`;
            this.major_vertices = `{(${this.h}, ${this.k - this.a}), (${this.h}, ${this.k + this.a})}`;
            this.minor_vertices = `{(${this.h + this.b}, ${this.k}), (${this.h - this.b}, ${this.k})}`;
        }
    }

    get_parts_value(){
        return [this.major_axis, this.minor_axis, this.c, this.center, this.foci, this.major_vertices, this.minor_vertices, this.a*2, this.b*2];
    }
}