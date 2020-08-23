import React, { useState, useEffect } from "react";
import Link from "next/link";

function Food({ food }) {
  let [incredients, setIncredients] = useState([]);
  let [step, setStep] = useState(0);

  useEffect(() => {
    food.Steps.map((e) => {
      e.Ingredient.map((f) => {
        setIncredients((incredients) => [...incredients, f]);
      });
    });
  }, []);

  return (
    <div>
      {step == 0 ? (
        <>
          <h1>{food.Name}</h1>
          <small>Duration: {food.Duration} minutes</small>
          <br />
          {food
            ? food.Finish.map((f) => {
                return (
                  <img
                    key={f.name}
                    src={`http://localhost:1337${f.formats.small.url}`}
                  />
                );
              })
            : null}
          <h2>Incredients</h2>
          <ul>
            {incredients.map((e) => {
              return (
                <li key={e.Ingredient}>
                  {e.Amount} {e.Unit} <strong>{e.Ingredient}</strong>
                </li>
              );
            })}
          </ul>
          <p>{food.Steps.length} steps</p>
          <button onClick={() => setStep(step + 1)}>Start</button>
        </>
      ) : (
        <>
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
        </>
      )}
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
