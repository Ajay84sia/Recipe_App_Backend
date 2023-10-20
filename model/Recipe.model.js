const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    userID: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: Array, required: true },
    dishTypes: { type: Array, required: true },
    instructions: { type: String, required: true },
    summary: { type: String, required: true },
}, {
    versionKey: false
})

const RecipeModel = mongoose.model('recipe', recipeSchema)

module.exports = {
    RecipeModel
}