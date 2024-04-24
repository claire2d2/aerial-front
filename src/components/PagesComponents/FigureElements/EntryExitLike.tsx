import { useState, useEffect } from "react";
import useUser from "../../../context/useUser";
import aerialApi from "../../../service/aerialApi";
import { like, unLike } from "../FiguresFunctions";
import { likeType } from "../../Types";
import { HiOutlineThumbUp } from "react-icons/hi";

type EntryExitLikeProps = {
  propId: string;
};

const EntryExitLike: React.FC<EntryExitLikeProps> = ({ propId }) => {
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [allLikes, setAllLikes] = useState<likeType[] | null>(null);
  const [nbLikes, setNbLikes] = useState<number>(0);

  useEffect(() => {
    getLikes();
  }, [isLiked]);

  useEffect(() => {
    if (allLikes) {
      const checkIfLiked = allLikes.find((like) => like.follower === user?._id);
      if (checkIfLiked) {
        setIsLiked(true);
      }
      setNbLikes(allLikes.length);
    }
  }, [allLikes]);

  async function getLikes() {
    try {
      const response = await aerialApi.get(`/entriesexits/likes/${propId}`);
      setAllLikes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = () => {
    console.log("click!");
    if (!isLiked) {
      like(propId);
    } else {
      unLike(propId);
    }
    getLikes();
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex gap-2 items-center">
      <div>{nbLikes}</div>
      <button
        onClick={() => handleLike()}
        className={`${isLiked ? "text-isFave" : "text-text"}`}
      >
        <HiOutlineThumbUp />
      </button>
    </div>
  );
};

export default EntryExitLike;
