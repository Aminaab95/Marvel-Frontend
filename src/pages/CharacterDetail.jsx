import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CharacterDetail() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*const localURL = "http://localhost:3000";*/
  const productionURL = "https://site--marvel-backend--m5j6f6hlb96f.code.run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch character details
        const characterResponse = await axios.get(
          `${productionURL}/character/${characterId}`
        );
        setCharacter(characterResponse.data);

        // Fetch comics associated with the character
        const comicsResponse = await axios.get(
          `${productionURL}/comics/${characterId}`
        );
        setComics(comicsResponse.data.results);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterId]);

  const getImageUrl = (item) => {
    const { path, extension } = item.thumbnail;
    return `${path}/portrait_xlarge.${extension}`;
  };

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div className="character-detail">
      {character ? (
        <div className="character-card">
          <img src={getImageUrl(character)} alt={character.name} />
          <h1>{character.name}</h1>
          <p>{character.description}</p>
        </div>
      ) : (
        <p>Character not found</p>
      )}

      <h2>Comics - {character?.name}</h2>
      {comics.length > 0 ? (
        <div className="comics-list">
          {comics.map((comic) => (
            <div key={comic._id} className="comic-card">
              <img src={getImageUrl(comic)} alt={comic.title} />
              <h3>{comic.title}</h3>
              <p>{comic.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comics available for this character.</p>
      )}
    </div>
  );
}
