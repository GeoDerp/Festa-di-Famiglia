require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');

  //thanks Aankhen for help with this
  eleventyConfig.addCollection("recipeTags", async (collections) => {
    const getRecipes = require("./_data/recipesContentful.js");
    const recipes = await getRecipes();
    return Array.from(new Set(recipes.flatMap((r) => r.categories)));
  });
}
  
