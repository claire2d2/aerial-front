import aerialApi from "../service/aerialApi";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser";

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
    } catch (error) {
      console.log(error);
      //TODO show error message with what is wrong
    }
  }

  const { email, username, password } = formState;

  return (
    <div className="SignUpForm dark:text-white">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>Create account</button>
      </form>
    </div>
  );
};

export default SignUpPage;
