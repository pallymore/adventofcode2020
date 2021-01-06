const readline = require("readline");
const fs = require("fs");

solution().then(console.log);

async function solution() {
  const inputStream = fs.createReadStream("./input");

  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const ingredientsCount = {}; // ingredient -> count
  const possibleAllergicIngredients = {}; // allergen -> ingredient[]

  for await (const line of lines) {
    const [i, a] = line.split(" (contains ");
    const ingredients = i.split(" ");
    const allergens = a.split(", ").map((allergen) => {
      return allergen.replace(/\)/g, "");
    });

    ingredients.forEach((ing) => {
      ingredientsCount[ing] = (ingredientsCount[ing] ?? 0) + 1;
    });

    allergens.forEach((al) => {
      if (!possibleAllergicIngredients[al]) {
        // has not seen this before, assume everything is allergic
        possibleAllergicIngredients[al] = ingredients;
      } else {
        // filter out the ones that are not present in the current ingredients list
        possibleAllergicIngredients[al] = possibleAllergicIngredients[
          al
        ].filter((ingredient) => ingredients.includes(ingredient));
      }
    });
  }

  let allergenIngredient = {}; // allergen -> ingredient
  while (Object.keys(possibleAllergicIngredients).length > 0) {
    // find a record that has only 1 ingredient
    const definitelyAllergic = Object.keys(possibleAllergicIngredients).find(
      (k) => possibleAllergicIngredients[k].length <= 1
    );
    if (!definitelyAllergic) {
      // prevent infinite loop;
      throw new Error("cannot find anything that is definitely allergic");
    }
    const ingredient = possibleAllergicIngredients[definitelyAllergic][0];
    // add it to our known list
    allergenIngredient[definitelyAllergic] = ingredient;
    // remove it from possible allergic ingredients map;
    delete possibleAllergicIngredients[definitelyAllergic];
    // remove that ingredient from all other possibilities
    Object.keys(possibleAllergicIngredients).forEach((k) => {
      possibleAllergicIngredients[k] = possibleAllergicIngredients[k].filter(
        (ing) => ing !== ingredient
      );
    });
  }

  // all allergicIngredients
  const allergicIngredients = Object.values(allergenIngredient);

  const sum = Object.keys(ingredientsCount).reduce((s, ingredient) => {
    if (allergicIngredients.includes(ingredient)) {
      return s;
    }
    return s + ingredientsCount[ingredient];
  }, 0);

  return sum;
}
