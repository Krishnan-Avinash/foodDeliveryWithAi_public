import React from "react";
import macncheese from "../../assets/macncheese.jpg";
import grilledcheesesandwich from "../../assets/grilledcheesesandwich.jpg";
import soup from "../../assets/soup.jpg";
import Quinoa from "../../assets/Quinoa Salad with Avocado.jpg";
import Grilled_Chicken_with_Veggies from "../../assets/Grilled Chicken with Veggies.jpg";
import Loaded_Nachos from "../../assets/Loaded Nachos.jpg";
import masala from "../../assets/masala fries.jpg";
import SmoothieBowls from "../../assets/SmoothieBowls.jpg";
import ChickenWraps from "../../assets/ChickenWraps.jpg";
import alfredoPasta from "../../assets/alfredoPasta.jpg";
import mushroom_vol_au_vent from "../../assets/mushroom_vol_au_vent.jpg";
import Chocolate_Lava_Cake from "../../assets/Chocolate_Lava_Cake.jpg";
import Loaded_Pizza from "../../assets/Loaded_Pizza.jpg";
import Card from "./Card";

import { useSelector } from "react-redux";

const Categories = () => {
  const elements = [
    {
      name: "Mac & Cheese",
      description: "Creamy, cheesy pasta perfect for cozy days.",
      price: 9.49,
      image: macncheese,
    },
    {
      name: "Grilled Cheese Sandwich",
      description: "Crispy bread with melted cheese goodness.",
      price: 6.49,
      image: grilledcheesesandwich,
    },
    {
      name: "Classic Tomato Soup",
      description: "Warm, comforting soup with rich tomato flavor.",
      price: 5.99,
      image: soup,
    },
    {
      name: "Quinoa Salad with Avocado",
      description:
        "Light, nutritious salad packed with protein and healthy fats.",
      price: 10.99,
      image: Quinoa,
    },
    {
      name: "Grilled Chicken with Veggies",
      description:
        "nder chicken served with a side of colorful, fresh veggies.",
      price: 12.49,
      image: Grilled_Chicken_with_Veggies,
    },
    {
      name: "Smoothie Bowls",
      description: "Refreshing, fruity bowls topped with nuts and seeds.",
      price: 7.99,
      image: SmoothieBowls,
    },
    {
      name: "Chicken Wraps",
      description: "Tasty grilled chicken wrapped in a soft tortilla.",
      price: 7.5,
      image: ChickenWraps,
    },
    {
      name: "Loaded Nachos",
      description: "Crispy nachos topped with cheese, salsa, and sour cream.",
      price: 6.99,
      image: Loaded_Nachos,
    },
    {
      name: "Masala Fries",
      description: "Yummy Fries with burst of flavors.",
      price: 5.99,
      image: masala,
    },
    {
      name: "Alfredo Pasta",
      description: "Exotic Alfredo Pasta packed with flavors.",
      price: 10.99,
      image: alfredoPasta,
    },
    {
      name: "Chocolate Lava Cake",
      description: "Decadent chocolate cake with a molten center.",
      price: 6.49,
      image: Chocolate_Lava_Cake,
    },
    {
      name: "Loaded Pizza",
      description: "Cheesy pizza loaded with your favorite toppings.",
      price: 13.99,
      image: Loaded_Pizza,
    },
    {
      name: "Mushroom Vol Au Vent",
      description: "Try the famous and exotic Mushroom Vol Au Vent.",
      price: 14.99,
      image: mushroom_vol_au_vent,
    },
  ];
  const user = useSelector((state) => state.user.userDetails);
  // console.log("checkout: ", user);
  return (
    <div className="categories-parent">
      <h1 className="categories-heading">
        Explore Our Wide Range Of <span>Exotic</span> Food
      </h1>
      <div className="categories-section">
        {elements.map((item, index) => (
          <Card
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            key={Math.random()}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
