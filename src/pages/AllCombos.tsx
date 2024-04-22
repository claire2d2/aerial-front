import { useState } from "react";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";
import { figType } from "../components/Types";

type comboType = {
  _id: string;
  name: string;
  figures: figType[];
  owner: string;
  comment: string;
};
const AllCombos = () => {
  const { currDisciplineRef } = useUser();
  const [allCombos, setAllCombos] = useState<comboType[]>([]);

  useState(() => {
    fetchCombos();
  }, []);

  async function fetchCombos() {
    try {
      const response = await aerialApi.get(
        `/combos?discipline=${currDisciplineRef}`
      );
      setAllCombos(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full flex flex-col lg:flex-row lg:h-full">
      <div className="basis-1/4 h-full bg-main text-white">Search</div>
      <div className="lg:basis-1/2 h-full">
        <h2>Create a Combo / Edit combo</h2>
        <div>Upcoming feature</div>
      </div>
      <div className="lg:h-full basis-1/4 bg-main">
        <h2 className="text-white">All combos</h2>
        <div>
          {allCombos?.map((combo) => {
            return <div>{combo.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AllCombos;
