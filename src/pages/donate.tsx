import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Donate } from "../components/Donate";
import { Layout } from "../components/Layout";

const DonatePage: NextPage = () => (
  <>
    <Head>
      <title>Donate | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Donate />
    </Layout>
  </>
);

export default DonatePage;
