import aerialApi from "../service/aerialApi";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchFigures } from "../components/PagesComponents/FiguresFunctions";
import { AxiosError } from "axios";
import { figType } from "../components/Types";

// imports relative to styling
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import {
  fieldStyle,
  labelStyle,
  inputStyle,
  buttonStyle,
} from "../components/PagesComponents/AuthComponents/AuthStyle";

type formType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  figures: figType[];
};

const SignUpPage = () => {
  // set states to handle form changes and submission
  const [formState, setFormState] = useState<formType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    figures: [],
  });

  // fetch figures to create not seen states for the user
  const [figures, setFigures] = useState<figType[]>([]);
  useEffect(() => {
    fetchFigures(null, setFigures, [], []);
  }, []);

  //set states to show error from backend if something wrong with input
  const [errorMsg, setErrorMsg] = useState<string>("");

  const navigate = useNavigate();

  // change the form state when user inputs
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value, figures: figures });
  }

  /* function to handle form submission (=> user creation)
   ** if creation is successful, navigate to login page directly
   ** if unsuccessful, error message appears detailing why
   */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      formState.firstName === "" ||
      formState.lastName === "" ||
      password === ""
    ) {
      setErrorMsg("Please input all fields");
      return;
    }
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
    }
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  }

  const { email, firstName, lastName, password } = formState;

  return (
    <div
      className="h-full w-full bg-cover flex"
      style={{
        backgroundImage: "url('cloudsBG.jpg')",
      }}
    >
      <div
        className={`SignUpForm px-3 my-10 mx-auto lg:m-0 lg:p-0 lg:basis-1/2 flex flex-col justify-center bg-cover items-center`}
      >
        <form
          onSubmit={handleSubmit}
          className="h-auto py-10 lg:h-full w-full rounded-lg lg:rounded-none bg-white bg-opacity-60 px-10 flex flex-col justify-center gap-3"
        >
          <h2 className="font-bold text-center">Sign up</h2>
          <div className={fieldStyle}>
            <label htmlFor="email" className={labelStyle}>
              Email<span className="text-error mx-1">*</span>:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className={fieldStyle}>
            <label htmlFor="firstName" className={labelStyle}>
              First Name<span className="text-error mx-1">*</span>:
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className={fieldStyle}>
            <label htmlFor="lastName" className={labelStyle}>
              Last Name<span className="text-error mx-1">*</span>:
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className={`${fieldStyle}`}>
            <label htmlFor="password" className={labelStyle}>
              Password<span className="text-error mx-1">*</span>:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <button className={buttonStyle}>Create account</button>
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
      <div className="hidden lg:flex flex-col gap-3 text-white lg:w-1/2 px-20 justify-center">
        <div className="font-bold">
          Once you've signed up you wil be able to :
        </div>
        <p className="font-semibold">
          🐣 Log in{" "}
          <span className="font-light">
            (if signup is successful, you will be redirected to the homepage)
          </span>
        </p>
        <p className="font-semibold">
          {" "}
          🐣Navigate through all the figures at your disposal
        </p>
        <ul>
          <li>
            {" "}
            <span className="font-bold font-romantic text-xl">{" > "}</span>Keep
            track of your progress
          </li>
          <li>
            <span className="font-bold font-romantic text-xl">{" > "}</span>
            Propose transitions (entries and exits) for each figure
          </li>
          <li>
            <span className="font-bold font-romantic text-xl">{" > "}</span>
            Create and save combos with your favorite figures!
          </li>
        </ul>
        <p className="font-semibold">🐣 Set up user preferences</p>
        <p className="font-semibold">
          If you have questions at any point, feel free to contact us
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
