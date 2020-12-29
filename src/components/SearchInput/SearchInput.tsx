import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./SearchInput.module.css";

type Props = {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<Props> = ({ placeholder, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <SearchIcon color="inherit" />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
