import Link from "next/link";

function Food({ food }) {
  return (
    <div>
      <h1>{food.Name}</h1>
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
