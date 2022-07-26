import { NextPage } from "next";
import { useRouter } from "next/router";

const LiveRoom: NextPage = () => {
  const route = useRouter();

  return <div>{route.query.live_questionsID}</div>;
};

export default LiveRoom;
