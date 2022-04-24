import Head from "next/head";
import React from "react";
import { AddParlay } from "../../components/AddParlay";
import { Layout } from "../../components/Layout";
import { AdminPage } from "../../types";

interface Props {}

const NewParlayPage: AdminPage<Props> = () => (
  <>
    <Head>
      <title>Create a Parlay | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <AddParlay />
    </Layout>
  </>
);

NewParlayPage.isAdmin = true;

export default NewParlayPage;
