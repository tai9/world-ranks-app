import { GetStaticProps } from "next";
import React from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

type Props = {
  countries?: [];
};

const Home: React.FC<Props> = ({ countries }) => {
  return (
    <Layout title="World Ranks">
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput placeholder="Filter by Name, Region or SubRegion" />

      <CountriesTable countries={countries} />
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
