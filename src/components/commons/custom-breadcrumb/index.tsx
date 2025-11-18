import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatBreadcrumb } from "@/utils/format-breadcrumb";
import { House } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

const BreadCrumbComponent = () => {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter((item) => item !== "");

  const segmentsLength = segments.length;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/"
              className="flex gap-2 items-center"
            >
              <House size={18} />
              Dashboard
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.length > 0 && <BreadcrumbSeparator />}
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="#"
                  className="capitalize"
                >
                  {formatBreadcrumb(segment)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segmentsLength - 1 !== index && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
