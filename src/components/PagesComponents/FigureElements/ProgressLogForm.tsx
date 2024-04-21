import React, { useState, ChangeEvent, FormEvent } from "react";
import useUser from "../../../context/useUser";
import aerialApi from "../../../service/aerialApi";
import { Datepicker } from "flowbite-react";
const datePickerTheme = {
  root: {
    base: "relative",
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block pt-2",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
    },
    header: {
      base: "",
      title:
        "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      selectors: {
        base: "mb-2 flex justify-between",
        button: {
          base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
          prev: "",
          next: "",
          view: "",
        },
      },
    },
    view: {
      base: "p-1",
    },
    footer: {
      base: "mt-2 flex space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
        today:
          "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
      },
    },
  },
  views: {
    days: {
      header: {
        base: "mb-1 grid grid-cols-7",
        title:
          "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
  },
};

type logType = {
  content: string;
  date: string;
};

type formProps = {
  currFigId: string;
  fetchLogData: () => void;
};

const ProgressLogForm: React.FC<formProps> = ({ currFigId, fetchLogData }) => {
  const { user } = useUser();
  // initialize form to be empty at first
  const [formState, setFormState] = useState<logType>({
    date: Date(),
    content: "",
  });

  const [file, setFile] = useState<File | null>(null);
  // change the form state when user inputs
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
      fetchLogData();
    } catch (error) {
      console.log(error);
      //TODO show error message with what is wrong
    }
  }
  const { date, content } = formState;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="font-bold">Add a new log</h3>
      <label htmlFor="date">Date</label>
      <Datepicker
        theme={datePickerTheme}
        id="date"
        value={date}
        onChange={() => handleChange}
        maxDate={new Date()}
      />
      <label htmlFor="content">Comment</label>
      <input
        id="content"
        type="text"
        value={content}
        onChange={handleChange}
        maxLength={200}
      />
      <label htmlFor="">Add a photo</label>
      <input
        id="file"
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.currentTarget.files) {
            setFile(e.currentTarget.files[0]);
          }
        }}
      />
      <button
        disabled={content === ""}
        className="disabled:bg-disabled bg-main"
      >
        Add log
      </button>
    </form>
  );
};

export default ProgressLogForm;