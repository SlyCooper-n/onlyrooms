import { PageContainer, PageLayout } from "@components/layouts";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer headTitle="OnlyRooms | Home">
      <PageLayout navbar>
        <h1>Home</h1>
      </PageLayout>
    </PageContainer>
  );
};

export default Home;
