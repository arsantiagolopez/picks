import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { Testimonials } from "../components/Testimonials";

const TestimonialsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Testimonials | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Testimonials />
      </Layout>
    </>
  );
};

export default TestimonialsPage;
