import { useNavigate } from "react-router-dom";
const Features = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-center bg-no-repeat bg-[url('cloudsBG.jpg')] bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 text-white dark:text-textdark">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          3 disciplines
        </h2>
        <div className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 flex w-full justify-between">
          <h3> Pole Dance</h3>
          <h3> Aerial Hoop</h3>
          <h3> Contorsion</h3>
        </div>
        <div className="my-5">
          Head on over to the discipline of your choice to get started!
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 gap-10">
          <button
            onClick={() => navigate("/login")}
            className="bg-main dark:bg-maindark px-10 py-3 rounded-md text-white font-semibold hover:bg-white dark:hover:bg-white hover:text-text"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border border-white dark:border-textdark px-10 py-3 rounded-md text-white font-semibold hover:text-main hover:border-main dark:hover:border-main"
          >
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
