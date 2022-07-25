import { UserCircle, Wrench } from "phosphor-react";

export const navbarMenu = [
  {
    id: 1,
    name: "Live questions",
    link: "/rooms/live-questions",
  },
  {
    id: 2,
    name: "Anonymous questions",
    link: "/rooms/anonymous-questions",
  },
  {
    id: 3,
    name: "Chat",
    link: "/chat",
  },
];

export const userOptions = [
  {
    id: 1,
    name: "Profile",
    link: "/account/profile",
    icon: <UserCircle size={32} className="text-base-content" />,
  },
  {
    id: 2,
    name: "Settings",
    link: "/account/settings",
    icon: <Wrench size={32} className="text-base-content" />,
  },
];
