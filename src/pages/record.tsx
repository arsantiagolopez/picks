import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { Record } from "../components/Record";

const RecordPage: NextPage = () => (
  <>
    <Head>
      <title>Record to Date | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Record />
    </Layout>
  </>
);

export default RecordPage;
