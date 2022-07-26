import { AvatarPopoverProps } from "@core/types";
import { userOptions } from "@core/utils";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export const AvatarPopover = ({ user, className }: AvatarPopoverProps) => {
  return (
    <Popover className={`relative ${className}`}>
      <Popover.Button className="avatar outline-none focus:ring-2 focus:ring-accent-focus focus:ring-offset-2 focus:ring-offset-base-100">
        <div className="w-8 rounded-full">
          <Image
            src={user.avatar!}
            alt={`${user.name}'s avatar`}
            width={32}
            height={32}
          />
        </div>
      </Popover.Button>

      <Transition
        enterFrom="opacity-0 translate-y-4"
        enter="transition-all duration-150"
        enterTo="opacity-100 -translate-y-2"
        leave="transition-all duration-350"
        leaveTo="opacity-0 translate-y-8"
      >
        <Popover.Panel
          as="ul"
          className="menu absolute top-10 right-0 bg-base-300 rounded-lg z-20"
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
      </Transition>
    </Popover>
  );
};
