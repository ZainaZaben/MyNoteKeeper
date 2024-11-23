import { useContext, useState, useEffect } from "react";
import { NoteAppContext } from "../../context/NoteAppContext";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./Search.module.css";

export default function Search() {
  const { searchTerm, setSearchTerm } = useContext(NoteAppContext);
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 250);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, setSearchTerm]);

  return (
    <div className={classes["search-container"]}>
      <div className={classes["search-bar"]}>
        <SearchIcon className={classes["search-icon"]} />
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
