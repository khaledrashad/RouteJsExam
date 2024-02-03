
export function cardDisplay(data , displayArea){
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
    $(displayArea).html(`${displayedFood}`)
}

export function specificMealsDisplay(data,displayArea){
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
            $(displayArea).html(`${chosenMeal}`)
        
}