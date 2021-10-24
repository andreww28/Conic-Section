var x = document.getElementById("myLinks");
function myFunction() {
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
} 
if(window.innerWidth < 800){
  const navLink = Array.from(document.querySelectorAll('.navlink'));
  navLink.map(link => link.addEventListener('click', () => x.style.display = "none"));
}



