import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeletion = () => {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="sr-only">Header</CardHeader>
      <CardContent className="p-0 pb-2 grid gap-2">
        <Skeleton className="h-36" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </CardContent>
    </Card>
  );
};

export default CardSkeletion;
