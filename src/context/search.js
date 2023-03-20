import { createContext } from "react";

export const SearchContext = createContext({
  // searched: false,
  searchValue: "",
  searchType: "",
  searchResults: [],
});
