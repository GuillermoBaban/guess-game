import { Movies } from "../interfaces/Movies";

const fetchMovies = (
  setMovies: React.Dispatch<React.SetStateAction<null | Movies>>
) => {
  const getRandomPage = Math.floor(Math.random() * 92);

  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${
      getRandomPage == 0 ? 1 : getRandomPage
    }`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  )
    .then((res) => res.json() as Promise<{ results: Movies[] }>)
    .then((data) =>
      setMovies(data.results[Math.floor(Math.random() * data.results.length)])
    );
};

export default fetchMovies;
