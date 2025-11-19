import { Button } from "@/components/ui/button";
import { usePaginationPrams } from "@/hooks/query-params/use-pagination";

interface Props {
  isFetching?: boolean;
  dataLength?: number;
}

const PaginationButton = ({ isFetching, dataLength }: Props) => {
  const { setOffSet, limit, offSet } = usePaginationPrams();

  const previousHandler = () => {
    if (offSet !== 0) {
      setOffSet((prev: number) => Math.max(0, prev - limit));
    }
  };

  const nextHandler = () => {
    setOffSet((prev: number) => prev + limit);
  };

  const disableNext =
    !!isFetching ||
    (typeof dataLength === "number" &&
      (dataLength < limit || offSet + limit >= dataLength));

  return (
    <div className="flex gap-4 place-self-end">
      <Button
        onClick={previousHandler}
        disabled={isFetching || offSet === 0}
        variant={"outline"}
      >
        Previous
      </Button>
      <Button
        onClick={nextHandler}
        disabled={disableNext}
        variant={"outline"}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButton;
