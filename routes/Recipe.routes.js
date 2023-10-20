const express = require('express');
const { RecipeModel } = require('../model/Recipe.model')
const recipeRouter = express.Router();


recipeRouter.get("/", async (req, res) => {
    try {
        const recipes = await RecipeModel.find({ userID: req.body.userID })
        res.status(200).send(recipes)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})


recipeRouter.post("/add", async (req, res) => {
    try {
        const recipe = new RecipeModel(req.body)
        await recipe.save()
        res.status(200).send({ 'msg': 'New Recipe has been added' })
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})


recipeRouter.patch("/update/:recipeID", async (req, res) => {
    const { recipeID } = req.params;
    const recipe = await RecipeModel.findOne({ _id: recipeID })
    try {
        if (req.body.userID !== recipe.userID) {
            res.status(200).send({ "msg": "You are not authorized to perform this action" })
        } else {
            await RecipeModel.findByIdAndUpdate({ _id: recipeID }, req.body)
            res.status(200).send(`The recipe with id:${recipeID} has been updated`)
        }
    } catch (err) {
        res.status(400).send(err)
    }

})


recipeRouter.delete("/delete/:recipeID", async (req, res) => {
    const { recipeID } = req.params;
    const recipe = await RecipeModel.findOne({ _id: recipeID })
    try {
        if (req.body.userID !== recipe.userID) {
            res.status(200).send({ "msg": "You are not authorized to perform this action" })
        } else {
            await RecipeModel.findByIdAndDelete({ _id: recipeID })
            res.status(200).send(`The recipe with id:${recipeID} has been deleted`)
        }
    } catch (err) {
        res.status(400).send(err)
    }

})


module.exports = {
    recipeRouter
}