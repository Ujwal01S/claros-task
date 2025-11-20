import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";

const QueryToolTip = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleQuestionMark size={16} />
      </TooltipTrigger>
      <TooltipContent className="max-w-90">
        <p>
          API prevents deletion of some rows whose respective error response has
          been displayed in toast.
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default QueryToolTip;
