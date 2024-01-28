import { mainData } from "./api.module.js"
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
    $("#recipesDisplay").html(`${displayedFood}`)
})
$("#searchlist").on("click", e => {
    e.preventDefault();
    $(".searchPage").css({ display: "block" });
    $(".recipesMenu").addClass("d-none");
})
$("#mealNameInput").on("keyup", e => {
    mainData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`).then(data => {
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
        $(".searchDisplay").html(`${displayedFood}`)
    })
})
$("#MealLetterInput").on("keyup", e => {
    mainData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`).then(data => {
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
        $(".searchDisplay").html(`${displayedFood}`)
    })
})
$("#catList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").addClass("d-none");
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
                $("#catDisplay").html(`${displayedFood}`)
            })
        })
    })
})
$("#areaList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").addClass("d-none");
    mainData('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(data => {
        const area = data.meals
        let displayedAreas = ""
        area.forEach(area => {
            let {strArea} = area
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

