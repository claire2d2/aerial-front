// Links
import { useNavigate } from "react-router-dom";

type DisciplineProps = {
  image: string;
  name: string;
  active: boolean;
  link: string;
};

const Discipline: React.FC<DisciplineProps> = ({
  name,
  image,
  active,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(link)}
      className="relative h-64 lg:h-80 flex items-center justify-center"
    >
      <img
        src={image}
        alt=""
        className="object-cover h-full w-full brightness-50 hover:brightness-95"
      />
      <div className="absolute text-white font-bold text-5xl">
        <h2>{name}</h2>
        {active ? "" : <p className="text-xs text-center">Work in progress</p>}
      </div>
    </button>
  );
};

export default Discipline;
