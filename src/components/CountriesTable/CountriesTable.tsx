import React, { useState } from "react";
import styles from "./Countries.module.css";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";

export type Props = {
  countries?: CountryProps[];
};

export type CountryProps = {
  name: string;
  population: number;
  capital: string;
  region: string;
  subregion: string;
};

type DirectionType = "asc" | "desc";
type CountryType = "name" | "population";

type SortArrowProps = { sort: DirectionType };

const orderBy = (
  countries: CountryProps[],
  value: CountryType,
  direction: DirectionType
) => {
  return direction === "asc"
    ? [...countries].sort((a, b: CountryProps) =>
        a[value] > b[value] ? 1 : -1
      )
    : [...countries].sort((a, b: CountryProps) =>
        a[value] > b[value] ? -1 : 1
      );
};

const SortArrow = ({ sort }: SortArrowProps) => {
  return sort === "desc" ? (
    <div className={styles.heading_arrow}>
      <KeyboardArrowDownRoundedIcon color="inherit" />
    </div>
  ) : (
    <div className={styles.heading_arrow}>
      <KeyboardArrowUpRoundedIcon color="inherit" />
    </div>
  );
};

const CountriesTable: React.FC<Props> = ({ countries }) => {
  const [direction, setDirection] = useState<DirectionType>("desc");
  const [valueDirection, setValueDirection] = useState<CountryType>("name");
  const orderdCountries = orderBy(countries, valueDirection, direction);

  const switchDirection = () => {
    direction === "desc" ? setDirection("asc") : setDirection("desc");
  };

  const setValueAndDirection = (value: CountryType) => {
    setValueDirection(value);
    switchDirection();
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortArrow sort={direction} />
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow sort={direction} />
        </button>
      </div>

      {orderdCountries.map((country: CountryProps, index) => {
        return (
          <div className={styles.row} key={index}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesTable;
