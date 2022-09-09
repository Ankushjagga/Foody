


const menu = document.getElementById("menu");
  const navbar = document.querySelector(".list");
  menu.addEventListener("click",()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('toggle');
  })
 
  function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        menu.classList.remove('fa-times');
        navbar.classList.remove('toggle');
    } 
}
window.onscroll = function () {
    scrollFunction();
};
