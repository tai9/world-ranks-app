import React, { useState } from "react";
import styles from "./Countries.module.css";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import Link from "next/link";

export type CountriesProps = {
  countries?: CountryProps[];
};

export type CountryProps = {
  name: string;
  area: string;
  alpha3Code: string;
  borders: [];
  population: number;
  capital: string;
  region: string;
  subregion: string;
  flag: string;
  languages: [
    {
      name: string;
    }
  ];
  currencies: Array<{
    name: string;
  }>;
  nativeName: string;
  gini: string;
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

const CountriesTable: React.FC<CountriesProps> = ({ countries }) => {
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
          <Link key={index} href={`/country/${country.alpha3Code}`}>
            <div className={styles.row}>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>{country.population}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesTable;
