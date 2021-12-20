class Main_Function{

}


class toStandard_ellipse{
    constructor(equation){
        this.equation = equation.replace(/\s/g, '').replace(/\^2/g, '²'); //x^2 + 4y^2 +2x + 8y + 1 = 0
        this.x2 = this.equation.match(/[\+\-]?(\d+)?x²/); //1
        this.y2 = this.equation.match(/[\+\-]?(\d+)?y²/); //4
        this.Dx = 0
        this.Ey = 0
        this.F =  0

        this.xyz = {
            dx : /[\+\-]?\d+x[\+\-]/,
            ey : /[\+\-]?\d+y[\+\-]/,
            f : /[\+\-]?\d+=/
        }
    }

    setx2y2(){
        if(this.x2[0].split('')[0] === 'x'){
            this.x2 = 1
        }else if(this.x2[0].split('')[0] === '-' && this.x2[0].split('')[0] === 'x'){
            this.x2 = -1
        }else{
            this.x2 = this.x2[0].match(/\-?\d+/)[0]
        }

        if(this.y2[0].split('')[1] === 'y'){
            this.y2 = 1
        }else if(this.y2[0].split('')[0] === '-' && this.y2[0].split('')[0] === 'x'){
            this.y2 = -1
        }else{
            this.y2 = this.y2[0].match(/\-?\d+/)[0]
        }
    }

    setxyz(regex){
        var temp = this.equation.match(regex);
        if(temp){
            return temp[0].match(/[\+\-]\d+/)[0]
        }else{
            return 0;
        }
    }

    setVal(){
        try {
            this.setx2y2()
            this.Dx = this.setxyz(this.xyz.dx);
            this.Ey = this.setxyz(this.xyz.ey);
            this.F = this.setxyz(this.xyz.f);
        } catch (TypeError) {
        }
    }

    setTrinomial(){
        this.Dx = eval(this.Dx / this.x2);  // 2x / 1 = 2x
        this.Ey = eval(this.Ey / this.y2);  // 8y / 4 = 2y
        
        var temp_fx = (this.Dx / 2) ** 2;  // (2 / 2)^2 = 1 ; therefore, 1(x^2 + 2x + 1)
        var temp_fy = (this.Ey / 2) ** 2;  // (2 / 2)^2 = 1 ; therefore, 4(y^2 + 2y + 1)
        this.F = eval(this.F * -1) + (this.x2 * temp_fx) + (this.y2 * temp_fy); // -1 + 1(1) + 4(1)
    }

    get_standard_form(shape){
        this.setTrinomial();
        var denom_x = this.F / this.x2; 
        var denom_y = this.F / this.y2;

        var nume_x = `(x ${this.addSign(this.Dx)} ${this.Dx /2})²`
        var nume_y = `(y ${this.addSign(this.Ey)} ${this.Ey / 2})²`
        console.log(`${nume_x} / ${denom_x} + ${nume_y} / ${denom_y} = 1`)
        return `${nume_x} / ${denom_x} + ${nume_y} / ${denom_y} = 1`;
    }

    addSign(num){
        if(num > 0){
            return `+`
        }else{
            return '-'
        }
    }
}