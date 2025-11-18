import { ChevronRight, Database, HomeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link } from "react-router";

const navigationData = [
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
      { title: "product", url: "products" },
      { title: "category", url: "categories" },
      { title: "user", url: "user" },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="mt-16">
      <SidebarContent>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.map((nav) => (
              <Collapsible key={nav.title}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group/collapsible data-[state=open]:bg-[#E0E0E0]">
                      <nav.icon className="mr-2 h-4 w-4" />
                      <span className="flex-1 capitalize font-semibold">
                        {nav.title}
                      </span>
                      {nav.subNavigation && nav.subNavigation?.length > 0 && (
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {nav.subNavigation && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {nav.subNavigation.map((subNav) => (
                          <Link
                            key={subNav.title}
                            to={"#"}
                            className="capitalize"
                          >
                            <SidebarMenuSubItem className="capitalize text-sm font-medium">
                              {subNav.title}
                            </SidebarMenuSubItem>
                          </Link>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
