import { parseAsInteger, useQueryState } from "nuqs";

export const usePaginationPrams = () => {
  const [offSet, setOffSet] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0),
  );
  const [limit, setlimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(8),
  );

  return {
    offSet,
    setOffSet,
    limit,
    setlimit,
  };
};
