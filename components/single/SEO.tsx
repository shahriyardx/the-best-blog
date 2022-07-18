import Head from "next/head";
import React from "react";

type Props = {
  title?: string
  description?: string
  keywords?: string
  author?: string
}

const SEO = ({ title, description, keywords, author }: Props ) => {
  const _title = title ? `${title} - The Best` : "The Best - By the best for the best";
  const _description =
    description ||
    "The best is the best blogging platform for developers by developers";
  const _keywords =
    keywords || "";
  const _author = author || "The Best";
  return (
    <Head>
      <title>{_title}</title>
      <meta name="title" content={_title} />
      <meta name="description" content={_description} />
      <meta name="author" content={_author} />
      <meta name="keywords" content={_keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />

      <meta property="twitter:title" content={_title} />
      <meta property="twitter:description" content={_description} />
    </Head>
  );
};

export default SEO;