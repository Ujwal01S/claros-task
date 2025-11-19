import type { INavigationProps } from "@/types/navigation.types";
import { Database, HomeIcon } from "lucide-react";

export const navigationData: INavigationProps[] = [
  {
    title: "Home",
    url: "#",
    icon: HomeIcon,
    subNavigation: [{ title: "View Products", url: "/view-product" }],
  },
  {
    title: "Data",
    url: "#",
    icon: Database,
    subNavigation: [
      { title: "user", url: "/user" },
      { title: "category", url: "/category" },
    ],
  },
];
