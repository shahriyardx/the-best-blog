import SEO from "components/single/SEO";
import Blogs from "components/sections/Blogs/Blogs";
import Page from "components/Layouts/Page";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Page>
      <SEO />
      <Blogs />
    </Page>
  );
};

export default Home;
