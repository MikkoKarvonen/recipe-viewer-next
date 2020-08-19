export default function Home({ foods }) {
  return (
    <div>
      Welcome to Next.js!
      <Food foods={foods} />
    </div>
  );
}

function Food({ foods }) {
  return (
    <ul>
      {foods &&
        foods.map((food) => (
          <li key={`/foods/${food.id}`}>
            <a href={`/foods/${food.id}`}>{food.Name}</a>
          </li>
        ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/foods");
  const foods = await res.json();
  return {
    props: {
      foods,
    },
  };
}
