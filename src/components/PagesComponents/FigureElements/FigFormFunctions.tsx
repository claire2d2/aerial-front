import { ChangeEvent, SetStateAction } from "react";
import { figFormType } from "../../Types";

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
export async function handleZoneChange(
  e: ChangeEvent<HTMLInputElement>,
  setFormState: SetFormState
) {
  const { checked, value } = e.target;
  if (checked) {
    setFormState((prevFormState) => ({
      ...prevFormState,
      focus: [...prevFormState.focus, value],
    }));
  } else {
    setFormState((prevState) => ({
      ...prevState,
      focus: prevState.focus.filter((zone) => zone !== value),
    }));
  }
}
