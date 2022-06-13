//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.getElementById("prev").hidden = true
document.getElementById("next").hidden = true
document.querySelector(".ingredients").hidden = true
document.querySelector(".instructions").hidden = true

let current = 0
let listCount = 0
let drinkAmmount = 0

document.getElementById('search').addEventListener ('click', getDrink)
document.getElementById('search').addEventListener ('click', resetCurrent)
document.getElementById('drinkInput').addEventListener ('keypress', function (e) {
    if (e.code === "Enter") {
       getDrink()
       resetCurrent()
    }
})

document.getElementById('next').addEventListener ('click', getDrink)
document.getElementById('next').addEventListener ('click', addCurrent)

document.getElementById('prev').addEventListener ('click', getDrink)
document.getElementById('prev').addEventListener ('click', subCurrent)


function getDrink(){
    let drink = document.querySelector('input').value.replaceAll(' ', '%20')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
    console.log(data.drinks)
    
    if(listCount !== 0){
        const oldList = document.getElementById("ing")
        oldList.innerHTML = ''
    }else{
        listCount ++
    }

    document.querySelector('h2').innerText = data.drinks[current].strDrink
    document.querySelector('img').src = data.drinks[current].strDrinkThumb
    document.querySelector('#instruct').innerText = data.drinks[current].strInstructions

    let ingArr = [data.drinks[current].strIngredient1, data.drinks[current].strIngredient2, data.drinks[current].strIngredient3, data.drinks[current].strIngredient4, data.drinks[current].strIngredient5]
    console.log(ingArr)
    drinkAmmount = data.drinks.length - 1

    let list = document.getElementById("ing");

    ingArr.forEach((item)=>{
        if(item !== null){
            let li = document.createElement("li");
            li.setAttribute("class", "ingList")
            li.innerText = item;
            list.appendChild(li);
        }else{}
    
    })

    document.querySelector(".ingredients").hidden = false
    document.querySelector(".instructions").hidden = false


    function delayShow(){
        document.getElementById("prev").hidden = false
        document.getElementById("next").hidden = false
    }
    setTimeout(delayShow, 50)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function resetCurrent(){
    current = 0
}

function addCurrent(){
    if(current < drinkAmmount){
        current ++
    }else{
        current = 0
    }
}

function subCurrent(){
    if(current > 0){
        current = current - 1
    }else{
        current = drinkAmmount
    }
}