import { useEffect, useState } from "react";
import axios from "axios";

export default function Comics() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*const localURL = "http://localhost:3000";*/
  const productionURL = "https://site--marvel-backend--m5j6f6hlb96f.code.run";

  const handleFavorite = (comic) => {
    let favorites = JSON.parse(localStorage.getItem("favoritesComics")) || [];
    if (favorites.some((fav) => fav._id === comic._id)) {
      favorites = favorites.filter((fav) => fav._id !== comic._id);
    } else {
      favorites.push(comic);
    }
    localStorage.setItem("favoritesComics", JSON.stringify(favorites));
  };

  const isFavorite = (comic) => {
    const favorites = JSON.parse(localStorage.getItem("favoritesComics")) || [];
    return favorites.some((fav) => fav._id === comic._id);
  };

  const getImageUrl = (comic) => {
    const { path, extension } = comic.thumbnail;
    return `${path}/portrait_xlarge.${extension}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${productionURL}/comics`);
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
    <div className="comics-list">
      {data.map((comic) => (
        <div key={comic._id} className="comic-card">
          <img src={getImageUrl(comic)} alt={comic.title} />
          <h2>{comic.title}</h2>
          <p>{comic.description}</p>
          <button onClick={() => handleFavorite(comic)}>
            {isFavorite(comic) ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      ))}
    </div>
  );
}
