import useFetch from "/useFetch"

const MovieByTitle = ({title}) => {
    const {data, loading, error} = useFetch(
        `https://localhost:3000/movies/${title}`)

console.log(data)

return data ? (
    <div>
        <h2>
            {data.title}
        </h2>
        <p>Director:{data.director}</p>
        <p>Country:{data.country}</p>
        <p>Release Year:{data.releaseYear}</p>
        <p>Rating:{data.rating}</p>
    </div>
):(
loading && <p>Loading...</p>
)
}
export default MovieByTitle;