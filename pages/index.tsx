import { PageContainer, PageLayout } from "@components/layouts";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer headTitle="OnlyRooms | Home">
      <PageLayout navbar footer>
        <div className="absolute top-0 w-screen h-screen brightness-[0.13]" />

        <style>{`
          div.absolute.top-0.w-screen.h-screen {
            background-image: linear-gradient(
              45deg,
              rgb(42, 48, 60) 50%,
              rgb(217, 38, 169)
            );
          }
        `}</style>

        <main className="flex-1 container z-[1]">
          <section className="min-h-[calc(100vh-3rem)] py-12 flex flex-col justify-center">
            <div className="">
              <h2 className="mb-2 text-3xl lg:text-5xl text-white font-bold">
                Chat and Q&amp;A rooms <br /> for everybody
              </h2>

              <h3>
                Made just for fun! Enjoy a unique platform built for you, <br />{" "}
                with love by a single student
              </h3>
            </div>
          </section>
        </main>
      </PageLayout>
    </PageContainer>
  );
};

export default Home;
