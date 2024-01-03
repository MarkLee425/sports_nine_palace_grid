import { useInputFilter } from "@/hooks/useInputFilter";
import { Search } from "./react-icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const debounceFilter = useDebounce(search);

  const result = useInputFilter(debounceFilter);

  return (
    <div className="relative">
      <Search className="absolute top-[1.10rem] left-4 cursor-text" size={18} />
      <input
        type="search"
        placeholder="Search..."
        className="px-12 py-4 rounded-t-2xl w-full focus:outline-none border-b"
        size={30}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="my-2 max-h-80 overflow-y-auto">
        <li className="hover:bg-gray-200 px-4 text-lg py-1 cursor-pointer">
          <h1>name</h1>
          <p className="text-gray-500 text-xs">duration</p>
        </li>
        {!!result?.data &&
          result.data.map((each: Record<string, string>) => (
            <li className="hover:bg-gray-200 px-4 text-lg py-1 cursor-pointer">
              <h1>{each.name}</h1>
              <p className="text-gray-500 text-xs">{each.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
