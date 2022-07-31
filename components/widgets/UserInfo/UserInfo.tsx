import { useAuth } from "@core/hooks";
import Image from "next/image";
import { CircleNotch } from "phosphor-react";

// TODO: Add user avatar fallback

export const UserInfo = () => {
  const { user, loading } = useAuth();

  if (loading)
    return <CircleNotch size={32} className="text-primary animate-spin" />;

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="avatar">
        <div className="rounded-full">
          <Image
            src={user?.avatar!}
            alt={`${user?.name}'s avatar`}
            width={32}
            height={32}
          />
        </div>
      </div>

      <span>{user?.name}</span>
    </div>
  );
};
