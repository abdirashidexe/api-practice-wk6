import Picture from "./Picture";
import Info from "./Info";
import { useState, useEffect } from "react";

export default function Item() {
  const [pokeId, setPokeId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(pokeData => {
      if (!pokeData.sprites) {
        setError(true);
      } else {
        setPokemon(pokeData);
        setError(false);
      }
    })
    .catch(() => setError(true));
}, [pokeId]);

  useEffect(() => {
    if (pokemon !== null) setImages(pokemon.sprites.other["official-artwork"]);
    setLoading(false);
  }, [pokemon]);

  function showNext() {
    setPokeId((prev) => prev + 1);
    setLoading(true);
  }

  if (loading) {
    return (
      <>
        <h1>Content is loading...</h1>
        <div id="loading-div"></div>
      </>
    );
  }

  function handleTryAgain() {
    setError(false)
  }

    if (error) {
    return (
      <>
        <h1>Error loading content.</h1>
        <button onClick={handleTryAgain}>Try Again</button>
        <div id="error-div"></div>
      </>
    );
  }

  console.log(images);
  return (
    <>
      {pokemon !== null && <Picture images={images} loading={loading}/>}
      <Info />
      <button onClick={showNext}>Next</button>
    </>
  );
}
