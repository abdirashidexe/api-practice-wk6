import Picture from "./Picture"
import Info from "./Info"
import { useState, useEffect } from 'react'

export default function Item() {
    const [pokeId, setPokeId] = useState(1)
    const [pokemon, setPokemon] = useState(null);
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then(res => res.json())
            .then(pokeData => setPokemon(pokeData));
            setLoading(false);
    }, [pokeId]);
    
    useEffect(() => {
        if (pokemon !== null) setImages(pokemon.sprites.other['official-artwork']);
    }, [pokemon]);

    function showNext() {
        setPokeId(prev => prev + 1);
    }

    if (loading) {
        return (
            <h1>Content is loading...</h1>
        )
    }

    return (
        <>
            <p>this is an item component</p>
            <Picture />
            <Info/>
            {pokemon !== null && <img src={pokemon.sprites.other['official-artwork'].front_default} alt="" />}
            <button onClick={showNext}>Next</button>
        </>
    )
}