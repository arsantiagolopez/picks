import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../../components/Layout";
import { PastTournaments } from "../../components/PastTournaments";

const PastPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Past Tournaments | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PastTournaments />
      </Layout>
    </>
  );
};

export default PastPage;
