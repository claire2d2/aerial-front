import { ChangeEvent, SetStateAction } from "react";
import { figFormType } from "../Types";

type SetFormState = React.Dispatch<SetStateAction<figFormType>>;

// change the form state when user inputs
export async function handleChange(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  formState: figFormType,
  setFormState: SetFormState
) {
  const key = e.currentTarget.id;
  const value = e.currentTarget.value;
  setFormState({ ...formState, [key]: value });
}

// handle multiple values selection
export function handleZoneChange(
  e: ChangeEvent<HTMLInputElement>,
  formState: figFormType,
  setFormState: SetFormState
) {
  const { value } = e.target;
  const isChecked = formState.focus.includes(value); // Check if the zone is already included in the focus array
  setFormState((prevFormState) => ({
    ...prevFormState,
    focus: isChecked
      ? prevFormState.focus.filter((zone) => zone !== value) // If checked, remove the zone from the focus array
      : [...prevFormState.focus, value], // If unchecked, add the zone to the focus array
  }));
}
