import { useAuth, useRoom } from "@core/hooks";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface AdminGuardProps {
  roomID: string;
  children: ReactNode | ReactNode[];
}

export const AdminGuard = ({ roomID, children }: AdminGuardProps) => {
  const { user, loading } = useAuth();
  const { createdBy } = useRoom(roomID);
  const router = useRouter();

  while (loading) {
    return null;
  }

  const isAdmin = createdBy === user?.id;

  if (!isAdmin) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
};
