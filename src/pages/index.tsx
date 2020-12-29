import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";

type Props = {
  countries?: [];
};

const Home: React.FC<Props> = ({ countries }) => {
  console.log(countries);

  return <Layout title="World Ranks">main</Layout>;
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
