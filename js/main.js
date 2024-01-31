import { mainData } from "./api.module.js"
import { nameRgx, ageRgx, passRgx, numRgx } from "./rgx.module.js"
let mainDataUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
let sideBarWidth = ($(".col-10").innerWidth())
$(".sideBar").css("left", `-${sideBarWidth}px`)


$("#sidebarTabClose").on("click", function () {
    let left = $(".sideBar").css("left")
    if (left == "0px") {
        $('.sideBar').animate({ left: `-${sideBarWidth}px` }, 1000);
    } else {
        $('.sideBar').animate({ left: `0px` }, 1000);
    }
})
$('.sidebarTabIcons,.sideBarListIcons,.sidebarTabClose').css("cursor", "pointer")

mainData(mainDataUrl).then(data => {
    const meals = data.meals
    let displayedFood = ""
    meals.forEach(meal => {

        let { strMeal, strMealThumb, idMeal } = meal
        let temp = `          
        <div class="col-md-3 g-4">
            <div class="mealCard position-relative overflow-hidden rounded-2" id='${idMeal}'>
                <img src="${strMealThumb}" class="w-100">
                <div class="cardLayer d-flex position-absolute">
                    <h3 class="align-self-center">${strMeal}</h3>
                </div>
            </div>
        </div>`
        displayedFood += temp
    });
    $("#recipesDisplay").html(`${displayedFood}`)
}).then(()=>{
    $(".mealCard").on("click", function () {
        let mealId = ($(this).attr("id"));
        console.log(mealId);
        mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
            let selectedMeal = data.meals[0]
            let { strCategory, strMeal, strArea, strInstructions, strMealThumb, strTags, strYoutube, strSource } = selectedMeal
            let chosenMeal = `
            <div class="container">
                <div class="selectedMeal py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-4">
                                <img src="${strMealThumb}" alt="" class="w-100">
                                <h2 class="text-white">${strMeal}</h2>
                            </div>
                            <div class="col-8">
                                <h2 class="text-white">instructions:</h2>
                                <p class="text-white">${strInstructions}</p>
                                <h3 class="text-white">area: ${strArea}</h3>
                                <h3 class="text-white">category: ${strCategory}</h3>
                                <h3 class="text-white mb-2">tags:
                                    <div class="selectedMealTag my-2">
                                        <h5 class="bg-info py-2 px-1 rounded-2">${strTags}</h5>
                                    </div>
                                 </h3>
                                <button class="btn btn-success"><a href="${strYoutube}" target="_blank" class="text-decoration-none text-white">Video</a></button>
                                <button class="btn btn-danger"><a href="${strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             `
            $("#recipesDisplay").html(`${chosenMeal}`)
        })
    })
})
$("#searchlist").on("click", e => {
    e.preventDefault();
    $(".searchPage").css({ display: "block" });
    $(".recipesMenu").css({ display: "none" })
    $(".catPage").css({ display: "none" })
    $(".ingPage").css({ display: "none" })
    $(".areaPage").css({ display: "none" })
    $(".contactPage").css({ display: "none" })
})
$("#mealNameInput").on("keyup", e => {
    mainData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`).then(data => {
        const meals = data.meals
        let displayedFood = ""
        meals.forEach(meal => {
            let { strMeal, strMealThumb, idMeal } = meal
            let temp = `          
            <div class="col-md-3 g-4">
                <div class="mealCard position-relative overflow-hidden rounded-2" id="${idMeal}">
                    <img src="${strMealThumb}" class="w-100">
                    <div class="cardLayer d-flex position-absolute">
                        <h3 class="align-self-center">${strMeal}</h3>
                    </div>
                </div>
            </div>`
            displayedFood += temp
        });
        $(".searchDisplay").html(`${displayedFood}`)
    }).then(() => {
        $(".mealCard").on("click", function () {
            let mealId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                let selectedMeal = data.meals[0]
                let { strCategory, strMeal, strArea, strInstructions, strMealThumb, strTags, strYoutube, strSource } = selectedMeal
                let chosenMeal = `
                <div class="container">
                    <div class="selectedMeal py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-4">
                                    <img src="${strMealThumb}" alt="" class="w-100">
                                    <h2 class="text-white">${strMeal}</h2>
                                </div>
                                <div class="col-8">
                                    <h2 class="text-white">instructions:</h2>
                                    <p class="text-white">${strInstructions}</p>
                                    <h3 class="text-white">area: ${strArea}</h3>
                                    <h3 class="text-white">category: ${strCategory}</h3>
                                    <h3 class="text-white mb-2">tags:
                                        <div class="selectedMealTag my-2">
                                            <h5 class="bg-info py-2 px-1 rounded-2">${strTags}</h5>
                                        </div>
                                     </h3>
                                    <button class="btn btn-success"><a href="${strYoutube}" target="_blank" class="text-decoration-none text-white">Video</a></button>
                                    <button class="btn btn-danger"><a href="${strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 `
                $(".searchPage").html(`${chosenMeal}`)
            })
        })
    })
})
$("#MealLetterInput").on("keyup", e => {
    mainData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`).then(data => {
        const meals = data.meals
        let displayedFood = ""
        meals.forEach(meal => {
            console.log(meal);
            let { strMeal, strMealThumb, idMeal } = meal
            let temp = `          
            <div class="col-md-3 g-4">
                <div class="mealCard position-relative overflow-hidden rounded-2" id="${idMeal}">
                    <img src="${strMealThumb}" class="w-100">
                    <div class="cardLayer d-flex position-absolute">
                        <h3 class="align-self-center">${strMeal}</h3>
                    </div>
                </div>
            </div>`
            displayedFood += temp
        });
        $(".searchDisplay").html(`${displayedFood}`)
    }).then(()=>{
        $(".mealCard").on("click", function () {
            let mealId = ($(this).attr("id"));
            console.log(mealId);
            mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                let selectedMeal = data.meals[0]
                let { strCategory, strMeal, strArea, strInstructions, strMealThumb, strTags, strYoutube, strSource } = selectedMeal
                let chosenMeal = `
                <div class="container">
                    <div class="selectedMeal py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-4">
                                    <img src="${strMealThumb}" alt="" class="w-100">
                                    <h2 class="text-white">${strMeal}</h2>
                                </div>
                                <div class="col-8">
                                    <h2 class="text-white">instructions:</h2>
                                    <p class="text-white">${strInstructions}</p>
                                    <h3 class="text-white">area: ${strArea}</h3>
                                    <h3 class="text-white">category: ${strCategory}</h3>
                                    <h3 class="text-white mb-2">tags:
                                        <div class="selectedMealTag my-2">
                                            <h5 class="bg-info py-2 px-1 rounded-2">${strTags}</h5>
                                        </div>
                                     </h3>
                                    <button class="btn btn-success"><a href="${strYoutube}" target="_blank" class="text-decoration-none text-white">Video</a></button>
                                    <button class="btn btn-danger"><a href="${strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 `
                $(".searchPage").html(`${chosenMeal}`)
            })
        })
    })
})
$("#catList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").css({ display: "none" })
    $(".searchPage").css({ display: "none" })
    $(".areaPage").css({ display: "none" })
    $(".ingPage").css({ display: "none" })
    $(".contactPage").css({ display: "none" })
    $(".catPage").css({ display: "block" })
    mainData('https://www.themealdb.com/api/json/v1/1/categories.php').then(data => {
        const categories = data.categories
        let displayedCat = ""
        categories.forEach(category => {
            let { idCategory, strCategoryThumb, strCategory, strCategoryDescription } = category
            let temp = `          
            <div class="col-md-3 g-4">
                <div class="mealCard position-relative overflow-hidden rounded-2" id='${strCategory}'>
                    <img src="${strCategoryThumb}" class="w-100">
                    <div class="cardLayer position-absolute justify-content-center text-center">
                        <h3 class="text-white">${strCategory}</h3>
                        <p class="text-white">${strCategoryDescription}</p>
                    </div>
                </div>
            </div>`
            displayedCat += temp
        });
        $("#catDisplay").html(`${displayedCat}`)
    }).then(() => {
        $('.mealCard').on('click', function () {
            let catId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`).then(data => {
                console.log(data);
                const meals = data.meals
                let displayedFood = ""
                meals.forEach(meal => {
                    let { strMeal, strMealThumb, idMeal } = meal
                    let temp = `          
                    <div class="col-md-3 g-4">
                        <div class="mealCard position-relative overflow-hidden rounded-2" id="${idMeal}">
                            <img src="${strMealThumb}" class="w-100">
                            <div class="cardLayer d-flex position-absolute">
                                <h3 class="align-self-center">${strMeal}</h3>
                            </div>
                        </div>
                    </div>`
                    displayedFood += temp
                });
                $("#catDisplay").html(`${displayedFood}`)
            })
        })
    })
})
$("#areaList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").css({ display: "none" })
    $(".searchPage").css({ display: "none" })
    $(".catPage").css({ display: "none" })
    $(".ingPage").css({ display: "none" })
    $(".contactPage").css({ display: "none" })
    $(".areaPage").css({ display: "block" })
    mainData('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(data => {
        const area = data.meals
        let displayedAreas = ""
        area.forEach(area => {
            let { strArea } = area
            let temp = `          
            <div class="col-md-3 g-4">
                <div class="areaCard position-relative overflow-hidden rounded-2" id='${strArea}'>
                    <div class="d-flex text-center flex-column">
                        <i class="fa-solid fa-warehouse fs-1 text-white"></i>
                        <h3 class="text-white">${strArea}</h3>
                    </div>
                </div>
            </div>`
            displayedAreas += temp
        });
        $("#areaDisplay").html(`${displayedAreas}`)
    }).then(() => {
        $('.areaCard').css("cursor", "pointer")
        $('.areaCard').on('click', function () {
            let areaId = ($(this).attr("id"));
            console.log(areaId);
            mainData(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`).then(data => {
                console.log(data);
                const meals = data.meals
                let displayedFood = ""
                meals.forEach(meal => {
                    let { strMeal, strMealThumb } = meal
                    let temp = `          
                    <div class="col-md-3 g-4">
                        <div class="mealCard position-relative overflow-hidden rounded-2">
                            <img src="${strMealThumb}" class="w-100">
                            <div class="cardLayer d-flex position-absolute">
                                <h3 class="align-self-center">${strMeal}</h3>
                            </div>
                        </div>
                    </div>`
                    displayedFood += temp
                });
                $("#areaDisplay").html(`${displayedFood}`)
            })
        })
    })
})
$("#ingList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").css({ display: "none" })
    $(".searchPage").css({ display: "none" })
    $(".catPage").css({ display: "none" })
    $(".areaPage").css({ display: "none" })
    $(".contactPage").css({ display: "none" })
    $(".ingPage").css({ display: "block" })
    mainData('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then(data => {
        const ingredients = data.meals
        let displayedIngs = ""
        ingredients.forEach(ing => {
            let { strIngredient, strDescription } = ing
            let temp = `          
            <div class="col-md-3 g-4">
                <div class="ingCard position-relative overflow-hidden rounded-2" id='${strIngredient}'>
                    <div class="d-flex text-center flex-column">
                        <i class="fa-solid fa-drumstick-bite fs-1 text-white"></i>
                        <h3 class="text-white">${strIngredient}</h3>
                        <p class text-white>${strDescription}</p>
                    </div>
                </div>
            </div>`
            displayedIngs += temp
        });
        $("#ingDisplay").html(`${displayedIngs}`)
    }).then(() => {
        $('.ingCard').css("cursor", "pointer")
        $('.ingCard').on('click', function () {
            let ingId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingId}`).then(data => {
                console.log(data);
                const meals = data.meals
                let displayedFood = ""
                meals.forEach(meal => {
                    let { strMeal, strMealThumb } = meal
                    let temp = `          
                    <div class="col-md-3 g-4">
                        <div class="mealCard position-relative overflow-hidden rounded-2">
                            <img src="${strMealThumb}" class="w-100">
                            <div class="cardLayer d-flex position-absolute">
                                <h3 class="align-self-center">${strMeal}</h3>
                            </div>
                        </div>
                    </div>`
                    displayedFood += temp
                });
                $("#ingDisplay").html(`${displayedFood}`)
            })
        })
    })
})
$("#contactUs").on("click", e => {
    e.preventDefault()
    $(".recipesMenu").css({ display: "none" })
    $(".searchPage").css({ display: "none" })
    $(".catPage").css({ display: "none" })
    $(".areaPage").css({ display: "none" })
    $(".ingPage").css({ display: "none" })
    $(".contactPage").css({ display: "flex" })
})

