import { SetStateAction } from "react";
import { figType } from "../../Types";

export type formStateType = {
  name: string;
  discipline: string;
  figures: figType[];
  comment: string;
};

// handle combo name change
export function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  formState: formStateType,
  setFormState: React.Dispatch<SetStateAction<formStateType>>
) {
  const key = e.currentTarget.id;
  const value = e.currentTarget.value;
  setFormState({ ...formState, [key]: value });
}

// handle adding a figure to the combo
export function handleAddFigure(
  newFig: figType,
  formState: formStateType,
  setFormState: React.Dispatch<SetStateAction<formStateType>>
) {
  if (formState.figures.length < 7) {
    const copy = formState.figures;
    copy.push(newFig);
    setFormState({ ...formState, figures: copy });
  }
}

// handle removing a figure from the combo
export function removeFigure(
  index: number,
  formState: formStateType,
  setFormState: React.Dispatch<SetStateAction<formStateType>>
) {
  console.log("click");
  if (formState.figures.length > 1) {
    const copy = formState.figures;
    copy.splice(index, 1);
    setFormState({ ...formState, figures: copy });
  }
  console.log(formState.figures);
}

// handle figure changes individually
export function handleFigureChange(
  index: number,
  newFig: figType,
  formState: formStateType,
  setFormState: React.Dispatch<SetStateAction<formStateType>>
) {
  const newFigures = formState.figures.map((fig, i) =>
    i === index ? newFig : fig
  );
  setFormState({ ...formState, figures: newFigures });
}
