import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../../components/Layout";
import { TournamentTemplate } from "../../components/TournamentTemplate";

const TournamentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tournament | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <TournamentTemplate />
      </Layout>
    </>
  );
};

export default TournamentPage;
