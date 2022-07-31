import { useRouter } from "next/router";
import { ReactNode } from "react";

interface AdminGuardProps {
  userId: string | undefined;
  roomCreatorId: string;
  roomID: string;
  children: ReactNode | ReactNode[];
}

export const AdminGuard = ({
  userId,
  roomCreatorId,
  roomID,
  children,
}: AdminGuardProps) => {
  const router = useRouter();

  // if (roomCreatorId !== userId) {
  //   router.push(`/rooms/live-rooms/${roomID}`);
  //   return null;
  // }

  return <>{children}</>;
};
