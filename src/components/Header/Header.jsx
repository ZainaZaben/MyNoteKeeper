import classes from "./Header.module.css";
import Search from "../Search/Search";

export default function Header() {
  return (
    <nav className={classes.navbar}>
      <h1>My Note Keeper</h1>
      <div className={classes["search-container"]}>
        <Search />
      </div>
    </nav>
  );
}
