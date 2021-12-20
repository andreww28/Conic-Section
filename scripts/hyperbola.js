class Hyperbola{
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
        this.transverse_axis = null;
        this.conjugate_axis = null;
        this.major_vertices = null;
        this.minor_vertices = null;
        this.eq_asymptote = null;
    }

    validate(){
        // var t = new toStandard(this.equation)
        // t.setVal();
        // this.equation = t.get_standard_form().replace(/ /g, '').replace(/²/g, '^2');

        this.equation = this.equation.replace(/x\^2/, '(x-0)^2').replace(/y\^2/, '(y-0)^2');
        const valid_format = {
            sideward: /^\(x[\+\-]\d+\)\^2\/\d+\-\(y[\+\-]\d+\)\^2\/\d+\=1$/,
            up_downward: /^\(y[\+\-]\d+\)\^2\/\d+\-\(x[\+\-]\d+\)\^2\/\d+\=1$/,
        }
        for(const [key,value] of Object.entries(valid_format)){
            let result = this.equation.match(value);
            if(result){
                this.set_independent_var(key);
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

    set_independent_var(opening_direction){
        let x_num = eval(this.equation.match(/\(?x.(\d+\)\^)?2\/\d+/g)[0].split('/')[1]);
        let y_num = eval(this.equation.match(/\(?y.(\d+\)\^)?2\/\d+/g)[0].split('/')[1]);
    
        if(opening_direction === 'sideward'){
            this.a2 = x_num;
            this.b2 = y_num;
            this.transverse_axis = 'horizontal';
            this.conjugate_axis = 'vertical';
        }else if(opening_direction === 'up_downward'){
            this.a2 = y_num;
            this.b2 = x_num;
            this.transverse_axis = 'vertical';
            this.conjugate_axis = 'horizontal';
        }

        this.c = Math.sqrt(this.a2 + this.b2);
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

        if(this.transverse_axis === 'horizontal'){
            this.foci = `{(${this.h - this.c}, ${this.k}), (${this.h + this.c}, ${this.k})}`;
            this.major_vertices = `{(${this.h - this.a}, ${this.k}), (${this.h + this.a}, ${this.k})}`;
            this.minor_vertices = `{(${this.h}, ${this.k + this.b}), (${this.h}, ${this.k - this.b})}`;
            this.eq_asymptote = `y = +-${this.b / this.a}x`
        }else if(this.transverse_axis === 'vertical'){
            this.foci = `{(${this.h}, ${this.k - this.c}), (${this.h}, ${this.k + this.c})}`;
            this.major_vertices = `{(${this.h}, ${this.k - this.a}), (${this.h}, ${this.k + this.a})}`;
            this.minor_vertices = `{(${this.h + this.b}, ${this.k}), (${this.h - this.b}, ${this.k})}`;
            this.eq_asymptote = `y = +-${this.a / this.b}x`
        }
    }

    get_parts_value(){
        return [this.center, this.conjugate_axis, this.transverse_axis, this.foci, this.major_vertices, this.minor_vertices, this.eq_asymptote]
    }
}