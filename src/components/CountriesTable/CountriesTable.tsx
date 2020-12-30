import React, { useState } from "react";
import styles from "./Countries.module.css";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import Link from "next/link";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  gini: number;
};

type DirectionType = "asc" | "desc";
type CountryType = "name" | "population" | "area" | "gini";

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
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {valueDirection === "name" && <SortArrow sort={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {valueDirection === "population" && <SortArrow sort={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {valueDirection === "area" && <SortArrow sort={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          {valueDirection === "gini" && <SortArrow sort={direction} />}
        </button>
      </div>

      {orderdCountries.map((country: CountryProps, index) => {
        return (
          <Link key={index} href={`/country/${country.alpha3Code}`}>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country.flag} alt={country.name} />
              </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>{country.population}</div>
              <div className={styles.area}>{country.area || 0}</div>
              <div className={styles.gini}>
                <LinearProgress
                  className={styles.gini_progress}
                  variant="determinate"
                  value={country.gini ?? 0}
                />
                <span>{country.gini || 0} %</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesTable;
