import { parseAsInteger, useQueryState } from "nuqs";

export const usePaginationPrams = (
  { paginationValue = 8 }: { paginationValue?: number } = {}, // <-- default {}
) => {
  const [offSet, setOffSet] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0),
  );
  const [limit, setlimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(paginationValue),
  );

  return {
    offSet,
    setOffSet,
    limit,
    setlimit,
  };
};
