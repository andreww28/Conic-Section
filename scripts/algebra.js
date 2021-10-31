class Circle{
    constructor(equation){
        this.equation = equation.replace(/ /g, "");
        this.right_side = null;
        this.left_side = null;
        this.x2 = 0;
        this.y2 = 0;
        this.Dx = 0;
        this.Ey = 0;
        this.F = 0;
    }

    _split_equation(){
        console.log(this.equation.split('='));
        [this.left_side, this.right_side] = this.equation.split('=');

        this.right_side = this.right_side.match(/([\+\-])?(\d+)?(x)?(y)?(\^2)?/g).filter(exp => exp != '');
        this.left_side = this.left_side.match(/([\+\-])?(\d+)?(x)?(y)?(\^2)?/g).filter(exp => exp != '');

        this._combine_like_terms();
    }

    _change_sign(term){
        let sign = term.charAt(0);
        let num;
        if(term.charAt(0) == '+' || term.charAt(0) == '-'){
            num = term.substring(1, term.length -1);
        }else{
            num = term;
        }

        if(sign == '-'){
            return '+' + num;
        }else{
            return '-' + num;
        }
    }

    _transpose(target_side, dest_side, nums){
        if(nums === 'all'){
            target_side.forEach( term => dest_side.push(this._change_sign(term)));
        }else if(typeof(nums) == 'object'){
            nums.forEach( term => dest_side.push(this._change_sign(term)));
        }else if(typeof(nums) === 'string'){
            dest_side.push(this._change_sign(nums));
        }

        return dest_side;

    }

    _combine_like_terms(){
        const term_format = {
            x2: /^[\+\-]?(\d+)?x\^2$/,
            y2: /^[\+\-]?(\d+)?y\^2$/,
            Dx: /^([\+\-])?(\d+)?x$/,
            Ey: /^([\+\-])?(\d+)?y$/,
            F: /^([\+\-])?(\d+)$/
        }

        const term_holder = [this.x2, this.y2, this.Dx, this.Ey, this.F];

        if(this.right_side[0] != '0'){
            this.left_side = this._transpose(this.right_side, this.left_side, 'all');
        }

        for(const [key,value] of Object.entries(term_format)){
            this.left_side.forEach((term, index) => {
                //console.log(term);
                let result = term.match(value)
                if(result != null){
                    term_holder[index] = result[0]
                }
            });
        }


        console.log(term_holder);
        console.log(this.to_Standard());
    }

    to_Standard(){
        let left_side;
        let right_side;

        if(this.Dx != 0 && this.Ey != 0){
            left_side = `(x ${this.Dx.charAt(0)} ${(this.Dx/2)})^2 + ${this.Ey.charAt(0)} (y + ${(this.Ey/2)})^2`;
            right_side = this.F + (this.Dx/2)**2 + (this.Ey/2)**2;
        }else if(this.Dx == 0 && this.Ey != 0){
            left_side = `(x - 0)^2 + (y ${this.Ey.charAt(0)} ${(this.Ey/2)})^2`;
            right_side = this.F + (this.Ey/2)**2;
        }else if(this.Dx != 0 && this.Ey == 0){
            left_side = `(x ${this.Dx.charAt(0)} ${(this.Dx/2)})^2 + (y-0)^2`;
            right_side = this.F + (this.Dx/2)**2;
        }else if(this.Dx == 0 && this.Ey == 0){
            left_side = '(x-0)^2 + (y-0)^2';
            right_side = this.F;
        }

        return `${left_side} = ${right_side}`;
    }

    factoring(a,b,c, variable){
        let eq1 = eval((-b+(Math.sqrt(b**2 - (4 * a *c))))/2*a) * -1;
        let eq2 = eval((-b-(Math.sqrt(b**2 - (4 * a *c))))/2*a) * - 1;
        
        if(a != 1 && eq1 >= 0){
            return `(${a}${variable} + ${eq1})^2`
        }else if(a!= 1 && eq1 < 0){
            return `(${a}${variable} - ${eq1})^2`
        }else if(a== 1 && eq1 < 0){
            return `(${variable} - ${eq1})^2`
        }else if(a == 1 && eq1 >= 0){
            return `(${variable} + ${eq1})^2`
        }
    }
}