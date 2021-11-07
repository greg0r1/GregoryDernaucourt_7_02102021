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
            for (const recipe of arr) {
                const arrayFromDescription = recipe.description.toLowerCase().split(/[\s,\?\,\.!]+/)
                for (const element of arrayFromDescription) {
                    if (element === request) {
                        if (this.resultFilter.indexOf(recipe) === -1) {
                            this.resultFilter.push(recipe)
                        }
                    }

                }

                const arrayFromName = recipe.name.toLowerCase().split(/[\s,\?\,\.!]+/)
                for (const element of arrayFromName) {
                    if (element === request) {
                        if (this.resultFilter.indexOf(recipe) === -1) {
                            this.resultFilter.push(recipe)
                        }
                    }
                }

                for (const element of recipe.ingredients) {
                    const arrayFromIngredient = element.ingredient.toLowerCase().split(/[\s,\?\,\.!]+/)
                    for (const element of arrayFromIngredient) {
                        if (element === request) {
                            if (this.resultFilter.indexOf(recipe) === -1) {
                                this.resultFilter.push(recipe)
                            }
                        }
                    }
                }
            }
        }
    }

    filterRecipesByTagUstensils(request) {
        let arr = []
        for (const recipe of this.resultFilter) {
            for (const element of recipe.ustensils) {
                if (element.toLowerCase() === request.toLowerCase()) {
                    if (arr.indexOf(recipe) === -1) {
                        arr.push(recipe)
                    }
                }
            }
        }
        this.resultFilter = arr
    }

    filterRecipesByTagAppliance(request) {
        this.recipes = this.recipes.filter(({ appliance }) => {
            return appliance == request
        })
    }

    filterRecipesByTagIngredients(request) {
        this.recipes = this.recipes.filter(({ ingredients }) => {
            const isIngredient = ingredients.filter(({ ingredient }) =>
                ingredient.toLowerCase().includes(request.toLowerCase())
            )
            return isIngredient[0] != undefined
        })
    }

    // Récupère les tags pour les afficher dans les champs input
    getTagsAppliance() {
        const allTags = []
        this.recipes.forEach(element => {
            if (allTags.findIndex(e => e === element.appliance) === -1) {
                allTags.push(element.appliance)
            }
        })
        return allTags
    }

    getTagsUstensils() {
        const allTags = this.recipes.reduce(
            (allTags, { ustensils }) => [...allTags, ...ustensils], []);
        return Array.from(new Set(allTags))
    }

    getTagsIngredients() {
        const allTags = []
        this.recipes.forEach(e => e.ingredients.forEach(element => {
            if (allTags.indexOf(element.ingredient.toLowerCase()) === -1) {
                allTags.push(element.ingredient.toLowerCase())
            }
        }))
        return allTags
    }

    // Filtre les tags pour les champs inputs 
    filterTagsInputs(array, request) {
        let result = array.filter(e => e.includes(request.toLowerCase()))
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