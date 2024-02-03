import { mainData } from "./api.module.js"
import { nameRgx, ageRgx, passRgx, numRgx, emailRgx } from "./rgx.module.js"
import {cardDisplay,specificMealsDisplay} from "./display.js"
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
    cardDisplay(data,"#display")
}).then(() => {
    $(".mealCard").on("click", function () {
        let mealId = ($(this).attr("id"));
        console.log(mealId);
        mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
            specificMealsDisplay(data,"#display")
            })
    })
})
$("#searchlist").on("click", e => {
    e.preventDefault();
    $(".searchPage").css({ display: "block" });
    $(".recipesMenu").css({ display: "none" })
    $(".contactPage").css({ display: "none" })
})
$("#mealNameInput").on("keyup", e => {
    mainData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`).then(data => {
        cardDisplay(data,"#foundMeals")
    }).then(() => {
        $(".mealCard").on("click", function () {
            $(".searchInputs").css({ display: "none" })
            let mealId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                specificMealsDisplay(data,"#searchDisplay")
            })
        })
    })
})
$("#MealLetterInput").on("keyup", e => {
    mainData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`).then(data => {
        cardDisplay(data,"#foundMeals")
    }).then(() => {
        $(".mealCard").on("click", function () {
            let mealId = ($(this).attr("id"));
            console.log(mealId);
            mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                specificMealsDisplay(data,"#searchDisplay")
            })
        })
    })
})
$("#catList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").css({ display: "block" })
    $(".searchPage").css({ display: "none" })
    mainData('https://www.themealdb.com/api/json/v1/1/categories.php').then(data => {
        const categories = data.categories
        let displayedCat = ""
        categories.forEach(category => {
            let { strCategoryThumb, strCategory, strCategoryDescription } = category
            let temp = `          
            <div class="col-md-3 g-4">
                <div class="catCard position-relative overflow-hidden rounded-2" id='${strCategory}'>
                    <img src="${strCategoryThumb}" class="w-100">
                    <div class="cardLayer position-absolute justify-content-center text-center">
                        <h3 class="text-white">${strCategory}</h3>
                        <p class="text-white">${strCategoryDescription}</p>
                    </div>
                </div>
            </div>`
            displayedCat += temp
        });
        $("#display").html(`${displayedCat}`)
    }).then(() => {
        $('.catCard').on('click', function () {
            let catId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`).then(data => {
                cardDisplay(data,"#display")
            }).then(() => {
                $(".mealCard").on("click", function () {
                    let mealId = ($(this).attr("id"));
                    mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                        specificMealsDisplay(data,"#display")
                    })
                })
            })

        })
    })
})
$("#areaList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").css({ display: "block" })
    $(".searchPage").css({ display: "none" })
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
        $("#display").html(`${displayedAreas}`)
    }).then(() => {
        $('.areaCard').css("cursor", "pointer")
        $('.areaCard').on('click', function () {
            let areaId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`).then(data => {
                cardDisplay(data,"#display")
            }).then(() => {
                $(".mealCard").on("click", function () {
                    let mealId = ($(this).attr("id"));
                    mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                        specificMealsDisplay(data,"#display")
                    })
                })
            })

        })
    })
})
$("#ingList").on("click", e => {
    e.preventDefault();
    $(".recipesMenu").css({ display: "block" })
    $(".searchPage").css({ display: "none" })
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
        $("#display").html(`${displayedIngs}`)
    }).then(() => {
        $('.ingCard').css("cursor", "pointer")
        $('.ingCard').on('click', function () {
            let ingId = ($(this).attr("id"));
            mainData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingId}`).then(data => {
                cardDisplay(data,"#display")
            }).then(() => {
                $(".mealCard").on("click", function () {
                    console.log("hello");
                    let mealId = ($(this).attr("id"));
                    console.log(mealId);
                    mainData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(data => {
                        specificMealsDisplay(data,"#display")
                    })
                })
            })
        })
    })
})
$("#contactUs").on("click", e => {
    let password = 0
    e.preventDefault()
    $(".recipesMenu").css({ display: "none" })
    $(".searchPage").css({ display: "none" })
    $(".contactPage").css({ display: "flex" })
    $('#formName').on("change", e => {
        let name = e.target.value
    if (nameRgx.test(name) == true) {
            console.log("yes");
            $("#formName").addClass("is-valid")
            $("#formName").removeClass("is-invalid")
            return true
        } else {
            $("#formName").addClass("is-invalid")
            $("#formName").removeClass("is-valid")
        }
    })
    $('#formEmail').on("change", e => {
        let email = e.target.value
        if (emailRgx.test(email) == true) {
            console.log("yes");
            $("#formEmail").addClass("is-valid")
            $("#formEmail").removeClass("is-invalid")
        } else {
            $("#formEmail").addClass("is-invalid")
            $("#formEmail").removeClass("is-valid")
        }
    })
    $('#formPhone').on("change", e => {
        let num = e.target.value
        if (numRgx.test(num) == true) {
            console.log("yes");
            $("#formPhone").addClass("is-valid")
            $("#formPhone").removeClass("is-invalid")
        } else {
            $("#formPhone").addClass("is-invalid")
            $("#formPhone").removeClass("is-valid")
        }
    })
    $('#formAge').on("change", e => {
        let age = e.target.value
        if (ageRgx.test(age) == true) {
            console.log("yes");
            $("#formAge").addClass("is-valid")
            $("#formAge").removeClass("is-invalid")
        } else {
            $("#formAge").addClass("is-invalid")
            $("#formAge").removeClass("is-valid")
        }
    })
    $('#formPassword').on("change", e => {
        let pass = e.target.value
        if (passRgx.test(pass) == true) {
            password = pass
            console.log("yes");
            $("#formPassword").addClass("is-valid")
            $("#formPassword").removeClass("is-invalid")
        } else {
            $("#formPassword").addClass("is-invalid")
            $("#formPassword").removeClass("is-valid")
        }
    })
    $('#formRepassword').on("change", e => {
        let rePass = e.target.value
        if (rePass == password) {
            console.log("yes");
            $("#formRepassword").addClass("is-valid")
            $("#formRepassword").removeClass("is-invalid")
        } else {
            $("#formRepassword").addClass("is-invalid")
            $("#formRepassword").removeClass("is-valid")
        }
    })
    if ($('#formName').hasClass("is-valid") && $('#formEmail').hasClass("is-valid") && $('#formPhone').hasClass("is-valid") && $('#formAge').hasClass("is-valid") && $('#formPassword').hasClass("is-valid") && $('#formRepassword').hasClass("is-valid")){
        $("#formBtn").removeAttr("disabled")
    }
})

