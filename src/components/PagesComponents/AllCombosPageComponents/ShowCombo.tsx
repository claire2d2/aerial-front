import { comboType } from "../../Types";
type ShowComboProps = {
  shownCombo: comboType;
};

const ShowCombo: React.FC<ShowComboProps> = ({ shownCombo }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 px-5">
        <h2 className="font-romantic text-3xl">
          <span>{shownCombo.name}</span>
        </h2>

        <div className="flex flex-col gap-2 w-full">
          {shownCombo.figures.map((fig, index) => {
            return (
              <div
                key={index}
                className="px-3 py-2 drop-shadow-md rounded-lg capitalize bg-white text-center"
              >
                <div className="w-full h-full">{fig.name}</div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center py-4 gap-2">
          <p className="font-romantic text-xl">Comment :</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{shownCombo.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowCombo;
