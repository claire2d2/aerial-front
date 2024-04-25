import useUser from "../context/useUser";
const Contact = () => {
  const { user } = useUser();
  return (
    <div className="h-full w-full flex flex-col items-center text-center gap-5 justify-center px-5">
      <h1 className="font-extrabold text-4xl">Contact</h1>
      <div>
        As this website is an ongoing project, and has been initially developed
        under two weeks by one person (and pobody's nerfect!), there may have
        been some things that have been overlooked or great ideas that have not
        yet been thought of.
      </div>
      <div>
        Please note that the following form is not yet functional, but we'll get
        it working ASAP!
      </div>
      <form action="" className="flex flex-col">
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="bg-transparent border rounded-lg border-disabled text-text dark:text-textdark placeholder:pl-2 pl-2"
        />
        <label htmlFor="email">Email</label>
        {user?.email ? (
          <div className="bg-transparent border rounded-lg border-disabled text-text dark:text-textdark placeholder:pl-2 pl-2">
            {user.email}
          </div>
        ) : (
          <input
            type="email"
            className="bg-transparent border rounded-lg border-disabled text-text dark:text-textdark placeholder:pl-2 pl-2"
          />
        )}
        <label htmlFor="contact">Why are you contacting us?</label>
        <select
          name="contact"
          id="contact"
          className="bg-transparent border rounded-lg border-disabled text-text dark:text-textdark placeholder:pl-2 pl-2"
        >
          <option value="issue">I'm encountering an issue</option>
          <option value="idea">Idea for a new feature</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="message">Message:</label>
        <textarea
          name=""
          id=""
          className="bg-transparent border rounded-lg border-disabled text-text dark:text-textdark placeholder:pl-2 pl-2"
        ></textarea>
      </form>
    </div>
  );
};

export default Contact;
