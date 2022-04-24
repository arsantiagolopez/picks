import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../../components/Layout";
import { UpdateParlay } from "../../components/UpdateParlay";

const UpdatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Update Parlay | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UpdateParlay />
      </Layout>
    </>
  );
};

export default UpdatePage;
