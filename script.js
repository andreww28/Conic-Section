const Parabola_parts = function (){
    const main_parabola = Main(); 
    const equation = document.querySelector('#equation').value;

    let opening = getOpening();
    let c = eval(getFocalLength());
    let [h,k] = getVertex();

    let focus,directrix,aos,lr,elr;

    function getOpening(){
        directions = {
            Upward:  /\=(\s?)+(\d?)+(\/\d+)?(\.\d+)?\(y/,
            Downward: /\=(\s?)+\-(\d?)+(\/\d+)?(\.\d+)?\(y/,
            "To the right": /\=(\s?)+(\d?)+(\/\d+)?(\.\d+)?\(x/,
            "To the left": /\=(\s?)+\-(\d?)+(\/\d+)?(\.\d+)?\(x/
        };

        for(const [key,value] of Object.entries(directions)){
            let result = equation.match(value);
            if(result){
                return key;
            }
        }
    }


    function getFocalLength(){
        const cases = {
            wholeNumber : /\=(\s?)+\-?\d+(\s?)+\(/,
            noNumber : /\=(\s?)+\-?(\s?)+\(/,
            fraction: /\=(\s?)+\-?\d+(.\d+)?\/\d+(.\d+)?(\s?)+\(/,
            decimal : /\=(\s?)+\-?\d+\.\d+(\s?)+\(/,
        }

        let c ;
        if(equation.match(cases.noNumber)){
            return math.fraction(`${1/4}`);
        }else if(equation.match(cases.wholeNumber)){
            c = equation.match(cases.wholeNumber)[0].split(' ')[1].slice(0,-1);
        }else if(equation.match(cases.fraction)){
            c = equation.match(cases.fraction)[0].split(' ')[1].slice(0,-1)
            c = eval(c);
        }else if(equation.match(cases.decimal)){
            c = equation.match(cases.decimal)[0].split(' ')[1].slice(0,-1)
        }
        return Math.abs(parseFloat(c/4));
    }


    function getVertex(){

        const h = equation.match(/x.\d+(\/\d+)?(\.\d+)?/)[0].slice(1);
        const k = equation.match(/y.\d+(\/\d+)?(\.\d+)?/)[0].slice(1);

        return [h,k].map((num) => parseFloat(eval(num)) * -1);
    }


    function getOtherParts(){
        if(opening == "Upward"){
            focus = `(${main_parabola.convert_num(h)}, ${main_parabola.convert_num(k + c)})`
            directrix = `y = ${main_parabola.convert_num(k - c)}`
            aos = `x = ${main_parabola.convert_num(h)}`
            lr = 4 * c
            elr = `[(${main_parabola.convert_num(h + 2*c)}, ${main_parabola.convert_num(k + c)}), (${main_parabola.convert_num(h- 2*c)}, ${main_parabola.convert_num(k + c)})]`
        }else if(opening == "Downward"){
            console.log(c);
            focus = `(${main_parabola.convert_num(h)}, ${main_parabola.convert_num(k - c)})`
            directrix = `y = ${main_parabola.convert_num(k + c)}`
            aos = `x = ${main_parabola.convert_num(h)}`
            lr = 4 * c
            elr = `[(${main_parabola.convert_num(h + 2*c)}, ${main_parabola.convert_num(k - c)}), (${main_parabola.convert_num(h- 2*c)}, ${main_parabola.convert_num(k - c)})]`
        }else if(opening == "To the left"){
            focus = `(${main_parabola.convert_num(h-c)}, ${main_parabola.convert_num(k)})`
            directrix = `x = ${main_parabola.convert_num(h+c)}`
            aos = `y = ${main_parabola.convert_num(k)}`
            lr = 4 * c
            elr = `[(${main_parabola.convert_num(h-c)}, ${main_parabola.convert_num(k + 2*c)}), (${main_parabola.convert_num(h-c)}, ${main_parabola.convert_num(k - 2*c)})]`
        }else if(opening == "To the right"){
            focus = `(${main_parabola.convert_num(h+c)}, ${main_parabola.convert_num(k)})`
            directrix = `x = ${main_parabola.convert_num(h-c)}`
            aos = `y = ${main_parabola.convert_num(k)}`
            lr = 4 * c
            elr = `[(${main_parabola.convert_num(h+c)}, ${main_parabola.convert_num(k + 2*c)}), (${main_parabola.convert_num(h+c)}, ${main_parabola.convert_num(k - 2*c)})]`
        }

        return [focus,directrix,aos,`${lr} unit/s`,elr]
    }

    return {
        getOpening,
        getOtherParts,
        getVertexForm : () => `(${main_parabola.convert_num(h)}, ${main_parabola.convert_num(k)})`,
    }
};


const Main = function(){
    const graph_div = document.querySelector('.graph-div');
    const cancel_graph_btn =  document.querySelector('#graph-cancel');
    const label = Array.from(document.querySelectorAll('.value'));
    const clear_btn = document.querySelector('#clear');
    const show_graph_btn = document.querySelector('#graph-btn');
    const main_container = document.querySelector('.main-container');
    const valid_eq_re = /\([xy][\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)\^2(\s?)+=(\s?)+\-?(\d?(\/\d+)?(\.{0,1}\d+){0,1})+(\s?)+\([xy][\+\-]\d+(\/\d+)?(\.?\d+){0,1}\)/
    
    var graph_exist = false;
    var calculator;

    function convert_num(num){
        return num
        let obj = math.fraction(num);
        let n = obj.n;
        let d = obj.d;
    
        if(d != 1){
            return `${n}/${d}`
        }
        return num
    }
    
    
    function validate_eq(){
        if(equation.value.match(valid_eq_re)){
            equation.style.border = "4px solid green";
            show_graph_btn.disabled = false;
            show_graph_btn.style.cursor = "arrow";
            set_value();
        }else{
            equation.style.border = "4px solid red";
            show_graph_btn.disabled = true;
            show_graph_btn.style.cursor = "pointer";
            label.map(l => l.textContent = "???");
        }        
    }
    
    
    function set_value(){
        const parabola = Parabola_parts(equation.value);
        const value = [parabola.getOpening(), parabola.getVertexForm()].concat(parabola.getOtherParts());
        
        for(let i = 0; i < label.length; i++){
            label[i].textContent = value[i];
        }
    }
    
    
    function clear(){
        equation.value = '';
        label.map(l => l.textContent = "???");
        show_graph_btn.disabled = true;
        show_graph_btn.style.cursor = "pointer";
    }
    
    
    function show_graph(){
        if(!graph_exist){
            var elt = document.getElementById('calculator');
            calculator = Desmos.GraphingCalculator(elt);
            graph_exist = true;
        }
    
        calculator.setExpression({ id: 'graph1', latex: equation.value});
        main_container.style.filter = "blur(5px)";
        graph_div.style.transform = "translate(-50%, -50%)";
    }

    
    function hide_graph(){
        graph_div.style.transform = "translate(-50%, -400%)";
        main_container.style.filter = "blur(0px)";
    }


    function addEvent(){
        clear_btn.addEventListener('click', clear);
        equation.addEventListener('keyup', validate_eq);
        show_graph_btn.addEventListener('click', show_graph);
        cancel_graph_btn.addEventListener('click', hide_graph);
    }

    return {
        addEvent,
        convert_num,
        validate_eq,
    }
};




const real_life_prob = function (){
    const calc_inputs_btn = document.querySelector('#calculate-inputs')
    const clear_inputs_btn = document.querySelector('#clear-inputs');
    const rl_inputs = Array.from(document.querySelectorAll('.rl-input'));
    rl_inputs[rl_inputs.length -1].disabled = true;

    let [wide, deep, p, focus] = rl_inputs;
    let right_side;
    let left_side;
    let result;
    let x = parseFloat(wide.value) / 2

    function setP(){
        right_side = 4 * eval(deep.value);
        result = x**2 / right_side
        p.value = main_parabola.convert_num(parseFloat(result));
    }


    function setFocus(){
        focus.value = '(0, ' + p.value + ')';
    }


    function setDeep(){
        left_side = x**2;
        right_side = parseFloat(4 * eval(p.value));
        deep.value = main_parabola.convert_num(left_side/right_side);
    }


    function setWide(){
        wide.value = main_parabola.convert_num((Math.sqrt(4*eval(p.value)*eval(deep.value)) * 2));
    }

    
    function check_inputs(){
        if(rl_inputs.filter(input => input.value === '').length != 2) return;

        rl_inputs.forEach(input => {
            input.disabled = true;
            if(input.value ==- '') input.style.color = 'rgb(151, 233, 113)';
        });
    
        if(p.value === '' && (wide.value != '' && deep.value != '')){
            setP();
            setFocus();
        }else if(wide.value === '' && (deep.value != '' && p.value != '')){
            setWide();
            setFocus();
        }else if(deep.value === '' && (wide.value != '' && p.value != '')){
            setDeep();
            setFocus();
        }else if(p.value != '' && focus.value ===''){
            setFocus();
        }
    }

    
    function clear_input(){
        rl_inputs.forEach(input => {
            input.value = '';
            input.disabled = false;
            input.style.color = 'white';
        });
        rl_inputs[rl_inputs.length -1].disabled = true;
    }


    function addEvent(){
        clear_inputs_btn.addEventListener('click', clear_input);
        calc_inputs_btn.addEventListener('click', check_inputs);
    }

    return{
        setP,
        setFocus,
        setWide,
        setDeep,
        check_inputs,
        clear_input,
        addEvent,
    }
};


(function () {
    const main_parabola = Main();
    const rl_parabola = real_life_prob();

    
    function addEvent(){
        main_parabola.addEvent();
        rl_parabola.addEvent();
        window.addEventListener('load', () => {
            main_parabola.validate_eq();
            rl_parabola.clear_input();
        });
    }
    
    addEvent();
})()
