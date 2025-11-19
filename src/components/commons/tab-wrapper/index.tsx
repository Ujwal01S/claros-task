import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table2 } from "lucide-react";

interface Props {
  defaultValue: string;
  children: React.ReactNode;
}

const TabSwitchWrapper = ({ children, defaultValue }: Props) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="flex gap-2 place-self-end-safe">
        <Tooltip>
          <TooltipTrigger asChild>
            {/* span to fix the hydration error of having  button inside button and fix css class issue with data-state */}
            <span className="inline-flex">
              <TabsTrigger value="table">
                <Table2 />
              </TabsTrigger>
            </span>
          </TooltipTrigger>
          <TooltipContent>Table View</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            {/* span to fix the hydration error of having  button inside button and fix css class issue with data-state */}
            <span className="inline-flex">
              <TabsTrigger value="grid">
                <Table2 />
              </TabsTrigger>
            </span>
          </TooltipTrigger>
          <TooltipContent>Grid View</TooltipContent>
        </Tooltip>
      </TabsList>

      {children}
    </Tabs>
  );
};

export default TabSwitchWrapper;
