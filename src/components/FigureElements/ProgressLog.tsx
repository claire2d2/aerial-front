import { useState, useEffect } from "react";
// import { Accordion } from "flowbite-react";
import aerialApi from "../../service/aerialApi";
import ProgressLogForm from "./ProgressLogForm";

type logType = {
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
  //   const { isLoggedIn, user } = useUser();
  // fetch data from figures for the log
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

  return (
    <div className="w-full h-full">
      <h2 className="font-bold text-2xl capitalize text-center">
        Progress log
      </h2>
      <div className="w-full">
        <ProgressLogForm currFigId={currFigId} fetchLogData={fetchLogData} />
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
                  <div>{log.owner}</div>
                </div>
              </div>
            ))
          : "No progress logs yet ..."}
      </div>
    </div>
  );
};

export default ProgressLog;
