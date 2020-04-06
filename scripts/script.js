function makeBurger(ingredients) {
  const burgerPromise = new Promise((resolve, reject) => {
    if (ingredients.includes("fish")) {
      //If error use reject()
      reject("We dont have any fish!");
    }
    const timeForBurger = 500 + ingredients.length * 400;
    setTimeout(() => {
      //When ready use resolve()
      resolve(`Burger ready: ${ingredients.join(", ")}`);
    }, timeForBurger);
  });
  return burgerPromise;
}

// const beefBurgerPromise = makeBurger(["bun", "tomato", "beef"]);
// const chickenBurgerPromise = makeBurger(["bun", "salad", "chicken"]);

// console.log(beefburgerPromise);
// console.log(chickenburgerPromise);

makeBurger(["bun", "tomato", "beef", "sous", "onion"])
  .then((burger) => {
    console.log("Burger delivery");
    console.log(burger);
    return makeBurger(["bun"]);
  })
  .then((burger) => {
    console.log("Burger delivery");
    console.log(burger);
    return makeBurger(["bun", "salad", "chicken"]);
  })
  .then((burger) => {
    console.log("This is last burger");
    console.log(burger);
  })
  .catch(handleError);

//Concurently
const beefBurgerPromise = makeBurger(["bun", "tomato", "beef"]);
const chickenBurgerPromise = makeBurger(["bun", "salad", "chicken"]);
const cheeseBurgerPromise = makeBurger(["cheese", "bun"]);
// const cheeseBurgerPromise = makeBurger(["cheese", "bun", "fish"]);

const deliveryPromise = Promise.all([
  beefBurgerPromise,
  chickenBurgerPromise,
  cheeseBurgerPromise,
]);

deliveryPromise
  .then((burgers) => {
    const [hamBurger, chickenBurger, cheeseBurger] = burgers;
    console.log(hamBurger);
    console.log(chickenBurger);
    console.log(cheeseBurger);
  })
  .catch(handleError);

//-----------
const firstBurgerPromise = Promise.race([
  beefBurgerPromise,
  chickenBurgerPromise,
  cheeseBurgerPromise,
]);

firstBurgerPromise
  .then((burger) => {
    console.log("I am first ", burger);
  })
  .catch(handleError);

const someBurgersPromise = Promise.allSettled([
  beefBurgerPromise,
  chickenBurgerPromise,
  cheeseBurgerPromise,
]);

someBurgersPromise
  .then(([hamBurger, chickenBurger, cheeseBurger]) => {
    console.log(hamBurger, chickenBurger, cheeseBurger);
  })
  .catch(handleError);

function handleError(error) {
  console.log(error);
}
