import type { INavigationProps } from "@/types/navigation.types";
import { Database, HomeIcon } from "lucide-react";

export const navigationData: INavigationProps[] = [
  {
    title: "Home",
    url: "#",
    icon: HomeIcon,
  },
  {
    title: "Data",
    url: "#",
    icon: Database,
    subNavigation: [
      { title: "product", url: "product" },
      { title: "category", url: "category" },
      { title: "user", url: "user" },
    ],
  },
];
