import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Landing } from "../components/Landing";
import { Layout } from "../components/Layout";

const IndexPage: NextPage = () => (
  <>
    <Head>
      <title>Home | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Landing />
    </Layout>
  </>
);

export default IndexPage;
