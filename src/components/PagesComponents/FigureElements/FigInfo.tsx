import { useState } from "react";
import { figType } from "../../Types";

import StatusToggle from "./StatusToggle";
import FavoriteButton from "../FavoriteButton";
// what will show for the basic user, when the edit mode isn't on

type FigInfoProps = {
  figData: figType;
};

const FigInfo: React.FC<FigInfoProps> = ({ figData }) => {
  // imported in StatusToggle component
  const [status, setStatus] = useState<string>("Not seen yet");
  const [oneSideStatus, setOneSideStatus] = useState<string | null>(null);
  return (
    <div className="FigInfo  flex flex-col lg:flex-row lg:basis-1/2 gap-2 justify-center items-center mb-2 lg:py-5">
      {/* Title, figure image + figure credits */}
      <div className="FigCard flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-4xl capitalize">{figData.name}</h1>
        <div className="aspect-square h-60 drop-shadow-md dark:brightness-90 ">
          <img
            src={figData.image}
            alt={`image of ${figData?.name}`}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <div className="text-xs text-darkgray">
          This image was found on{" "}
          <a href={figData.imgArtistUrl} target="blank" className="underline">
            {figData.imgArtist}
          </a>
        </div>
      </div>
      {/* Level, difficulty and favorite */}
      <div className="flex-col flex items-center lg:basis-1/2 ">
        <div className="font-semibold text-lg text-center text-main dark:text-textdark">
          <p>Level:</p>{" "}
          <p className="capitalize font-normal text-text dark:text-textdark">
            {figData?.difficulty}
          </p>
        </div>
        <div className="font-semibold text-lg text-center text-main dark:text-textdark">
          <p>Focuses on:</p>

          <ul className="text-text font-normal flex flex-row gap-2 capitalize">
            {figData.focus.map((focus) => {
              return <li>{focus.name}</li>;
            })}
          </ul>
        </div>

        <div className="w-full px-20 py-2 flex flex-col text-center">
          <p className="font-semibold text-lg text-main dark:text-textdark">
            Status:
          </p>
          <div className="py-2">
            <StatusToggle
              status={status}
              setStatus={setStatus}
              oneSideStatus={oneSideStatus}
              setOneSideStatus={setOneSideStatus}
              currFigId={figData._id}
            />
          </div>
        </div>

        <div className="w-1/3 flex">
          <FavoriteButton fullButton={true} figId={figData._id} />
        </div>
      </div>
    </div>
  );
};

export default FigInfo;
