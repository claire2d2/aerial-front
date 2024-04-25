import React, { useState, useEffect, useRef } from "react";
import aerialApi from "../../service/aerialApi";
import useUser from "../../context/useUser";
import { faveType } from "../Types";
import { fetchFaves } from "../PagesComponents/FiguresFunctions";

import LogInModal from "./LogInModal";
import { HiHeart } from "react-icons/hi2";

type FavoriteButtonProps = {
  fullButton: boolean;
  figId: string;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  fullButton,
  figId,
}) => {
  const { isLoggedIn } = useUser();
  const [faves, setFaves] = useState<faveType[]>([]);
  const [isFave, setIsFave] = useState<boolean>(false);

  // check whether figure is already in favorites or not
  useEffect(() => {
    fetchFaves(setFaves);
  }, [isLoggedIn]);

  useEffect(() => {
    if (faves?.find((fave) => fave.figure._id === figId)) {
      setIsFave(true);
    }
  }, [faves]);

  // add or remove figure from favorite when clicking on the button
  async function handleFavorite(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault;
    if (!isLoggedIn) {
      openLogInModal();
      return;
    }
    if (isFave) {
      setIsFave(false);
      removeFave();
    } else {
      setIsFave(true);
      makeFave();
    }
  }
  // delete favorite article from backend
  async function removeFave() {
    try {
      await aerialApi.delete(`/favorites/${figId}`);
    } catch (error) {
      console.log(error);
    }
    fetchFavorites();
  }
  // add favorite article to backend
  async function makeFave() {
    try {
      await aerialApi.post(`/favorites/${figId}`);
    } catch (error) {
      console.log(error);
    }
    fetchFavorites();
  }

  // dialog that opens if user that isn't logged in clicks on favorite
  const logInModal = useRef<HTMLDialogElement | null>(null);

  function openLogInModal() {
    logInModal.current?.showModal();
  }

  function closeLogInModal() {
    logInModal.current?.close();
  }
  return (
    <div className="w-full">
      {fullButton ? (
        <button
          onClick={(e) => handleFavorite(e)}
          className={`w-full flex  justify-center gap-2 items-center rounded-lg px-1 py-2 border text-lg font-semibold shadow-sm ${
            isFave
              ? "border-gray text-main bg-white dark:bg-opacity-60"
              : "border-disabled text-gray dark:text-gray dark:bg-white dark:bg-opacity-10 "
          }`}
        >
          <HiHeart
            className={`text-2xl ${isFave ? "text-isFave" : "text-disabled"}`}
          />
          Favorite
        </button>
      ) : (
        <button>Button without text</button>
      )}
      <dialog ref={logInModal} className="no-scrollbar">
        <LogInModal closeModal={closeLogInModal} />
      </dialog>
    </div>
  );
};

export default FavoriteButton;
