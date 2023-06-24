import {
  AtSignIcon,
  BaggageClaim,
  BellRingIcon,
  GridIcon,
  HomeIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  NetworkIcon,
  UserCircle2,
} from "lucide-react";
import { cn } from "src/utils/cn";
import { HeaderSearchDropdown } from "./HeaderSearchDropdown";
import { Popover, PopoverTrigger, PopoverContent } from "./primitives/Popover";

const MenuItemLayout: React.FC<{ icon: any; text?: any; active?: boolean }> = ({
  icon,
  text,
  active,
}) => {
  return (
    <div
      className={cn(
        "w-12 sm:w-16 md:w-20 flex flex-col items-center justify-center h-full text-zinc-600 hover:text-slate-900 cursor-pointer",
        active && "border-b-2 border-black text-slate-900"
      )}
    >
      <div className="flex items-center justify-start">{icon}</div>
      {text && <span className="text-xs mt-1 hidden lg:inline">{text}</span>}
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="bg-white w-full flex justify-center h-14 border-b border-slate-200 sticky top-0 z-[1]"
      style={{ margin: "0 auto" }}
    >
      <div className="w-[1128px] flex flex-row items-center">
        <span className="rounded shrink-0 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-supported-dps="24x24"
            fill="#0B65C2"
            width="36"
            height="36"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        </span>
        <HeaderSearchDropdown />
        <div className="flex-1" />
        <div className="hidden sm:flex h-full">
          <MenuItemLayout icon={<HomeIcon size={19} />} text="Home" active />
          <MenuItemLayout icon={<NetworkIcon size={19} />} text="My Network" />
          <MenuItemLayout icon={<BaggageClaim size={19} />} text="Jobs" />
          <MenuItemLayout
            icon={<MessageCircleIcon size={19} />}
            text="Messaging"
          />
          <MenuItemLayout
            icon={<BellRingIcon size={19} />}
            text="Notifications"
          />
          <div className="flex flex-row items-center divide-x h-full">
            <MenuItemLayout icon={<UserCircle2 size={19} />} text="Me" />
            <MenuItemLayout icon={<GridIcon size={19} />} text="For Business" />
          </div>
          <MenuItemLayout icon={<AtSignIcon size={19} />} text="Post a job" />
        </div>
        <div className="flex sm:hidden h-full">
          <MenuItemLayout icon={<HomeIcon />} text="Home" active />
          <MenuItemLayout icon={<NetworkIcon />} text="My Network" />
          <MenuItemLayout icon={<BaggageClaim />} text="Jobs" />
          <MenuItemLayout icon={<MessageCircleIcon />} text="Messaging" />
          <MenuItemLayout icon={<BellRingIcon />} text="Notifications" />
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <MenuItemLayout icon={<MoreVerticalIcon />} />
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-48 flex flex-row space-x-4">
              <MenuItemLayout icon={<UserCircle2 />} />
              <MenuItemLayout icon={<GridIcon />} />
              <MenuItemLayout icon={<AtSignIcon />} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
