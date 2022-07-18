import React from "react";
import { NextPage } from "next";
import Page from "components/Layouts/Page";
import SEO from "components/single/SEO";

const About: NextPage = () => {
  return (
    <Page>
      <SEO title="About" />
      <h1 className="text-3xl font-semibold dark:text-zinc-300">
        This is <span className="text-blue-500">The Best</span> blog
      </h1>
      <p className="dark:text-zinc-400 mt-2">
        Everything you see here is the best. And will be the best in future too
        😎
      </p>
    </Page>
  );
};

export default About;
