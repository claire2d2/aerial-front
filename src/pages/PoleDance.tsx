import { useState, useEffect } from "react";
import useUser from "../context/useUser";
import { fetchFigures } from "../components/PagesComponents/FiguresFunctions";
import { figType } from "../components/Types";

// style imports
import FeatureButton from "../components/PagesComponents/PoleDancePage/FeatureButton";

const PoleDance = () => {
  const { currDiscipline } = useUser();
  const [poleFigs, setPoleFigs] = useState<figType[]>([]);
  useEffect(() => {
    if (currDiscipline) {
      fetchFigures(currDiscipline._id, setPoleFigs, [], []);
    }
  }, [currDiscipline]);

  return (
    <div className="flex flex-col w-full h-auto items-center text-center overflow-scroll no-scrollbar">
      <div className="Header relative w-full flex flex-col gap-5 h-64 lg:h-80  items-center justify-center">
        <img
          src="/poleDanceBg.jpg"
          alt=""
          className="object-cover h-full w-full brightness-60"
        />
        <h1 className="PageTitle absolute text-6xl text-white font-display bg-contain font-extrabold">
          Pole Dance
        </h1>
      </div>
      <div className="PoleDescr flex flex-col gap-5 lg:h-90 bg-main dark:bg-maindark text-white py-10 px-10 lg:text-xl font-medium">
        <p>
          Often associated with strippers, and with reason, as the discipline
          has been enriched and made popular by the stripper community in the
          last decades, modern pole dance now offers people a large variety in
          ways to <span className="font-bold">express yourself.</span>
        </p>
        <p>
          This website will mainly focus on{" "}
          <span className="font-bold">pole fitness</span>, but feel free to use
          the features made available for inspiration on other aspects of your
          pole journey if you deem them useful!
        </p>
      </div>
      <div
        className="w-full bg-cover text-white py-2 lg:py-4 flex-col flex gap-2 lg:gap-4"
        style={{
          backgroundImage: "url('cloudsBG.jpg')",
        }}
      >
        <h2 className="font-bold text-4xl">Features</h2>
        <p className="lg:text-xl">
          The website currently regroups{" "}
          <span className="font-bold text-bgmainlight">{poleFigs?.length}</span>{" "}
          figures for pole dance, but we are working hard on enriching our
          database!
        </p>

        <div className="lg:h-40 w-full flex flex-col lg:flex-row">
          <FeatureButton title="Keep a tab on your training" link="figures">
            Track the figures you wish to train, are currently training or have
            already mastered
          </FeatureButton>
          <FeatureButton title="Generate a random combo" link="combo-generator">
            For when you have no inspiration. And save that combo if you end up
            liking it!
          </FeatureButton>
          <FeatureButton
            title="Save all your combos in one place"
            link="combos"
          >
            Create a new combo and find all the combos you previously saved.
          </FeatureButton>
        </div>
      </div>

      <div
        className=" hidden lg:block w-full bg-main dark:bg-maindark text-white bg-cover"
        style={{
          backgroundImage: "url('cloudsBG.jpg')",
        }}
      >
        <div className="bg-main dark:bg-maindark h-24 text-center flex flex-col items-center justify-center font-semibold gap-2 text-xl">
          <p>Figures are currently sorted into</p>
          <span className="font-semibold text-2xl text-bgmainlight">
            three levels of difficulty
          </span>
        </div>
        <div className="flex flex-col lg:flex-row py-4 items-center px-3 gap-2 justify-center">
          <h4 className="lg:basis-1/4 text-3xl font-bold h-full py-2">
            Beginner
          </h4>
          <div className="lg:basis-3/4 text-left bg-white text-main py-2 font-medium px-3 dark:bg-bgmaindark dark:text-textdark rounded-lg">
            This level regroups all the basic figures from your classic step
            around to baby inversions such as the inverted crucifix. You don't
            need your V in order to achieve these figures (although you could
            try for the fun of it!). Even though these figures are simpler than
            most, it can still be a challenge to execute them gracefully and
            with control. They can also make up for perfect transitions between
            harder figures.
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-4 items-center px-3 gap-2 justify-center">
          <h4 className="lg:basis-1/4 text-3xl font-bold py-2">Intermediate</h4>
          <div className="lg:basis-3/4 text-left bg-white text-main py-2 font-medium px-3 dark:bg-bgmaindark dark:text-textdark rounded-lg">
            Things are starting to get tougher! You will find more inversions at
            this level and your core will definitely feel more challenged. You
            will find figures such as the brass monkey, allegra, inside leg hang
            ...
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-4 items-center px-3 gap-2 justify-center">
          <h4 className="lg:basis-1/4 text-3xl font-bold py-2">Advanced</h4>
          <div className="lg:basis-3/4 text-left bg-white text-main py-2 font-medium px-3 dark:bg-bgmaindark dark:text-textdark rounded-lg">
            These figures will test your core strength and/or your flexibility,
            and are not to be attempted without a solid foundation in both, to
            avoid any potential injury! You wouldn't want to miss pole sessions
            because of an injury now, do you?
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoleDance;
