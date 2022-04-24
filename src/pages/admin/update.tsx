import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../../components/Layout";
import { UpdatePick } from "../../components/UpdatePick";

const UpdatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Update Pick | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UpdatePick />
      </Layout>
    </>
  );
};

export default UpdatePage;
