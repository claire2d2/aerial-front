import { useState, FormEvent } from "react";

type formType = {
  username: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [formState, setFormState] = useState<formType>({
    email: "",
    username: "",
    password: "",
  });

  function handleChange(e: FormEvent) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    console.log(value);
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  const { email, username, password } = formState;

  return (
    <div className="SignUpForm dark:text-white">
      <form>
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
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
