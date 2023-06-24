import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "src/utils/cn";
import { Input } from "./primitives/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./primitives/Popover";

const SearchSuggestion: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-row px-4 py-2 items-center hover:bg-zinc-100 cursor-pointer">
      <SearchIcon size={15} />
      <span className="ml-4 font-semibold text-md">{text}</span>
    </div>
  );
};

export const HeaderSearchDropdown = () => {
  const [isInputClicked, setInputClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onInputClick = () => {
    setInputClicked(true);
    setTimeout(() => {
      console.log("inputRef", inputRef.current);
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Popover
      onOpenChange={(state) => {
        if (!state) {
          setInputClicked(false);
        }
      }}
    >
      <PopoverTrigger
        className={cn(
          "transition-all duration-700 hidden lg:flex",
          isInputClicked ? "w-full" : "w-64"
        )}
      >
        <Input
          className="w-full bg-slate-100 border-none h-8 focus:border-none pl-2"
          placeholder="Search"
          onClick={onInputClick}
          ref={inputRef}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-96">
        <div className="font-semibold text-sm p-4 pb-2">Try searching for</div>
        <SearchSuggestion text="#hiring" />
        <SearchSuggestion text="#jobadvice" />
        <SearchSuggestion text="#jobs" />
        <SearchSuggestion text="#career" />
      </PopoverContent>
    </Popover>
  );
};
