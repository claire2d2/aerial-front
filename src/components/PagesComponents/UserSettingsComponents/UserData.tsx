import { useState, ChangeEvent } from "react";
import aerialApi from "../../../service/aerialApi";
import SaveButton from "../../GlobalComponents/SaveButton";
import { AxiosError } from "axios";
import useUser from "../../../context/useUser";

type passwordFormType = {
  currentPassword: string;
  newPassword: string;
};
const UserData = () => {
  const { logOut } = useUser();
  const [passwordForm, setPasswordForm] = useState<passwordFormType>({
    currentPassword: "",
    newPassword: "",
  });
  const [passChangeMsg, setPassChangeMsg] = useState<string>("");
  // change the form state when user inputs
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setPasswordForm({ ...passwordForm, [key]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await aerialApi.put(
        "/auth/changepassword",
        passwordForm
      );
      console.log(response.data);
      setPassChangeMsg("Password succesfully changed!");
    } catch (error) {
      if (error instanceof AxiosError) {
        setPassChangeMsg(error.response?.data.message);
      } else {
        setPassChangeMsg("An unknown error occurred. Please try again");
      }
    }
    setTimeout(() => {
      setPassChangeMsg("");
    }, 2000);
  }
  const { currentPassword, newPassword } = passwordForm;

  return (
    <div className="mx-5">
      <h3 className="font-bold">Change your password:</h3>
      <form className="flex flex-col w-1/2 my-5 gap-3">
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="currentPassword">Current password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            className="bg-transparent dark:border dark:border-gray rounded-md focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword">New password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            className="bg-transparent dark:border dark:border-gray rounded-md focus:ring-2"
          />
        </div>
        <SaveButton disabled={false} onClickFunction={handleSubmit}>
          Change password
        </SaveButton>
        <div className="absolute lg:top-60 lg:left-40 w-96 text-center text-text bg-white">
          {passChangeMsg}
        </div>
      </form>
      <div className="flex flex-col w-1/2 my-5 gap-3">
        <h3 className="font-bold">Sign out of your account : </h3>
        <SaveButton disabled={false} onClickFunction={logOut}>
          Log out
        </SaveButton>
      </div>
      <h3 className="font-bold">Your data:</h3>
      <div>
        For any questions regarding your account, you may fill in our contact
        form and we will get back to you shortly!
      </div>
    </div>
  );
};

export default UserData;
