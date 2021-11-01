
const Main = function (){
  var x = document.getElementById("myLinks");
  const ham_icon = document.querySelector(".icon");

  function show_nav() {
      if (x.style.display === "flex") {
        x.style.display = "none";
      } else {
        x.style.display = "flex";
      }
  } 

  function check_window_size(){
    if(window.innerWidth < 800){
      const navLink = Array.from(document.querySelectorAll('.navlink'));
      navLink.map(link => link.addEventListener('click', () => x.style.display = "none"));
    }
  }

  function addEvent(){
    ham_icon.addEventListener('click', show_nav);
  }

  return {
    addEvent,
    check_window_size,
  }
}


const Shape_part = function(){
  const show_graph_btn = document.querySelector('#show-graph');
  const shape_selection = document.querySelector('#shape-selection');
  const equation_input = document.querySelector('#input-eq');
  const output_div = document.querySelector('.output-div');
  const shape_methods = Shape_methods();
  
  function set_nodes_value(values){
    const node_values = Array.from(document.querySelectorAll('.value'));
    for(let i = 0; i < node_values.length; i++){
      node_values[i].textContent = values[i];
    }
  }

  function set_output_nodes(titles){
    output_div.innerHTML = '';
    let nodes = '<p id="legend">Parts:</p>';

    for(let i = 0; i < titles.length; i++){
      nodes += `
            <div class="parts">
                <p class="title">${titles[i]}:</p>
                <p class="value">undefined</p>
            </div>
      `;
    }

    output_div.innerHTML = nodes;
  }

  function validate(bool){
    if(bool){
      equation_input.style.border = '3px solid green';
      show_graph_btn.disabled = false;
      return;
    }else if(equation_input.value.length === 0){
      equation_input.style.border = '2px solid var(--dark-bg)';
    }else{
      equation_input.style.border = '3px solid red';
    }
    show_graph_btn.disabled = true;
  }


  function check_shape(shape){
    let equation = equation_input.value;

    switch (shape.toLowerCase()){
      case 'circle':
        circle(equation);
        break;

      case 'parabola':
        parabola(equation);
        break;

      case 'ellipse':
        ellipse(equation);
        break;

      case 'hyperbola':
        hyperbola(equation);
        break;
    }
  }

  function parabola(equation){
    set_output_nodes(['Directions', 'Focal Length(p)', 'Vertex', 'Focus', 'Directrix', 'Axis of Symmetry', 'Length of Latus Rectum', 'Endpoints of Latus Rectum']);
    const Parabola_c = new Parabola(equation);
    const is_valid = Parabola_c.validate();

    validate(is_valid);
    if(is_valid){
      Parabola_c.assign_values();
      set_nodes_value(Parabola_c.get_all_parts_value());
    }
  }


  function circle(equation){
    set_output_nodes(['Center', 'Radius', 'Diameter', 'Area', 'Circumference']);
    const Circle_c = new Circle(equation);
    const is_valid = Circle_c.validate();

    validate(is_valid);
    if(is_valid){
      Circle_c.assign_values();
      set_nodes_value(Circle_c.get_parts_value());
    }
  }


  function ellipse(equation){
    set_output_nodes(['Major Axis', 'Minor Axis', 'c', 'Center', 'Foci', 'Major Vertices', 'Minor Vertices', 'Length of Major Axis', 'Length of Minor Axis']);
    const Ellipse_c = new Ellipse(equation);
    const is_valid = Ellipse_c.validate();

    validate(is_valid);
    if(is_valid){
      Ellipse_c.assign_values();
      set_nodes_value(Ellipse_c.get_parts_value());
    }
  }


  function hyperbola(equation){}


  function addEvent(){
    shape_selection.addEventListener('change', () => {
      check_shape(shape_selection.value);
      shape_methods.clear();
      validate();
    });
    equation_input.addEventListener('keyup', () => {
      check_shape(shape_selection.value);
      shape_methods.output_change_format(false);
    });
  }
  
  return {
    addEvent,
    check_shape,

  }
};

const Shape_methods = function (){
  const equation_input = document.querySelector('#input-eq');
  const show_graph_btn = document.querySelector('#show-graph');
  const convert_btn = document.querySelector('#convert');
  const reset_btn = document.querySelector('#reset')

  const graph_div = document.querySelector('.graph-div');
  const graph_cancel_btn = document.querySelector('#graph-cancel');
  const body = document.querySelector('.content');

  console.log(show_graph_btn)

  let graph_exist = false;

  function convert_num(num){
    if(convert_btn.textContent === 'To Decimal'){
        let obj = math.fraction(num);
        let n = obj.n;
        let d = obj.d;
        if(d != 1){ 
            if(num.toString().match('\-')) return `-${n}/${d}`
            return `${n}/${d}`
        }

    }else if(convert_btn.textContent === 'To Fraction'){
      if(num.toString().match(/[\.\/]/)){
            return Math.round(eval(num) * 100) / 100;
        }
    }
    return num
  }


  function show_graph(){
    if(!graph_exist){
        var elt = document.getElementById('calculator');
        calculator = Desmos.GraphingCalculator(elt);
        graph_exist = true;
    }

    calculator.setExpression({ id: 'graph1', latex: equation_input.value.replace(/²/g, '^2')});
    graph_div.style.transform = "translate(-50%, -50%)";
    body.style.filter = 'blur(5px)';
  }


  function hide_graph(){
      graph_div.style.transform = "translate(-50%, -400%)";
      body.style.filter = 'blur(0px)';
  }


  function clear(){
    const node_values = Array.from(document.querySelectorAll('.value'));
    equation_input.value = '';
    node_values.map(l => l.textContent = "undefined");
    show_graph_btn.style.cursor = "pointer";
  }


  function output_change_format(change = false){
    const node_values = Array.from(document.querySelectorAll('.value'));

    if(change){
      if(convert_btn.textContent === 'To Decimal'){
          convert_btn.textContent = 'To Fraction'   
      }else{
          convert_btn.textContent = 'To Decimal'
      }
    }

    node_values.forEach(node => {
      let value = node.textContent;
      if(value.match(/[\.\/]\d+/)){
        let values = value.match(/\-?\d+[\.\/]\d+/g);
        values.forEach(val => {
          node.textContent = node.textContent.replace(val, convert_num(val));
        });
      }
    })
  }

  function addEvent(){
    graph_cancel_btn.addEventListener('click', hide_graph);
    reset_btn.addEventListener('click', clear);
    convert_btn.addEventListener('click', output_change_format.bind(event, true));
    show_graph_btn.addEventListener('click', show_graph);
  }

  return {
    clear,
    addEvent,
    output_change_format,
  }
};


(function (){
  const shape_selection = document.querySelector('#shape-selection');
  const main = Main();
  const shape_part = Shape_part();
  const shape_methods = Shape_methods();

  window.addEventListener('load', () => {
    main.check_window_size();
    main.addEvent();
    shape_part.addEvent();
    shape_methods.addEvent();
    shape_methods.output_change_format(change=false);
    shape_methods.clear();
  });

  shape_selection.addEventListener('change', () => shape_part.check_shape(shape_selection.value));
})();



