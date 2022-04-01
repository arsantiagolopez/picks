import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { Stats } from "../components/Stats";

const StatsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stats | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Stats />
      </Layout>
    </>
  );
};

export default StatsPage;
