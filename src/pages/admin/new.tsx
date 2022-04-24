import Head from "next/head";
import React from "react";
import { AddNewPick } from "../../components/AddNewPick";
import { Layout } from "../../components/Layout";
import { AdminPage } from "../../types";

interface Props {}

const NewPickPage: AdminPage<Props> = () => (
  <>
    <Head>
      <title>Add A Pick | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <AddNewPick />
    </Layout>
  </>
);

NewPickPage.isAdmin = true;

export default NewPickPage;
