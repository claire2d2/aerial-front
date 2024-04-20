import React, { useState } from "react";

const PoleDance = () => {
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
      <div className="basis-1/6 w-full flex items-center justify-center bg-mainlight">
        <h1>Pole Dance</h1>
      </div>

      <div className="basis-1/6 w-full">
        <h2>About Pole Dance</h2>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laborum
          magnam, natus sequi, pariatur eius neque magni facere reiciendis odio
          et recusandae non enim quia, porro in id fugiat itaque.
        </div>
      </div>
      <div className="basis-2/3 w-full">
        You will currently find on this website three levels of difficulty. To
        know more about what each level entails, please click on the
        corresponding card to reveal details.
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
    </div>
  );
};

export default PoleDance;
