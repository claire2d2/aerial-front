import useUser from "../../context/useUser";
import { Link } from "react-router-dom";

type NavMenuLinkProps = {
  pageRef: string;
  children: React.ReactNode;
};

const NavMenuLink: React.FC<NavMenuLinkProps> = ({ pageRef, children }) => {
  const { currDiscipline } = useUser();
  const currentLinkPage = location.pathname.split("/")[2];

  return (
    <Link to={`/${currDiscipline?.ref}/${pageRef}`}>
      <span
        className={`capitalize w-full bg-golden ${
          currentLinkPage === pageRef ? "font-bold" : "font-normal"
        }`}
      >
        {children}
      </span>
    </Link>
  );
};

export default NavMenuLink;
