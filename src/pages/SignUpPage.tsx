import aerialApi from "../service/aerialApi";
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../context/useUser";
import { AxiosError } from "axios";

import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

type figType = {
  id: string;
  name: string;
  ref: string;
  image: string;
  discipline: string;
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

type formType = {
  username: string;
  email: string;
  password: string;
  figures: figType[];
};

const SignUpPage = () => {
  // fetch figures
  const { allFigures } = useUser();

  // set states to handle form changes and submission
  const [formState, setFormState] = useState<formType>({
    email: "",
    username: "",
    password: "",
    figures: [],
  });

  //set states to show error from backend if something wrong with input
  const [errorMsg, setErrorMsg] = useState<string>("");

  const navigate = useNavigate();

  // change the form state when user inputs
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value, figures: allFigures });
  }

  /* function to handle form submission (=> user creation)
   ** if creation is successful, navigate to login page directly
   ** if unsuccessful, error message appears detailing why
   */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      console.log(formState);
      const response = await aerialApi.post("/auth/signup", formState);
      console.log(response);
      if (response.status === 201) {
        console.log("user created", response.data);
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Handle error if it is an instance of Error
        console.error(error);
        setErrorMsg(error.response?.data.message); // Use type assertion to access message property
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMsg("An unknown error occurred");
      }
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  }

  const { email, username, password } = formState;

  // styling
  const fieldStyle = "flex flex-col";
  const labelStyle = "font-semibold mb-2";
  const inputStyle =
    "shadow appearance-none border border-disabled rounded w-full py-2 px-3 text-inputfield leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div className="SignUpForm h-full lg:w-1/3 mx-auto lg:my-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-md h-2/3 w-full justify-between rounded px-8 pt-6 pb-8 my-10 mx-10 flex flex-col gap-3 bg-white dark:bg-opacity-10 dark:border dark:border-textdark"
      >
        <h2 className="font-bold text-center">Sign up</h2>
        <div className={fieldStyle}>
          <label htmlFor="email" className={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="username" className={labelStyle}>
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className={`${fieldStyle}`}>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <button
          disabled={email === "" || password === "" || username === ""}
          className="bg-main px-4 py-1 rounded-lg text-white font-bold drop-shadow-md disabled:bg-disabled"
        >
          Create account
        </button>
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline cursor-pointer">Log in!</span>
          </Link>
        </div>
      </form>
      {errorMsg !== "" ? (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{errorMsg}</div>
          <Toast.Toggle />
        </Toast>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignUpPage;
