import type { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { Register } from "../components/Register";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const RegisterPage: NextPage<Props> = ({ providers }) => {
  const registerProps = { providers };

  return (
    <>
      <Head>
        <title>Register | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Register {...registerProps} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default RegisterPage;
