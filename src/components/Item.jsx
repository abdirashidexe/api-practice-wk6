import Picture from "./Picture";
import Info from "./Info";
import { useState, useEffect } from "react";

export default function Item() {
  const [pokeId, setPokeId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((res) => res.json())
      .then((pokeData) => setPokemon(pokeData));
    
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

  console.log(images);
  return (
    <>
      {pokemon !== null && <Picture images={images} loading={loading}/>}
      <Info />
      <button onClick={showNext}>Next</button>
    </>
  );
}
