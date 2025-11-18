import { Button } from "@/components/ui/button";
import { usePaginationPrams } from "@/hooks/query-params/use-pagination";

const PaginationButton = () => {
  const { setOffSet, limit, offSet } = usePaginationPrams();
  const previousHandler = () => {
    if (offSet !== 0) {
      setOffSet(offSet - limit);
    }
  };
  const nextHandler = () => {
    setOffSet(offSet + limit);
  };
  return (
    <div className="flex gap-4 place-self-end">
      <Button onClick={previousHandler}>Previous</Button>

      <Button onClick={nextHandler}>Next</Button>
    </div>
  );
};

export default PaginationButton;
