import { parseAsString, useQueryState } from "nuqs";

export const useSearchProductParams = () => {
  const [searchWithTitle, setSearchWithTitle] = useQueryState(
    "title",
    parseAsString.withDefault(""),
  );

  const [searchWithPrice, setSearchWithPrice] = useQueryState(
    "price",
    parseAsString.withDefault(""),
  );

  return {
    searchWithTitle,
    searchWithPrice,
    setSearchWithPrice,
    setSearchWithTitle,
  };
};
