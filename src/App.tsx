import { useEffect, useMemo, useState } from "react";
import { Movies } from "./interfaces/Movies";
import fetchMovies from "./functions/fetchMovies";
import missingLatters from "./functions/missingLatters";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<null | Movies>(null);
  const nameLessLatters = useMemo(() => {
    if (!movies) return "";
    return missingLatters(movies);
  }, [movies]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  if (!movies) return <h1>Loading...</h1>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let inputValue = (e.currentTarget[0] as HTMLInputElement).value;
    if (inputValue.toLocaleLowerCase() === movies.name.toLocaleLowerCase()) {
      setScore(score + 1);
      (e.currentTarget[0] as HTMLInputElement).value = "";
      fetchMovies(setMovies);
      setHint(false);
      alert("You win");
    } else {
      if (score > 0) {
        setScore(score - 1);
      }
      setLives(lives - 1);
      if (lives === 1) {
        alert("Wrong answer. Game over");
        setLives(3);
        setScore(0);
        fetchMovies(setMovies);
      } else {
        alert("Wrong answer");
      }
      (e.currentTarget[0] as HTMLInputElement).value = "";
    }
  };

  const handleHint = () => {
    setHint(true);
  };

  return (
    <main>
      <div className="toolbar">
        <span>
          {lives === 3
            ? "❤️❤️❤️"
            : lives === 2
            ? "❤️❤️"
            : lives === 1
            ? "❤️"
            : ""}
        </span>

        <button className="unstyled-button" onClick={handleHint}>
          🤚
        </button>
        <span>Score: {score}</span>
      </div>
      <h1>Guess the TV show name</h1>

      <h2>{nameLessLatters}</h2>
      <h2>{movies.name}</h2>
      <span>{hint ? movies.overview : ""}</span>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">accept</button>
      </form>
    </main>
  );
}

export default App;
