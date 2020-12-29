import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./SearchInput.module.css";

type Props = {
  placeholder: string;
};

const SearchInput: React.FC<Props> = ({ placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <SearchIcon color="inherit" />
      <input type="text" className={styles.input} placeholder={placeholder} />
    </div>
  );
};

export default SearchInput;
