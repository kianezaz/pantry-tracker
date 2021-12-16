import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import Recipe from './recipe';
import axios from 'axios';

const RecipeList = (props) => {
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        let mounted = true;
        let ingredients = props.items.map(item => item.name).join(',+');
        if (true) {
            axios.get('http://localhost:5000/recipes/apiKey')
            .then(res => {
                let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${res.data}&ingredients=${ingredients}`;
                axios.get(url)
                    .then(recipes => {
                        console.log(recipes);
                        if (mounted) {
                            setRecipeList(recipes.data.map(recipe => {
                                return ({
                                    id: recipe.id,
                                    name: recipe.title,
                                    presentIngredients: recipe.usedIngredients.map(ingredient => {
                                        return {
                                            name: ingredient.name,
                                            id: ingredient.id
                                        }
                                    }),
                                    missingIngredients: recipe.missedIngredients.map(ingredient => {
                                        return {
                                            name: ingredient.name,
                                            id: ingredient.id
                                        }
                                    }),
                                    image: recipe.image
                                });
                            }));
                        }
                    });
            })
        }
        console.log("here");
        return () => { mounted = false };
    }, []);

    function getRecipeList() {
        return (
            recipeList.map(recipe => {
                return (
                    <li className="list-group-item" key={recipe.id}>
                        <Recipe recipe={recipe} />
                    </li>
                );
            })
        );
    }

    if (recipeList.length > 0) {
        return (
            <ul className="list-group">
                {getRecipeList()}
            </ul>
        );
    }

    else {
        return (
            <p>Add some ingredients to find suggested recipes!</p>
        );
    }

}

export default RecipeList;
