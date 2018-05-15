import axios from 'axios'


const edamamId = "848f1151"
const edamamKey = "c580d6d31d19d4bbff3cd823b6e82977"


const GET_RECIPES = 'GET_RECIPES'
// const SET_CHOSEN_TAGS = 'SET_CHOSEN_PREFERENCES'
const SET_INGREDIENTS = 'SET_INGREDIENTS'
// const SET_CHOSEN_PREFERENCES = 'SET_CHOSEN_PREFERENCES'
const SET_DIET_PREFERENCES = 'SET_DIET_PREFERENCES'

/* ------------   ACTION CREATORS     ------------------ */

const getRecipes = recipes => ({ type: GET_RECIPES, recipes })
const setIngredients = tags => ({ type: SET_INGREDIENTS, tags })
const setDietPreferences = preferences => ({ type: SET_DIET_PREFERENCES, preferences })

/* ------------       REDUCERS     ------------------ */

const initialCategoryState = {
    recipeList: [{ image: '', label: '', source: '' }],
    chosenTags: [],
    chosenPreferences: []
}


export const getRecipesList = (tags, preferences = []) => dispatch => {
    let queries = tags.map(tag => tag.split(' ')).join('+')
    let health = preferences.length ? `health=${preferences.join('&health=')}` : ''
    let edamamApiPath = `https://api.edamam.com/search?q=${queries}&app_id=${edamamId}&app_key=${edamamKey}&from0&to=5&${health}`


    dispatch(setIngredients(tags))
    dispatch(setDietPreferences(preferences))

    axios.get(edamamApiPath)
        .then(res => {
            let recipes = res.data.hits.map((hit, idx) => {
                hit.recipe.id = `${idx}_${hit.recipe.uri}`
                return hit.recipe
            })
            dispatch(getRecipes(recipes))
        })
        .catch(err => {
            console.error('ERROR in getRecipesList: ', err)
        })
}

export const resetRecipies = dispatch => {
    dispatch(getRecipes([{}]))
}

export default function reducer(state = initialCategoryState, action) {
    const newState = Object.assign({}, state)

    switch (action.type) {
        case GET_RECIPES:
            newState.recipeList = action.recipes
            break

        case SET_INGREDIENTS:
            newState.chosenTags = action.tags
            break

        case SET_DIET_PREFERENCES:
            newState.chosenPreferences = action.preferences
            break

        default:
            return state
    }

    return newState
}





