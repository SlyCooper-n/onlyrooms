import { UserCircle, Wrench } from "phosphor-react";

export const navbarMenu = [
  {
    id: 3,
    name: "Chat",
    link: "/chat",
    isButton: false,
  },
  {
    id: 1,
    name: "Dashboard",
    link: "/rooms",
    isButton: false,
  },
  {
    id: 2,
    name: "Create a new room",
    link: "/rooms/new",
    isButton: true,
  },
];

export const userOptions = [
  {
    id: 1,
    name: "Profile",
    link: "/account",
    icon: <UserCircle size={24} weight="light" className="text-base-content" />,
  },
  {
    id: 2,
    name: "Settings",
    link: "/account/#settings",
    icon: <Wrench size={24} weight="light" className="text-base-content" />,
  },
];
