import React, { useState, useEffect } from "react";
import Link from "next/link";

function Food({ food }) {
  let [incredients, setIncredients] = useState([]);
  console.log(food);

  useEffect(() => {
    food.Steps.map((e) => {
      e.Ingredient.map((f) => {
        setIncredients((incredients) => [...incredients, f]);
      });
    });
  }, []);

  return (
    <div>
      <h1>{food.Name}</h1>
      <small>{food.Duration} minutes</small>
      <ul>
        {incredients.map((e) => {
          return (
            <li>
              {e.Amount} {e.Unit} <strong>{e.Ingredient}</strong>
            </li>
          );
        })}
      </ul>
      {food.Steps.map((e) => {
        let imgs = [];
        {
          e.StepImage.map((f) => {
            imgs.push(
              <img
                key={f.name}
                src={`http://localhost:1337${f.formats.small.url}`}
              />
            );
          });
        }
        return imgs;
      })}
      <p>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </p>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/foods");
  const foods = await res.json();
  const paths = foods.map((post) => `/foods/${post.id}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:1337/foods/${params.id}`);
  const food = await res.json();
  return { props: { food } };
}

export default Food;
