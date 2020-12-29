import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout/Layout";
import { CountryProps } from "../../components/CountriesTable/CountriesTable";

const Country = ({ country }) => {
  return <Layout title={country.name}>Country</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );
  const country: CountryProps = await res.json();

  return {
    props: {
      country,
    },
  };
};

export default Country;
