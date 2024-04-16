import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import aerialApi from "../service/aerialApi";
import useUser from "../context/useUser";

type figType = {
  id: string;
  name: string;
  ref: string;
  image: string;
  discipline: string;
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

const PoleDance = () => {
  const { currDiscipline } = useUser();
  const [figures, setFigures] = useState<figType[] | null>(null);
  async function fetchFigures() {
    try {
      const response = await aerialApi.get("/figures/by/pole");
      setFigures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFigures();
  }, []);

  if (!figures) {
    return <p>Loading!</p>;
  }
  return (
    <div className="flex">
      {figures.map((fig, index) => {
        return (
          <div key={index}>
            <Link to={fig.ref}>
              <div>{fig.name}</div>
            </Link>
          </div>
        );
      })}
      <div>{currDiscipline}</div>
    </div>
  );
};

export default PoleDance;
