import { useEffect, useState } from "react";

export default function Favorites() {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  useEffect(() => {
    const storedCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const storedComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];
    setFavoriteCharacters(storedCharacters);
    setFavoriteComics(storedComics);
  }, []);

  const getImageUrl = (item) => {
    const { path, extension } = item.thumbnail;
    return `${path}/portrait_xlarge.${extension}`;
  };

  return (
    <div className="favorites">
      <h1>Favorite Characters</h1>
      {favoriteCharacters.length > 0 ? (
        <div className="favorites-list">
          {favoriteCharacters.map((character) => (
            <div key={character._id} className="character-card">
              <img src={getImageUrl(character)} alt={character.name} />
              <h2>{character.name}</h2>
              <p>{character.description || "No description available"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite characters</p>
      )}

      <h1>Favorite Comics</h1>
      {favoriteComics.length > 0 ? (
        <div className="favorites-list">
          {favoriteComics.map((comic) => (
            <div key={comic._id} className="comic-card">
              <img src={getImageUrl(comic)} alt={comic.title} />
              <h2>{comic.title}</h2>
              <p>{comic.description || "No description available"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite comics</p>
      )}
    </div>
  );
}
