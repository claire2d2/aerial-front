import aerialApi from "../service/aerialApi";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [health, setHealth] = useState<boolean>(false);

  const fetchHealth = async () => {
    try {
      const response = await aerialApi.get(`/health`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);
  if (!health) {
    return <p>Loading</p>;
  }

  return (
    <div>
      {/* {figures &&
        figures.map((fig: figType) => <div key={fig.id}>{fig.name}</div>)} */}
    </div>
  );
};

export default HomePage;
