import aerialApi from "../../../service/aerialApi";
import { SetStateAction } from "react";

export function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDate(date: Date): string {
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}${suffix} of ${month} ${year}`;
}

export type logType = {
  _id: string;
  owner: string;
  content: string;
  date: string;
  image: string;
};

export async function fetchLogData(
  setLogs: React.Dispatch<SetStateAction<logType[]>>,
  currFigId: string
) {
  try {
    const response = await aerialApi.get(`/logs/${currFigId}`);
    setLogs(response.data);
  } catch (error) {
    console.log(error);
  }
}

export const datePickerTheme = {
  root: {
    base: "relative flex-1 justify-center w-full",
  },
  popup: {
    header: {
      selectors: {
        button: { base: "golden" },
      },
    },
    root: {
      base: "absolute top-10 z-50 block pt-2 ",
      inline: "relative top-0 z-auto",
      inner:
        "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-bgmaindark ",
    },
    view: {
      base: "p-1",
    },
    footer: {
      base: "mt-2 flex space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium ",
        today:
          "bg-cyan-700 text-text hover:bg-bghover dark:bg-textdark dark:hover:bg-gray",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-bghover dark:border-gray-600 dark:bg-bgmaindark dark:text-white dark:hover:bg-gray-600",
      },
    },
  },
  views: {
    days: {
      header: {
        base: "mb-1 grid grid-cols-7",
        title:
          "h-6 text-center text-sm font-medium leading-6 dark:text-textdark",
      },
      items: {
        base: "grid w-64 grid-cols-7 ",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100  hover:text-golden ",
          selected: "bg-main text-white dark:bg-maindark",
          disabled:
            "text-disabled dark:text-darkgray hover:text-disabled hover:cursor-default",
        },
      },
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9",
          selected: "bg-main text-white dark:bg-maindark",
          disabled:
            "text-disabled dark:text-darkgray hover:text-disabled hover:cursor-default",
        },
      },
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-main text-white dark:bg-maindark",
          disabled:
            "text-disabled dark:text-darkgray hover:text-disabled hover:cursor-default",
        },
      },
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-main text-white dark:bg-maindark",
          disabled:
            "text-disabled dark:text-darkgray hover:text-disabled hover:cursor-default",
        },
      },
    },
  },
};
