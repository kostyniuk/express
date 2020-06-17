import React, { useState } from 'react';
import SelectSearch from 'react-select-search';

const Fetch = () => (
  <SelectSearch
    options={[]}
    getOptions={(query) => {
      return new Promise((resolve, reject) => {
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
        )
          .then((response) => response.json())
          .then(({ drinks }) => {
            resolve(
              drinks.map(({ idDrink, strDrink }) => ({
                value: idDrink,
                name: strDrink,
              }))
            );
          })
          .catch(reject);
      });
    }}
    search
    placeholder='Your favorite drink'
  />
);

export default Fetch;
