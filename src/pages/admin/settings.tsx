import Head from "next/head";
import React from "react";
import { Layout } from "../../components/Layout";
import { Settings } from "../../components/Settings";
import { AdminPage } from "../../types";

interface Props {}

const SettingsPage: AdminPage<Props> = () => (
  <>
    <Head>
      <title>Settings | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Settings />
    </Layout>
  </>
);

SettingsPage.isAdmin = true;

export default SettingsPage;
