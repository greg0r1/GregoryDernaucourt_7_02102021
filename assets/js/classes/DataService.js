import { recipes } from '../../JSON/Recipes.js';


export default class DataService {

    constructor() {
        this.recipes = []
        this.currentValuesRequests = []
        this.resultFilter = []
    }

    getRecipes() {
        const recipesFromJson = recipes
        return this.recipes = recipesFromJson
    }

    //Native loop (barre de recherche)
    filter(arr = [], request = '') {
        request = request.toLowerCase()
        if (!request) {
            this.getRecipes()
        } else {
            for (let index = 0; index < arr.length; index++) {
                const recipe = arr[index];
                const arrayFromDescription = recipe.description.toLowerCase().split(/[\s,\?\,\.!]+/);
                for (let index = 0; index < arrayFromDescription.length; index++) {
                    const element = arrayFromDescription[index];
                    if (element.startsWith(request)) {
                        if (this.resultFilter.indexOf(recipe) === -1) {
                            this.resultFilter.push(recipe)
                        }
                    }
                }

                const arrayFromName = recipe.name.toLowerCase().split(/[\s,\?\,\.!]+/)
                for (let index = 0; index < arrayFromName.length; index++) {
                    const element = arrayFromName[index];
                    if (element.startsWith(request)) {
                        if (this.resultFilter.indexOf(recipe) === -1) {
                            this.resultFilter.push(recipe)
                        }
                    }
                }

                for (let index = 0; index < recipe.ingredients.length; index++) {
                    const element = recipe.ingredients[index];
                    const arrayFromIngredient = element.ingredient.toLowerCase().split(/[\s,\?\,\.!]+/)
                    for (let index = 0; index < arrayFromIngredient.length; index++) {
                        const element = arrayFromIngredient[index];
                        if (element.startsWith(request)) {
                            if (this.resultFilter.indexOf(recipe) === -1) {
                                this.resultFilter.push(recipe)
                            }
                        }
                    }

                }
            }
        }
    }

    // Filtres à partir des tags des champs Ustensils, Appliance, Ingredients
    filterRecipesByTagUstensils(request) {
        let arr = []
        for (let index = 0; index < this.resultFilter.length; index++) {
            const recipe = this.resultFilter[index];
            for (let index = 0; index < recipe.ustensils.length; index++) {
                const element = recipe.ustensils[index];
                if (element.toLowerCase().startsWith(request.toLowerCase())) {
                    if (arr.indexOf(recipe) === -1) {
                        arr.push(recipe)
                    }
                }
            }
        }
        this.resultFilter = arr
    }

    filterRecipesByTagAppliance(request) {
        let arr = []
        for (let index = 0; index < this.resultFilter.length; index++) {
            const recipe = this.resultFilter[index];
            if (recipe.toLowerCase().startsWith(request.toLowerCase())) {
                if (arr.indexOf(recipe) === -1) {
                    arr.push(recipe)
                }
            }
        }
        this.resultFilter = arr
    }

    filterRecipesByTagIngredients(request) {
        let arr = []
        for (let index = 0; index < this.resultFilter.length; index++) {
            const recipe = this.resultFilter[index];
            for (let index = 0; index < recipe.ingredients.length; index++) {
                const element = recipe.ingredients[index];
                if (element.ingredient.toLowerCase().startsWith(request.toLowerCase())) {
                    if (arr.indexOf(recipe) === -1) {
                        arr.push(recipe)
                    }
                }
            }

        }
        this.resultFilter = arr
    }

    // Récupère les tags pour les afficher dans les champs input
    getTagsAppliance() {
        const allTags = []
        this.resultFilter.forEach(element => {
            if (allTags.indexOf(element.appliance) === -1) {
                allTags.push(element.appliance)
            }
        })
        return allTags
    }

    getTagsUstensils() {
        const allTags = this.resultFilter.reduce(
            (allTags, { ustensils }) => [...allTags, ...ustensils], []);
        return Array.from(new Set(allTags))
    }

    getTagsIngredients() {
        const allTags = []
        this.resultFilter.forEach(e => e.ingredients.forEach(element => {
            if (allTags.indexOf(element.ingredient.toLowerCase()) === -1) {
                allTags.push(element.ingredient.toLowerCase())
            }
        }))
        return allTags
    }

    // Filtre les tags pour les champs inputs 
    filterTagsInputs(array, request) {
        let result = []
        for (const element of array) {
            if (element.substring(0, request.length).toLowerCase() === request.toLowerCase()) {
                if (result.indexOf(element) === -1) {
                    result.push(element)
                }
            }

        }
        return result
    }

    // Récupère les valeurs dans l'interface pour les filtres
    arrayFromValuesRequests() {
        const tagsEl = Array.from(document.querySelectorAll('.tag'))
        const inputValue = document.querySelector("#searchBar > form > input").value
        this.currentValuesRequests = []
        this.currentValuesRequests.push(inputValue)
        tagsEl.forEach(e => this.currentValuesRequests.push(e.innerText))
    }


}