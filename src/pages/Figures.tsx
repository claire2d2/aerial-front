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

const Figures = () => {
  const { currDiscipline, currDisciplineRef } = useUser();

  const [figures, setFigures] = useState<figType[] | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchFigures() {
    try {
      console.log(currDisciplineRef);
      const response = await aerialApi.get(`/figures/by/${currDisciplineRef}`);
      setFigures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFigures();
  }, [figures]);

  if (!figures) {
    return <p>Loading!</p>;
  }
  return (
    <div className="flex">
      <div>{currDiscipline} figures here!</div>
      <div>
        {figures.map((fig, index) => {
          return (
            <div key={index}>
              <Link to={fig.ref}>
                <div>{fig.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Figures;
