import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const OneFigure = () => {
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);

  async function fetchFigData() {
    try {
      const response = await aerialApi.get(`/figures/${figureRef}`);
      setFigData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFigData();
  }, []);

  if (!figData) {
    return;
    <p> Loading</p>;
  }

  return (
    <div>
      This will be the page for the figure {figData?.name}
      <div>
        <img src={figData.image} alt="" />
      </div>
    </div>
  );
};

export default OneFigure;
