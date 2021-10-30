import React, { useState, useEffect } from 'react';

const Recipe = props => {
    return (
        <div>
            <h3 className="font-weight-bold">{props.recipe.name}</h3>
            <img src={props.recipe.image}></img>
            <ul className="list-group list-group-flush">
                {props.recipe.presentIngredients.map(ingredient => {
                    return (
                        <li className="list-group-item" key={ingredient.id}><p className="text-success">{ingredient.name}</p></li>
                    );
                })}
                {props.recipe.missingIngredients.map(ingredient => {
                    return (
                        <li className="list-group-item" key={ingredient.id}><p className="text-danger">{ingredient.name}</p></li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Recipe;