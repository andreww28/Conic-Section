
const ham_icon = document.querySelector('.icon');
var x = document.getElementById("myLinks");

function show_nav() {
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
} 

ham_icon.addEventListener('click', show_nav);



class Resources{
  append_nodes(section_class, videos, link_obj){
    const site_parent = document.querySelector(`.${section_class} .site-content ul`);
    const video_parent = document.querySelector(`.${section_class} .video-content`);

    for(const [key,value] of Object.entries(link_obj)){
      site_parent.innerHTML += `<li><a href="${value}" class="site-link">${key}</a></li>`;
    }

    videos.forEach(video => {
      video_parent.innerHTML += `<iframe width="275" height="200" src="https://www.youtube.com/embed/${this.extract_video_link(video)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  extract_video_link(link){
    if(link.match(/v=.+/)){
      return link.match(/v=.+/)[0].slice(2);
    }else{
      let temp = link.split('/');
      return temp.pop();
    }
  }
}


(function (){
  const c = {
    'John Andrew Sdsdsan Victores' : 'https:google.com',
    'John Andrew San Victores' : 'https:google.com',
    'John Andrew Sasfn Victores' : 'https:google.com',
    'John Andrew Sfdan Victores' : 'https:google.com',
    'John Andsdrew San Victores' : 'https:google.com',
    'John Adsndrew Sdsan Victores' : 'https:google.com',
    'John Anddsrew San Victores' : 'https:google.com',
    'John Andsdrfdew San Victores' : 'https:google.com',
    'John Adsndrdfew San Victores' : 'https:google.com',
  }

  const cc = {
    'fsfsdfdsfdsf' : 'fsfsd',
    'fsfdsfsdfdsfdsf' : 'fsfsd',
    'fsfsfdsdfdsfdsf' : 'fsfsd',
    'fsfsfddfdsfdsf' : 'fsfsd',
  }

  const video = [
    "https://www.youtube.com/embed/ka4KN2KEGmI",
    "https://www.youtube.com/embed/f02mOEt11OQ",

]
  const r = new Resources();
  r.append_nodes('circle-section', video, cc);
  r.append_nodes('parabola-section', video, cc);
  r.append_nodes('ellipse-section', video, cc);
  r.append_nodes('hyperbola-section', video, cc);

})()