import Head from "next/head";
import React from "react";
import { AddNewPick } from "../../components/AddNewPick";
import { Layout } from "../../components/Layout";
import { ProtectedPage } from "../../types";

interface Props {}

const NewPickPage: ProtectedPage<Props> = () => (
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

NewPickPage.isProtected = true;

export default NewPickPage;
