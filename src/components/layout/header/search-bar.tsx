import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ImageSearchIcon } from "../icons/main-header-icons/ImageSearchIcon";
import { MicrophoneIcon } from "../icons/main-header-icons/MicrophoneIcon";
import { SearchIcon } from "../icons/main-header-icons/SearchIcon";

export function SearchBar() {
  return (
    <form
      className="flex h-12 w-full max-w-[800px] items-center"
      dir="rtl"
    >
      <Button
        type="submit"
        className="h-full rounded-l-none rounded-r-lg bg-gray-800 px-6 text-white hover:bg-gray-900"
      >
        <SearchIcon className="h-6 w-6" />
      </Button>
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="ابحث عن دواء, منتج أو ماركة"
          className="h-full rounded-none border-y border-r-0 border-l-gray-200 bg-white pr-4 pl-24 text-right focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="absolute top-1/2 left-4 flex -translate-y-1/2 gap-3 text-gray-400">
          <button type="button" className="hover:text-gray-600">
            <MicrophoneIcon className="h-5 w-5" />
          </button>
          <button type="button" className="hover:text-gray-600">
            <ImageSearchIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-full whitespace-nowrap rounded-r-none rounded-l-lg border-l-0 border-gray-200 bg-gray-50 text-gray-600"
          >
            <span>الفئات</span>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>الفيتامينات والمكملات</DropdownMenuItem>
          <DropdownMenuItem>العناية بالبشرة</DropdownMenuItem>
          <DropdownMenuItem>الأم والطفل</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
} 