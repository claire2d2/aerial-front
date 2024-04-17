import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";

import StatusToggle from "../components/FigureElements/StatusToggle";

type logType = {
  content: string;
  date: string;
  image: string;
};

type figType = {
  id: string;
  name: string;
  image: string;
  discipline: {
    name: string;
    ref: string;
  };
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
  // comments:
};

const OneFigure = () => {
  const { currDiscipline, currDisciplineRef } = useUser();
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);
  const [logs, setLogs] = useState<logType[]>([]);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchFigData() {
    try {
      const response = await aerialApi.get(`/figures/${figureRef}`);
      console.log(response.data);
      setFigData(response.data.oneFigure);
      setLogs(response.data.progressLogs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFigData();
  }, []);

  /* if user tries to access a figure that does not match the current discipline, redirect:
   ** find the location name that is being accessed
   ** check whether the current figure data discipline matches the location
   ** if not show error message, and button to go back to the correct discipline*/

  const currLocation = location.pathname.split("/")[1];
  if (figData && figData.discipline.ref !== currLocation) {
    return (
      <div>
        Looks like this figure doesn't exist for the {currDiscipline}
        discipline
        <button onClick={() => navigate(`/${currDisciplineRef}/figures`)}>
          Go back to {currDiscipline} figures
        </button>
      </div>
    );
  }

  // If data is still loading, return loading page
  if (!figData) {
    return <div>Loading</div>;
  }
  // style figure page here
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="LeftSide bg-red-200 flex flex-col justify-center items-center lg:basis-2/3">
        <h1 className="font-bold text-4xl capitalize">{figData?.name}</h1>
        <div className="aspect-square h-60 ">
          <img
            src={figData.image}
            alt={`image of ${figData?.name}`}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <div>
          <StatusToggle />
        </div>
        <div>
          {logs.length !== 0
            ? logs?.map((log) => (
                <div>
                  <div>{log.date.split("T")[0]}</div>
                  <div className="flex h-32">
                    {log.image ? (
                      <div>
                        <img
                          src={log.image}
                          alt="image of figure"
                          className="object-cover h-full"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div>{log.content}</div>
                  </div>
                </div>
              ))
            : "No progress logs yet ..."}
        </div>
      </div>
      <div className="RightSide bg-green-200 lg:basis-1/3">
        <div>Entries</div>
        <div>Exits</div>
      </div>
    </div>
  );
};

export default OneFigure;
