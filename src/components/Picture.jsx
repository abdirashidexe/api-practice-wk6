export default function Picture({ images }) {

    const frontShiny = images.front_shiny;
    const frontDefault = images.front_default;
    console.log(frontDefault);
    console.log(frontShiny);

    return (
        <div>
            <p>Picture Component</p>
            <img src={frontDefault} alt="Default Pokemon" />
            <img src={frontShiny} alt="Shiny Pokemon" />
        </div>
    )
}
