import Head from "next/head";
import React from "react";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Layout } from "../../components/Layout";
import { AdminPage } from "../../types";

interface Props {}

const AdminPage: AdminPage<Props> = () => (
  <>
    <Head>
      <title>Dashboard | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <AdminDashboard />
    </Layout>
  </>
);

AdminPage.isAdmin = true;

export default AdminPage;
