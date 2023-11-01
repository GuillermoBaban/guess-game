import { Movies } from "../interfaces/Movies";
const missingLatters = (movie: Movies) => {
  const array = Array.from({ length: movie.name.length }, (_, index) => index)
    .sort(() => (Math.random() >= 0.5 ? 1 : -1))
    .slice(0, Math.floor(movie.name.length / 2));

  return movie.name.split("").map((letter, index) => {
    if (array.includes(index) && letter !== " ") {
      return " _ ";
    }
    return letter;
  });
};

export default missingLatters;
