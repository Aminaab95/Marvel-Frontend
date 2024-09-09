import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Characters() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFavorite = (character) => {
    let favorites =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    if (favorites.some((fav) => fav._id === character._id)) {
      favorites = favorites.filter((fav) => fav._id !== character._id);
    } else {
      favorites.push(character);
    }
    localStorage.setItem("favoritesCharacters", JSON.stringify(favorites));
  };

  const isFavorite = (character) => {
    const favorites =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    return favorites.some((fav) => fav._id === character._id);
  };

  const getImageUrl = (character) => {
    const { path, extension } = character.thumbnail;
    return `${path}/portrait_xlarge.${extension}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div className="characters-list">
      {data.map((character) => (
        <div key={character._id} className="character-card">
          <img src={getImageUrl(character)} alt={character.name} />
          <h2>{character.name}</h2>
          <p>{character.description}</p>
          <Link to={`/character/${character._id}`}>View Comics</Link>
          <button onClick={() => handleFavorite(character)}>
            {isFavorite(character)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      ))}
    </div>
  );
}
