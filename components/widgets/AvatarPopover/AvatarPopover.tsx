import { UserType } from "@core/types";
import { userOptions } from "@core/utils";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

interface AvatarPopoverProps {
  user: UserType;
}

export const AvatarPopover = ({ user }: AvatarPopoverProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="avatar outline-none">
        <div className="w-8 rounded-full">
          <Image
            src={user.avatar!}
            alt={`${user.name}'s avatar`}
            width={32}
            height={32}
            layout="responsive"
          />
        </div>
      </Popover.Button>

      <Popover.Panel
        as="ul"
        className="menu absolute top-10 right-0 bg-base-300 rounded-lg"
      >
        {userOptions.map((opt) => (
          <li key={opt.id} className="">
            <Link href={opt.link}>
              <a className="flex justify-between gap-4">
                {opt.name}

                {opt.icon}
              </a>
            </Link>
          </li>
        ))}
      </Popover.Panel>
    </Popover>
  );
};
