import { useState, useEffect } from "react";
import useUser from "../../../context/useUser";
import { logType, fetchLogData } from "./OneFigureStyles";
import ProgressLogForm from "./ProgressLogForm";
import OneProgressLog from "./OneProgressLog";
import { Accordion } from "flowbite-react";
import { panelTheme, customTheme, titleTheme } from "../../Styles";

type Logs = {
  currFigId: string;
};

const ProgressLog: React.FC<Logs> = ({ currFigId }) => {
  const [logs, setLogs] = useState<logType[]>([]);
  const { isLoggedIn } = useUser();

  /* fetch progress log informations for the related figure
   **(configured on backend will only show logs made by current user)
   */

  useEffect(() => {
    fetchLogData(setLogs, currFigId);
  }, [currFigId]);

  return (
    <div className="w-full h-full">
      <h2 className="font-bold text-2xl capitalize text-center ">
        Progress log
      </h2>
      {!isLoggedIn ? (
        <div className="w-full">
          You must be logged in to access progress logs
        </div>
      ) : (
        <div>
          <Accordion theme={customTheme}>
            <Accordion.Panel theme={customTheme}>
              <Accordion.Title theme={titleTheme}>
                <h3 className="font-bold px-5">Add a new progress log</h3>
              </Accordion.Title>
              <Accordion.Content theme={panelTheme}>
                <ProgressLogForm currFigId={currFigId} setLogs={setLogs} />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          <h3 className="font-bold px-5">Logs</h3>
          <div className="h-80 overflow-y-scroll no-scrollbar overflow-x-hiddenflex flex-col px-5">
            {logs && logs.length !== 0
              ? logs?.map((log) => (
                  <OneProgressLog
                    log={log}
                    setLogs={setLogs}
                    currFigId={currFigId}
                  />
                ))
              : "No progress logs yet ..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressLog;
