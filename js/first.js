// let allRecipes = [];
let recipeDetails = {};
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipesRow = document.getElementById("recipesRow");
let recipeDetailsDiv = document.getElementById("recipeDetails");

async function getRecipes(term)
{
    let apiResponse =await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    let finalResult =await apiResponse.json();
    allRecipes = finalResult.recipes;
    displayRecipes();
}

function displayRecipes()
{
    let index = ``;
    for(let i =0; i < allRecipes.length ;i++)
    {
        let myId = "'"+allRecipes[i].recipe_id+"'";

        index += `   
        <div onclick = "getDetail(${myId})" class="col-md-4">
            <div class="recipe">
                <img class="w-100" src="${allRecipes[i].image_url}" alt="">
                <h5 class="color-mine py-1">${allRecipes[i].title}</h5>
                <p>${allRecipes[i].publisher}</p>
            </div>

      </div>`;
    }
    document.getElementById("recipesRow").innerHTML = index ;

}

searchBtn.addEventListener("click" , function()
{
    getRecipes(searchInput.value);
})

async function getDetail(id)
{

    let apiResponse =await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails =await apiResponse.json();
    recipeDetails = recipeDetails.recipe;
    displayDetails();
}

function displayDetails()
{
    let indexIngred = ``;
    for (let x  of recipeDetails.ingredients) {
        indexIngred +=`<li class="d-flex align-items-center font-weight-bolder py-2"><span><i class="fas fa-utensils pr-3"></i></span>${x}</li>`;
    }

    let index = `<div class="recipeDetails py-3">

    <h2 class="color-mine py-1">${recipeDetails.title}</h2>
    <img src="${recipeDetails.image_url}" class="w-100" alt="">

    <ul class="fa-ul py-3">${indexIngred}</ul>
    </div>`;
    document.getElementById("recipeDetails").innerHTML = index ;

}
//https://forkify-api.herokuapp.com/api/search?&q=${term}
//https://forkify-api.herokuapp.com/api/get?rId=${id}
