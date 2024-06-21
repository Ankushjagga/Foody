const addIngridents = document.querySelector(".ing-btn");
let ingredientList = document.querySelector('.ingridentlist');
let ingredeintDiv = document.querySelectorAll('.ingridentdiv')[0];
let ingridentDelBtn = document.querySelector('.submitIng');
addIngridents.addEventListener('click',function(e){
    e.preventDefault()
    let newIngredients = ingredeintDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients);

    let deleteButton = newIngredients.querySelector('.fa-trash');
    deleteButton.addEventListener('click',function(e){
        
            console.log("clickedd");
            e.preventDefault()
            let ingredientDivs = e.target.closest('.ingridentdiv'); // Find the closest parent ingredient div
            console.log(ingredientDivs);
                ingredientList.removeChild(ingredientDivs); 
        
        })
}) 
 // Event listener for deleting ingredients using event delegation
ingredientList.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-trash')) {
        e.preventDefault();
        let ingredientDiv = e.target.closest('.ingridentdiv'); // Find the closest parent ingredient div
        if (ingredientDiv && ingredientList.contains(ingredientDiv)) {
        ingredientList.removeChild(ingredientDiv); } // Remove the ingredient div from the ingredient list
    }
});
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
