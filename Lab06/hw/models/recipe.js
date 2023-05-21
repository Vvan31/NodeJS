const { v4: uuid }  = require('uuid')
const fs = require('fs')
const path = require('path')

const rootDir = require('../utils/path-helper')
const recipesData = require('../data/recipes.json')
const recipesDataPath = path.join(rootDir, 'data', 'recipes.json')

// Mongo DB
const { mongoConnect } = require('../service/mongodb')
const db = mongoConnect();

module.exports = class Recipe {
    constructor(name, ingredient, instruction){
        this.id = uuid()
        this.name = name
        this.ingredient = ingredient
        this.instruction = instruction
    }

    async save(callback){
        // USe mongoDB
        (await db).collection('recipes').insertOne(this, (err, result) => {
            if(err){
                callback({ message: "Could not save recipe", status: 500 })
            }

            callback({ message: "Recipe saved successfully", status: 201 })
        })
    }

    async fetchAllRecipes(callback){
        // Use mongoDB
        (await db).collection('recipes').find().toArray((err, result) => {
            if(err){
                callback(null, { message: "No recipe list found", err })
            }

            callback(result)
        })
        // Use JSON file
        /* fs.readFile(recipesDataPath, (err, data) => {
            if(err){
                callback(null, { message: "No recipe list found", err })
            }

            callback(JSON.parse(data))
        }) */
    }

    //update

    //delete a recipe

    //delete all recipes
}
