
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
  const shape_selection = document.querySelector('#shape-selection');
  const shape_options = Array.from(document.querySelectorAll('#shape-selection > option'));
  const equation_input = document.querySelector('#input-eq');
  const output_div = document.querySelector('.output-div');

  
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

  function set_nodes_value(values){
    const node_values = document.querySelectorAll('.value')
    for(let i = 0; i < node_values.length; i++){
      node_values[i].textContent = values[i];
    }
  }

  function validate(bool){
    if(bool){
      equation_input.style.border = '3px solid green';
    }else if(equation_input.value.length === 0){
      equation_input.style.border = '2px solid var(--dark-bg)';
    }else{
      equation_input.style.border = '3px solid red';
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
    set_output_nodes(['Center', 'Diameter', 'Radius', 'Area', 'Circumference']);
    console.log('circle');
  }


  function ellipse(equation){}


  function hyperbola(equation){}


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


  function addEvent(){
    shape_options.map(option => option.addEventListener('click', (event) => {
      equation_input.value = '';
      check_shape(event.target.textContent);
    }));
    equation_input.addEventListener('keyup', () => {
      check_shape(shape_selection.value);
    });
  }
  
  return {
    addEvent,
    check_shape
  }
};


(function (){
  const shape_selection = document.querySelector('#shape-selection');
  const main = Main();
  const shape_part = Shape_part();

  window.addEventListener('load', () => {
    main.check_window_size();
    main.addEvent();
    shape_part.addEvent();
    shape_part.check_shape(shape_selection.value);
  });
})();



