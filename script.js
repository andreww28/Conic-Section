const equation = document.querySelector('#equation');
const label = Array.from(document.querySelectorAll('.value'));
const clear_btn = document.querySelector('#clear');
const show_graph_btn = document.querySelector('#graph-btn');
const main_container = document.querySelector('.main-container');

const graph_div = document.querySelector('.graph-div');
const cancel_graph_btn =  document.querySelector('#graph-cancel');

const rl_inputs = Array.from(document.querySelectorAll('.rl-input'));
const calc_inputs_btn = document.querySelector('#calculate-inputs')
const clear_inputs_btn = document.querySelector('#clear-inputs');

const valid_eq_re = /\([xy][\+\-]\d+\)\^2(\s?)+=(\s?)+\-?(\d?)+(\s?)+\([xy][\+\-]\d+\)/

var graph_exist = false;
var calculator;

const Parabola = function (equation){
    let [h,k] = getVertex();
    let c = getFocalLength();
    let opening = getOpening();

    let focus,directrix,aos,lr,elr;

    function getOpening(){
        directions = {
            Upward:  /\=(\s?)+(\d?)+\(y/,
            Downward: /\=(\s?)+\-(\d?)+\(y/,
            "To the right": /\=(\s?)+(\d?)+\(x/,
            "To the left": /\=(\s?)+\-(\d?)+\(x/
        };

        for(const [key,value] of Object.entries(directions)){
            let result = equation.match(value);
            if(result){
                return key;
            }
        }
    }

    function getFocalLength(){
        let temp;
        if(equation.match(/\=(\s?)+\-?(\s?)+\(/)){
            temp = math.number(1 / 4);
            return math.fraction(`${1/4}`);
        }else{
            const c = equation.match(/\-?\d+(\s?)+\(/)[0].slice(0,-1);
            return parseFloat(c/4);
        }
    }

    function getVertex(){
        const h = equation.match(/x.\d+/)[0].slice(1);
        const k = equation.match(/y.\d+/)[0].slice(1);

        return [h,k].map((num) => parseInt(num) * -1);
    }

    function getOtherParts(){
        if(opening == "Upward"){
            focus = `(${convert_num(h)}, ${convert_num(k + c)})`
            directrix = `y = ${convert_num(k - c)}`
            aos = `x = ${convert_num(h)}`
            lr = 4 * c
            elr = `[(${convert_num(h + 2*c)}, ${convert_num(k + c)}), (${convert_num(h- 2*c)}, ${convert_num(k + c)})]`
        }else if(opening == "Downward"){
            focus = `(${convert_num(h)}, ${convert_num(k - c)})`
            directrix = `y = ${convert_num(k + c)}`
            aos = `x = ${convert_num(h)}`
            lr = -4 * c
            elr = `[(${convert_num(h + 2*c)}, ${convert_num(k - c)}), (${convert_num(h- 2*c)}, ${convert_num(k - c)})]`
        }else if(opening == "To the left"){
            focus = `(${convert_num(h-c)}, ${convert_num(k)})`
            directrix = `x = ${convert_num(h+c)}`
            aos = `y = ${convert_num(k)}`
            lr = -4 * c
            elr = `[(${convert_num(h-c)}, ${convert_num(k + 2*c)}), (${convert_num(h-c)}, ${convert_num(k - 2*c)})]`
        }else if(opening == "To the right"){
            focus = `(${convert_num(h+c)}, ${convert_num(k)})`
            directrix = `x = ${convert_num(h-c)}`
            aos = `y = ${convert_num(k)}`
            lr = 4 * c
            elr = `[(${convert_num(h+c)}, ${convert_num(k + 2*c)}), (${convert_num(h+c)}, ${convert_num(k - 2*c)})]`
        }

        return [focus,directrix,aos,`${lr} unit/s`,elr]
    }

    return {
        getOpening,
        getOtherParts,
        getVertexForm : () => `(${convert_num(h)}, ${convert_num(k)})`,
    }
}


function convert_num(num){
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
    const parabola = Parabola(equation.value);
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


function check_inputs(){
    const [wide,deep,p,focus] = rl_inputs;
    const real_life_parabola = real_life_prob(wide,deep,p,focus);

    if(p.value === '' && (wide.value != '' && deep.value != '')){
        real_life_parabola.setP();
        real_life_parabola.setFocus();
    }else if(wide.value === '' && (deep.value != '' && p.value != '')){
        real_life_parabola.setWide();
        real_life_parabola.setFocus();
    }else if(deep.value === '' && (wide.value != '' && p.value != '')){
        real_life_parabola.setDeep();
        real_life_parabola.setFocus();
    }else if(p.value != '' && focus.value ===''){
        real_life_parabola.setFocus();
    }

    rl_inputs.map(input => input.disabled = true);
}

function clear_input(){
    rl_inputs.map(input => input.value = '');
    rl_inputs.map(input => input.disabled = false);
}


const real_life_prob = function (wide,deep,p,focus){
    let right_side;
    let left_side;
    let result;
    let x = parseFloat(wide.value) / 2

    function setP(){
        right_side = 4 * eval(deep.value);
        result = x**2 / right_side
        p.value = convert_num(parseFloat(result));
    }

    function setFocus(){
        focus.value = '(0, ' + p.value + ')';
    }

    function setDeep(){
        left_side = x**2;
        right_side = parseFloat(4 * eval(p.value));
        deep.value = convert_num(left_side/right_side);
    }

    function setWide(){
        wide.value = convert_num((Math.sqrt(4*eval(p.value)*eval(deep.value)) * 2));
    }

    return{
        setP,
        setFocus,
        setWide,
        setDeep,
    }
}


clear_btn.addEventListener('click', clear);
equation.addEventListener('keyup', validate_eq);
show_graph_btn.addEventListener('click', show_graph);
cancel_graph_btn.addEventListener('click', hide_graph);

clear_inputs_btn.addEventListener('click', clear_input);
calc_inputs_btn.addEventListener('click', check_inputs);
window.addEventListener('load', () => {
    validate_eq();
    clear_input();
});
