import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import aerialApi from "../service/aerialApi";
import useUser from "../context/useUser";

type formType = {
  email: string;
  password: string;
};
const LogInPage = () => {
  const [formState, setFormState] = useState<formType>({
    email: "",
    password: "",
  });
  //TODO add errors
  const { storeToken, authenticateUser } = useUser();
  const navigate = useNavigate();

  // change the form state when user inputs

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  }

  /* function to handle form submission (=> user creation)
   ** if creation is successful, navigate to login page directly
   ** if unsuccessful, error message appears detailing why
   */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await aerialApi.post("/auth/login", formState);
      console.log(response);
      const token = response.data.authToken;
      if (response.status === 400) {
        console.log(response.data.message);
      }
      storeToken(token);
      await authenticateUser();
      if (response.status === 201) {
        console.log("user created", response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      //TODO show error message with what is wrong
    }
  }

  const { email, password } = formState;

  return (
    <div>
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
        <button>Log in</button>
      </form>
    </div>
  );
};

export default LogInPage;
