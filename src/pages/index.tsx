import { GetStaticProps } from "next";
import React, { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
import {
  Props,
  CountryProps,
} from "../components/CountriesTable/CountriesTable";

const Home: React.FC<Props> = ({ countries }) => {
  console.log(countries);

  const [keyword, setKeyword] = useState<string>("");

  const filterdCountries = countries.filter(
    (country: CountryProps) =>
      country.name.toLowerCase().includes(keyword) ||
      country.capital.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setKeyword(event.target.value);
  };

  return (
    <Layout title="World Ranks">
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput
        placeholder="Filter by Name, Capital, Region or SubRegion"
        onChange={handleChangeInput}
      />

      <CountriesTable countries={filterdCountries} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};

export default Home;
