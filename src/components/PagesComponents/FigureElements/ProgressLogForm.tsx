import React, { useState, ChangeEvent, FormEvent, SetStateAction } from "react";
import useUser from "../../../context/useUser";
import aerialApi from "../../../service/aerialApi";
import { logType, fetchLogData } from "./OneFigureStyles";

type formStateType = {
  content: string;
  date: string;
};

type formProps = {
  currFigId: string;
  setLogs: React.Dispatch<SetStateAction<logType[]>>;
};

const ProgressLogForm: React.FC<formProps> = ({ currFigId, setLogs }) => {
  const { user } = useUser();
  // initialize form to be empty at first
  const [formState, setFormState] = useState<formStateType>({
    date: Date(),
    content: "",
  });

  const [file, setFile] = useState<File | null>(null);
  // change the form state when user inputs
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  }
  // sends the log to the server when form is submitted
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (user) {
        const fd = new FormData();
        fd.append("date", formState.date);
        fd.append("content", formState.content);
        if (file) {
          fd.append("image", file);
        }
        const response = await aerialApi.post(`/logs/${currFigId}`, fd);
        if (response.status === 400) {
          console.log(response.data.message);
        }
      }
      fetchLogData(setLogs, currFigId);
    } catch (error) {
      console.log(error);
      //TODO show error message with what is wrong
    }
    setFormState({
      date: Date(),
      content: "",
    });
    setFile(null);
  }
  const { date, content } = formState;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 text-main dark:text-textdark px-3 lg:px-5"
    >
      <label htmlFor="date" className="font-semibold ">
        Date
      </label>
      <div className="relative">
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleChange}
          max={new Date().toJSON().slice(0, 10)}
        />
      </div>
      <label htmlFor="content" className="font-semibold">
        Comment
      </label>
      <textarea
        id="content"
        value={content}
        onChange={handleChange}
        maxLength={200}
        className="h-32 border-gray border  bg-transparent rounded-lg"
      />
      <label htmlFor="file" className="font-semibold">
        Add a photo
      </label>
      <input
        id="file"
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.currentTarget.files) {
            setFile(e.currentTarget.files[0]);
          }
        }}
        className=""
      />
      <button
        disabled={content === ""}
        className="disabled:bg-disabled bg-main dark:bg-maindark rounded-lg hover:bg-bghover text-white"
      >
        Add log
      </button>
    </form>
  );
};

export default ProgressLogForm;
