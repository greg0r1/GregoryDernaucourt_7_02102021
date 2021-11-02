import { recipes } from '../../JSON/Recipes.js';


export default class DataService {

    constructor() {
        this.recipes = []
        this.currentValuesRequests = []
    }

    getRecipes() {
        const recipesFromJson = recipes
        return this.recipes = recipesFromJson
    }

    // Filtre à partir de la search bar
    // filter(arr = [], request = '') {
    //     request = request.toLowerCase()
    //     if (!request) {
    //         this.getRecipes()
    //     } else {
    //         this.recipes = arr.filter(({ name, description, ingredients }) => {
    //             const isIngredient = ingredients.filter(({ ingredient }) =>
    //                 ingredient.toLowerCase().includes(request)
    //             )
    //             return ((name.toLowerCase().indexOf(request.toLowerCase())) > -1 || (description.toLowerCase().indexOf(request))) > -1 || isIngredient.lentgh > 0
    //         })
    //     }
    // }

    // Filtres à partir des tags des champs Ustensils, Appliance, Ingredients
    filterRecipesByTagUstensils(request) {
        this.recipes = this.recipes.filter(({ ustensils }) => {
            const isUstensils = ustensils.filter(ustensil => {
                return ustensil.toLowerCase() == request.toLowerCase()
            })
            return isUstensils[0] != undefined
        })
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