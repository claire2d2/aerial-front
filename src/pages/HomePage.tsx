import { Link } from "react-router-dom";

//TODO change curr discipline when navigating between pages
const HomePage = () => {
  return (
    <div>
      <Link to="/pole">Pole Dance</Link>
      <Link to="/aerial-hoop">Aerial Hoop</Link>
      {/* {figures &&
        figures.map((fig: figType) => <div key={fig.id}>{fig.name}</div>)} */}
    </div>
  );
};

export default HomePage;
