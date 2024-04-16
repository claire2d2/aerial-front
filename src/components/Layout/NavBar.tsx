import DarkLightToggle from "./DarkLightToggle";

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
  return (
    <nav>
      This is ze navbar
      <DarkLightToggle />
    </nav>
  );
};

export default NavBar;
