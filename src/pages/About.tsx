const About = () => {
  return (
    <div className="h-full w-full flex flex-col items-center text-center gap-5 justify-center px-5">
      <h1 className="font-extrabold text-4xl">About</h1>
      <div>
        This website is the final project for the 262 Ironhack Web Development
        Cohort.
      </div>
      <div>
        Developed by{" "}
        <a
          className="underline"
          href="https://www.linkedin.com/in/claireyuansong/"
        >
          yours truly.
        </a>
      </div>
      <div>
        <p>Links to my Github repos:</p>
        <ul className="underline">
          <li>
            <a href="https://github.com/claire2d2/aerial-front">Front end</a>
          </li>
          <li>
            <a href="https://github.com/claire2d2/aerial-backend">Back end</a>
          </li>
        </ul>
      </div>
      <div>
        All the figure images on this website are not mine, and due credit has
        been given on the concerned parties.
      </div>
    </div>
  );
};

export default About;
