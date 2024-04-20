import { useState, useEffect } from "react";
import useUser from "../../../context/useUser";
import aerialApi from "../../../service/aerialApi";
import ProgressLogForm from "./ProgressLogForm";

// style imports
import { HiOutlineTrash } from "react-icons/hi";

type logType = {
  _id: string;
  owner: string;
  content: string;
  date: string;
  image: string;
};
type Logs = {
  currFigId: string;
};

const ProgressLog: React.FC<Logs> = ({ currFigId }) => {
  const [logs, setLogs] = useState<logType[]>([]);
  const { isLoggedIn } = useUser();

  /* fetch progress log informations for the related figure
   **(configured on backend will only show logs made by current user)
   */

  async function fetchLogData() {
    try {
      const response = await aerialApi.get(`/logs/${currFigId}`);
      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLogData();
  }, []);

  /*
   ** Handle deleting existing log (only accessible to current user)
   */

  async function handleDeleteLog(e: React.MouseEvent<HTMLElement>, id: string) {
    e.preventDefault;
    try {
      const response = await aerialApi.delete(`/logs/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full">
      <h2 className="font-bold text-2xl capitalize text-center">
        Progress log
      </h2>
      {!isLoggedIn ? (
        <div className="w-full">
          You must be logged in to access progress logs
        </div>
      ) : (
        <div>
          <div className="w-full">
            <ProgressLogForm
              currFigId={currFigId}
              fetchLogData={fetchLogData}
            />
          </div>
          <h3 className="font-bold">Logs</h3>
          <div className="h-80 overflow-scroll">
            {logs.length !== 0
              ? logs?.map((log) => (
                  <div className="OneLog flex flex-col h-20">
                    {/* <div>{log.date.split("T")[0]}</div> */}
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
                      <button onClick={(e) => handleDeleteLog(e, log._id)}>
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </div>
                ))
              : "No progress logs yet ..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressLog;
