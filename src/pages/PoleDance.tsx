import React, { useState, useEffect } from "react";
import { fetchFigures } from "../components/PagesComponents/FiguresFunctions";
import { figType } from "../components/Types";

// style imports
import FeatureButton from "../components/PagesComponents/PoleDancePage/FeatureButton";

const PoleDance = () => {
  const [poleFigs, setPoleFigs] = useState<figType[]>([]);
  useEffect(() => {
    fetchFigures("pole", setPoleFigs, [], []);
  }, []);

  // use state for styling
  const [showBeginner, setShowBeginner] = useState<boolean>(false);
  const [showIntermediate, setShowIntermediate] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  function handleShow(
    e: React.MouseEvent<HTMLElement>,
    showState: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    e.preventDefault;
    if (showState) {
      setShow(false);
    } else {
      setShow(true);
    }
  }
  return (
    <div className="flex flex-col w-full h-full items-center text-center overflow-scroll no-scrollbar">
      <div className="Header relative w-full flex flex-col gap-5 h-64 lg:h-80  items-center justify-center">
        <img
          src="/poleDanceBg.jpg"
          alt=""
          className="object-cover h-full w-full brightness-60"
        />
        <h1 className="PageTitle absolute text-6xl text-white font-display bg-contain">
          Pole Dance
        </h1>
      </div>
      <div className="PoleDescr flex flex-col gap-5 lg:h-90 bg-main text-white py-10">
        <p>
          Often associated with strippers, and with reason, as the discipline
          has been enriched and made popular by the stripper community in the
          last decades, modern pole dance now offers people a large variety in
          ways to express yourself.
        </p>
        <p>
          This website will mainly focus on{" "}
          <span className="font-semibold">pole fitness</span>, but feel free to
          use the features made available for inspiration on other aspects of
          your pole journey if you deem them useful!
        </p>
      </div>
      <div className="w-full">
        <h2>Features</h2>
        <p>
          The website currently regroups {poleFigs?.length} figures for pole
          dance, but we are working hard on enriching our database! Feel free to
          give us suggestion here (TO DO : add contact form)
        </p>
        <p>With these figures, you may:</p>
        <div className="lg:h-40 bg-main w-full flex ">
          <FeatureButton title="Keep a tab on your training" link="figures">
            Track the figures you wish to train, are currently training or have
            already mastered
          </FeatureButton>
          <FeatureButton title="Generate a random combo">
            For when you have no inspiration. And save that combo if you end up
            liking it!
          </FeatureButton>
          <FeatureButton title="Save all your combos in one place">
            Create a new combo and find all the combos you previously saved.
          </FeatureButton>
        </div>
      </div>

      <div className="lg:h-60 w-full">
        <p>Figures are currently sorted into three levels of difficulty</p>{" "}
        <p>
          To know more about what each level entails, please click on the
          corresponding card to reveal details.
        </p>
        <div className="flex flex-col h-5/6 lg:flex-row">
          <div className={` basis-1/3 w-full bg-golden`}>
            <button
              className="group h-full w-full"
              onClick={(e) => handleShow(e, showBeginner, setShowBeginner)}
            >
              <h4 className={`${showBeginner ? "text-xl" : "text-4xl"}`}>
                Beginner
              </h4>
              <div className={`${showBeginner ? "block" : "hidden"}`}>
                This level regroups all the basic figures from your classic step
                around to baby inversions such as the inverted crucifix. You
                don't need your V in order to achieve these figures (although
                you could try for the fun of it!). Even though these figures are
                simpler than most, it can still be a challenge to execute them
                gracefully and with control. They can also make up for perfect
                transitions between harder figures.
              </div>
            </button>
          </div>
          <button
            className="basis-1/3 h-full w-full"
            onClick={(e) =>
              handleShow(e, showIntermediate, setShowIntermediate)
            }
          >
            <h4 className={`${showIntermediate ? "text-xl" : "text-4xl"}`}>
              Intermediate
            </h4>
            <div className={`${showIntermediate ? "block" : "hidden"}`}>
              Things are starting to get tougher! You will find more inversions
              at this level and your core will definitely feel more challenged.
              You will find figures such as the brass monkey, allegra, inside
              leg hang ...
            </div>
          </button>
          <button
            className="basis-1/3 h-full w-full"
            onClick={(e) => handleShow(e, showAdvanced, setShowAdvanced)}
          >
            <h4 className={`${showAdvanced ? "text-xl" : "text-4xl"}`}>
              Advanced
            </h4>
            <div className={`${showAdvanced ? "block" : "hidden"}`}>
              These figures will test your core strength and/or your
              flexibility, and are not to be attempted without a solid
              foundation in both, to avoid any potential injury! You wouldn't
              want to miss pole sessions because of an injury now, do you?
            </div>
          </button>
        </div>
      </div>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
        distinctio quas voluptate saepe commodi ea tempora. Sunt fugiat soluta
        sapiente inventore eligendi, quibusdam, est sint officiis perferendis
        ipsam voluptates expedita.
      </div>
    </div>
  );
};

export default PoleDance;
