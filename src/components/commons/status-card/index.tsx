import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface Props {
  className?: string;
  icon: React.ReactNode;
  title: string;
  total: number;
  isPending: boolean;
}

const StatusCard = ({ className, icon, title, total, isPending }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 border border-l-4 border-l-product rounded-sm shadow-xs",
        className,
      )}
    >
      {icon}
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">{title}</p>
        <div className="flex gap-2 items-center">
          Total:{" "}
          {isPending ? (
            <Skeleton className="w-10 h-5" />
          ) : (
            <span className="font-medium">{total}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(StatusCard);
