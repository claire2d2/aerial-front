import { SetStateAction, useRef } from "react";
import { logType, fetchLogData } from "./OneFigureStyles";
import aerialApi from "../../../service/aerialApi";
// style imports
import { HiOutlineTrash, HiX } from "react-icons/hi";
import { getDaySuffix } from "./OneFigureStyles";

type OneProgressLogProps = {
  log: logType;
  currFigId: string;
  setLogs: React.Dispatch<SetStateAction<logType[]>>;
};
const OneProgressLog: React.FC<OneProgressLogProps> = ({
  log,
  currFigId,
  setLogs,
}) => {
  /*
   ** Handle deleting existing log (only accessible to current user)
   */

  async function handleDeleteLog(e: React.MouseEvent<HTMLElement>, id: string) {
    e.preventDefault;
    try {
      const response = await aerialApi.delete(`/logs/${id}`);
      fetchLogData(setLogs, currFigId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // dialog that opens if user that isn't logged in clicks on favorite
  const imageModal = useRef<HTMLDialogElement | null>(null);

  function openImageModal() {
    imageModal.current?.showModal();
  }

  function closeImageModal() {
    imageModal.current?.close();
  }
  // show paragraphs
  const contentParagraphs = log.content.split("\n").map((paragraph, index) => (
    <p key={index} className="mb-2">
      {paragraph}
    </p>
  ));

  return (
    <div className="OneLog flex gap-3  w-full py-1 group relative">
      <div className="flex max-h-32 items-center aspect-square object-cover rounded-lg">
        {log.image ? (
          <button
            onClick={openImageModal}
            className="h-full w-full p-1 object-cover rounded-lg"
          >
            <img
              src={log.image}
              alt="image of figure"
              className="object-cover h-full w-full rounded-lg"
            />
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col w-full min-w-1/2">
        <div className="font-medium px-2 w-full bg-main dark:bg-maindark text-white">
          {new Date(log.date).getDate()}
          {getDaySuffix(new Date(log.date).getDate())} of{" "}
          {new Date(log.date).toLocaleString("en", {
            month: "long",
          })}{" "}
          {new Date(log.date).getFullYear()}
        </div>
        <div>{contentParagraphs}</div>
        <button
          onClick={(e) => handleDeleteLog(e, log._id)}
          className="group-hover:text-text dark:group-hover:text-textdark text-transparent absolute right-0 top-12 dark:hover:text-linkhover"
        >
          <HiOutlineTrash />
        </button>
      </div>

      <dialog
        ref={imageModal}
        className="rounded-sm drop-shadow-xl dark:bg-bgmaindark"
      >
        <div className="relative p-6">
          <button
            onClick={closeImageModal}
            className="absolute top-1 right-1 text-gray dark:text-textdark hover:text-cancel dark:hover:text-cancel "
          >
            <HiX />
          </button>
          <img
            src={log.image}
            alt="photo of progress log image"
            className="max-h-96 max-w-96"
          />
        </div>
      </dialog>
    </div>
  );
};

export default OneProgressLog;
