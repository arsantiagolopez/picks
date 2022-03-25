import Head from "next/head";
import React from "react";
import { AdminDashboard } from "../../components/AdminDashboard";
import { Layout } from "../../components/Layout";
import { ProtectedPage } from "../../types";

interface Props {}

const AdminPage: ProtectedPage<Props> = () => (
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

AdminPage.isProtected = true;

export default AdminPage;
