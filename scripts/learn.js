
const ham_icon = document.querySelector('.icon');
var x = document.getElementById("myLinks");
const show_res_icon = document.querySelector('#show-res-icon');
const res_container = document.querySelector('.link-extension');
const learn_links = document.querySelectorAll('.learn-links');

function show_nav() {
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
} 

function show_res_frame(txt){
  console.log('hii', txt);
  if(txt === '>'){   //>
    res_container.style.transform = "translateX(0)";
    show_res_icon.innerText = '<';  //<
  }else if(txt === '<'){ //<
    res_container.style.transform = "translateX(-100%)";
    show_res_icon.innerText = '>';  //>
  }
}

function check_window_size(){
  if(window.innerWidth < 800){
    learn_links.forEach(link => {
      link.addEventListener('click', show_res_frame.bind(event,'<'));
    });
  }else{
    res_container.style.transform = "translateX(0)";
    learn_links.forEach(link => {
          link.addEventListener('click', show_res_frame.bind(event,'>'));
    });
  }
}

check_window_size();
ham_icon.addEventListener('click', show_nav);



class Resources{
  append_nodes(section_class, videos, sites){
    const site_parent = document.querySelector(`.${section_class} .site-content ul`);
    const video_parent = document.querySelector(`.${section_class} .video-content`);

    sites.forEach(site => {
      site_parent.innerHTML += `<li><a href="${site}" target="_blank" class="site-link">${site}</a></li>`;
    });

    videos.forEach(video => {
      video_parent.innerHTML += `<iframe width="275" height="200" src="https://www.youtube.com/embed/${this.extract_video_link(video)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  extract_video_link(link){
    if(link.match(/v=.+/)){
      return link.match(/v=[a-z0-9\-_]+/i)[0].slice(2);
    }else{
      let temp = link.split('/');
      return temp.pop();
    }
  }
}


(function (){
  const sites = {
    conic_sections : [
      "https://math.libretexts.org/Bookshelves/Calculus/Book%3A_Calculus_(OpenStax)/11%3A_Parametric_Equations_and_Polar_Coordinates/11.5%3A_Conic_Sections",
      "https://www.ck12.org/geometry/parts-of-circles/lesson/Parts-of-Circles-BSC-GEOM/",
      "https://xaktly.com/MathConicSectionss.html",
      "https://byjus.com/maths/conic-sections/",
      "https://www.varsitytutors.com/hotmath/hotmath_help/topics/conic-sections-and-standard-forms-of-equations",
      "https://www.cliffsnotes.com/study-guides/algebra/algebra-ii/conic-sections/the-four-conic-sections",
    ],

    circle: [
      "https://www.cuemath.com/geometry/equation-of-circle/",
      "http://www.algebralab.org/lessons/lesson.aspx?file=Algebra_conics_circle.xml",
      "https://www.cliffsnotes.com/study-guides/algebra/algebra-ii/conic-sections/parabola",
      "https://en.wikibooks.org/wiki/Conic_Sections/Circle",

    ],

    parabola: [
      "https://www.mathsisfun.com/geometry/parabola.html",
      "https://www.cuemath.com/geometry/parabola/",
      "https://prezi.com/fejptu5b4ipj/converting-between-standard-and-general-form-of-a-parabola/",
      "https://www.dummies.com/education/math/algebra/convert-parabolic-equations-to-the-standard-form/",
      "https://www.cliffsnotes.com/study-guides/algebra/algebra-ii/conic-sections/parabola",
      "https://mathbitsnotebook.com/Geometry/Equations/EQParabola.html",
    ],

    ellipse: [
      "https://byjus.com/maths/ellipse/",
      "https://www.sparknotes.com/math/precalc/conicsections/section3/",
      "https://www.cliffsnotes.com/study-guides/algebra/algebra-ii/conic-sections/ellipse",
      "https://en.wikibooks.org/wiki/Conic_Sections/Ellipse",
    ],

    hyperbola : [
      "https://www.cuemath.com/geometry/hyperbola/",
      "https://www.cliffsnotes.com/study-guides/algebra/algebra-ii/conic-sections/hyperbola",
      "https://www.mathsisfun.com/geometry/hyperbola.html",
      "https://www.texasgateway.org/resource/graphing-conic-sections-hyperbolas"
    ]
  }


  const videos = {
    conic_sections: [
      "https://www.youtube.com/watch?v=85kgbvLmq88&t=341s",
      "https://www.youtube.com/watch?v=PLrgwD9TleU&t=4056s"
    ],

    circle: [
      "https://www.youtube.com/watch?v=Fzaof9cX-PM",
      "https://www.youtube.com/watch?v=Ia04DUkYHyc&t=449s",
      "https://www.youtube.com/watch?v=pVIznjMLz-8&t=575s",
      "https://www.youtube.com/watch?v=cyKFBmTjyio",
      "https://www.youtube.com/watch?v=u_39J-syjB0"
    ],

    parabola : [
      "https://www.youtube.com/watch?v=yh1omjP-IJA",
      "https://www.youtube.com/watch?v=rSlmll5bvws&t=538s",
      "https://www.youtube.com/watch?v=rMdla9Ztge8",
      "https://www.youtube.com/watch?v=KYgmOTLbuqE&t=1271s",
      "https://www.youtube.com/watch?v=BGz3pkoGPag",
    ],

    ellipse : [
      "https://www.youtube.com/watch?v=5TQMJ09MLWM",
      "https://www.youtube.com/watch?v=_tcyjxlZ12E",
      "https://www.youtube.com/watch?v=OPSCKXXvWiM&t=595s",
    ],

    hyperbola : [
      "https://www.youtube.com/watch?v=Ryj0DcdGPXo",
      "https://www.youtube.com/watch?v=a2niebD-3CA",
      "https://www.youtube.com/watch?v=pzSyOTkAsY4",
      "https://www.youtube.com/watch?v=Iu-4-fizlD4",
    ]
  }


  const res = new Resources();
  res.append_nodes('conic-section', videos.conic_sections, sites.conic_sections);
  res.append_nodes('circle-section', videos.circle, sites.circle);
  res.append_nodes('parabola-section', videos.parabola, sites.parabola);
  res.append_nodes('ellipse-section', videos.ellipse, sites.ellipse);
  res.append_nodes('hyperbola-section', videos.hyperbola, sites.hyperbola);

})()