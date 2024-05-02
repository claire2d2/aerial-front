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
