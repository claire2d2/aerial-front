import DarkLightToggle from "./DarkLightToggle";
import useUser from "../../context/useUser";

//TODO : navbar for when user isn't logged in
// sign up
// log in

//TODO: navbar for when user is logged in
// on the right: profile picture in a small circle
// settings
// notifications?

//TODO: global search bar
// menu that opens sidebar on the left :
// homepage, combo generator, moves list, studio map,
// search bar to search a move

//TODO: styling, navbar that changes height when scrolling down and that appears when scrolling up

const NavBar = () => {
  const { isLoggedIn, user } = useUser();

  const showWhenLoggedOut = (
    <div className="flex gap-2">
      <div>Sign up</div>
      <div>Log In</div>
    </div>
  );

  const showWhenLoggedIn = (
    <div className="h-full p-1 flex justify-center items-center gap-2">
      <div>{user?.username}</div>
      <img src={user?.image} alt="" className="h-full object-cover" />
      //TODO add dropdown when clcking on the div
    </div>
  );

  return (
    <nav className="flex h-full justify-between text-white">
      <div>Air2D2</div>
      <div>{isLoggedIn ? showWhenLoggedIn : showWhenLoggedOut}</div>
      <div className="absolute">
        <DarkLightToggle />
      </div>
    </nav>
  );
};

export default NavBar;
