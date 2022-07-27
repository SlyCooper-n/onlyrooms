import { PageContainer } from "@components/layouts";
import { Logo } from "@components/widgets";
import { NextPage } from "next";
import { useRouter } from "next/router";

const LiveRoom: NextPage = () => {
  const router = useRouter();
  // const {} = useRoom(router.query.live_roomID);

  return (
    <PageContainer headTitle="OnlyRooms | Live Room">
      <Logo />
    </PageContainer>
  );
};

export default LiveRoom;
