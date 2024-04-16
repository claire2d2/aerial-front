import { useState, useEffect } from "react";
import aerialApi from "../service/aerialApi";

type figType = {
  id: string;
  name: string;
  image: string;
  discipline: string;
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

const PoleDance = () => {
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
            <div>{fig.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PoleDance;
