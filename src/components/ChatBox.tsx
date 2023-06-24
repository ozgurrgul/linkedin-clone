import React, { useEffect, useState } from "react";
import { MyAvatar, UserAvatar } from "./UserAvatar";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontalIcon,
  PencilIcon,
  Settings2,
} from "lucide-react";
import { cn } from "src/utils/cn";
import { Checkbox } from "./primitives/Checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./primitives/DropdownMenu";
import { Input } from "./primitives/Input";

type ChatTab = "focused" | "other";

const ChatHeader: React.FC<{
  onClick: () => void;
  isChatsExpanded: boolean;
}> = ({ onClick, isChatsExpanded }) => {
  const iconClassName =
    "cursor-pointer hover:rounded-full hover:bg-zinc-100 p-1 overflow-visible";
  return (
    <div
      className="flex flex-row items-center p-2 cursor-pointer"
      onClick={onClick}
    >
      <MyAvatar className="w-8 h-8" />
      <div className="text-sm font-semibold pl-2 w-full">Messaging</div>
      <div className="flex flex-row space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span>
              <MoreHorizontalIcon className={iconClassName} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem>Manage conversations</DropdownMenuItem>
            <DropdownMenuItem>Messaging settings</DropdownMenuItem>
            <DropdownMenuItem>Set away message</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <PencilIcon className={iconClassName} />
        {isChatsExpanded ? (
          <ChevronDown className={iconClassName} />
        ) : (
          <ChevronUp className={iconClassName} />
        )}
      </div>
    </div>
  );
};

const EmptyChatsContent = () => (
  <div className="text-center flex flex-col justify-center items-center p-6">
    <div className="text-2xl">No messages yet</div>
    <div className="mt-4">
      Reach out and start a conversation to advance your career
    </div>
  </div>
);

type ChatsListItemData = {
  summary: string;
  sender: {
    name: string;
    imageUrl: string;
  };
};

const ChatsListItem: React.FC<{
  data: ChatsListItemData;
  onCheck: (checked: boolean) => void;
  isChecked: boolean;
  showCheckbox: boolean;
}> = ({ data, onCheck, isChecked, showCheckbox: _showCheckbox }) => {
  const [showCheckBox, setShowCheckbox] = useState(false);
  const [isCheckboxActivated, setCheckboxActivated] = useState(false);

  const onHoverLeaveFromRow = () => {
    if (isCheckboxActivated || _showCheckbox) {
      return;
    }
    setShowCheckbox(false);
  };

  const onCheckedChange = (checked: boolean) => {
    setCheckboxActivated(checked);
    onCheck(checked);
  };

  useEffect(() => {
    setShowCheckbox(_showCheckbox);
  }, [_showCheckbox]);

  return (
    <div
      className="flex flex-row p-2 pb-0 cursor-pointer hover:bg-zinc-100"
      onMouseLeave={onHoverLeaveFromRow}
    >
      <span
        onMouseEnter={() => setShowCheckbox(true)}
        onMouseLeave={onHoverLeaveFromRow}
      >
        {showCheckBox ? (
          <div
            className="w-10 h-10 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center cursor-pointer"
            onClick={() => {
              onCheckedChange(!isChecked);
            }}
          >
            <Checkbox
              checked={Boolean(isChecked)}
              onCheckedChange={(e: boolean | "indeterminate") =>
                onCheckedChange(Boolean(e))
              }
            />
          </div>
        ) : (
          <UserAvatar imageUrl={data.sender.imageUrl} />
        )}
      </span>
      <div className="ml-3 border-b pb-2">
        <div className="text-sm">{data.sender.name}</div>
        <div className="text-zinc-500 text-xs mt-1">{data.summary}</div>
      </div>
    </div>
  );
};

const chatData: ChatsListItemData[] = [
  {
    summary:
      "I've heard great things about you. Could you be the next big thing at Microsoft?",
    sender: {
      name: "Satya Nadella",
      imageUrl:
        "https://media.licdn.com/dms/image/C5603AQHHUuOSlRVA1w/profile-displayphoto-shrink_100_100/0/1579726624860?e=1692835200&v=beta&t=m5EDtXZALcLc9SM6BNRsfbid9cEUxfN8B_LYhdwFwGo",
    },
  },
  {
    summary:
      "Ozgur, can you write an algorithm to predict our stock prices? PS: You can't use quantum computing!",
    sender: {
      name: "Sundar Pichai",
      imageUrl:
        "https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0_400x400.jpg",
    },
  },
  {
    summary:
      "We're thinking of making a LinkedIn competitor. Would you like to join that sinking ship?",
    sender: {
      name: "Mark Zuckerberg",
      imageUrl:
        "https://www.californiamuseum.org/sites/main/files/imagecache/medium/main-images/screen_shot_2012-07-27_at_6.32.28_pm.png?1632975955",
    },
  },
  {
    summary:
      "Have you ever tried throwing an apple in space? Let's do it together at SpaceX.",
    sender: {
      name: "Elon Musk",
      imageUrl: "https://ichef.bbci.co.uk/images/ic/640x360/p03c84wz.jpg",
    },
  },
  {
    summary: "Can you design a website for us? We're still using HTML 1.0.",
    sender: {
      name: "Bill Gates",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQFxd6snfB-80w/profile-displayphoto-shrink_100_100/0/1686850028795?e=1692835200&v=beta&t=rcGox-VIihouJsvoqyR_9wMH_cu9QNZpICsWyVUVajA",
    },
  },
  {
    summary:
      "Your performance metrics are remarkable. Can you make Google's search even faster? No pressure.",
    sender: {
      name: "Sundar Pichai",
      imageUrl:
        "https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0_400x400.jpg",
    },
  },
];

const ChatsList = () => {
  const [checkedIndexes, setCheckedIndexes] = useState<{
    [key: number]: boolean;
  }>({});

  const isAnyChatChecked = Object.keys(checkedIndexes).length > 0;

  return (
    <div className="overflow-y-auto">
      {chatData.map((chatItem, index) => (
        <ChatsListItem
          key={index}
          data={chatItem}
          onCheck={(checked) => {
            if (checked) {
              setCheckedIndexes({ ...checkedIndexes, [index]: checked });
            } else {
              const checkedIndexesTmp = { ...checkedIndexes };
              delete checkedIndexesTmp[index];
              setCheckedIndexes(checkedIndexesTmp);
            }
          }}
          isChecked={checkedIndexes[index] || false}
          showCheckbox={isAnyChatChecked}
        />
      ))}
    </div>
  );
};

const ChatTabsHeader: React.FC<{
  activeTab: ChatTab;
  onChangeTab: (tab: ChatTab) => void;
}> = ({ activeTab, onChangeTab }) => {
  const tabClassName = "text-zinc-500 text-sm flex-1 text-center p-2";
  const tabActiveClassName = "border-b-green-700 border-b-2";
  return (
    <div className="w-full border-b font-semibold flex flex-row">
      <div
        className={cn(
          tabClassName,
          activeTab === "focused" && tabActiveClassName
        )}
        onClick={() => onChangeTab("focused")}
      >
        Focused
      </div>
      <div
        className={cn(
          tabClassName,
          activeTab === "other" && tabActiveClassName
        )}
        onClick={() => onChangeTab("other")}
      >
        Other
      </div>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className="p-2 relative">
      <Input
        className="w-full bg-slate-100 border-none h-8 focus:border-none pl-2"
        placeholder="Search"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Settings2 className="absolute top-4 right-4" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem>Archived</DropdownMenuItem>
          <DropdownMenuItem>My connections</DropdownMenuItem>
          <DropdownMenuItem>Starred</DropdownMenuItem>
          <DropdownMenuItem>Unread</DropdownMenuItem>
          <DropdownMenuItem>InMail</DropdownMenuItem>
          <DropdownMenuItem>Spam</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ChatBox: React.FC = () => {
  const [isChatsExpanded, setChatsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatTab>("focused");
  return (
    <div className="fixed right-0 bottom-0 w-72 h-auto bg-white shadow-md border rounded-t-lg rounded-tr-none">
      <ChatHeader
        onClick={() => setChatsExpanded(!isChatsExpanded)}
        isChatsExpanded={isChatsExpanded}
      />

      {isChatsExpanded && (
        <>
          <SearchInput />
          <ChatTabsHeader activeTab={activeTab} onChangeTab={setActiveTab} />
        </>
      )}
      <div
        className={cn(
          "transition-all duration-500 ease-in-out overflow-auto",
          isChatsExpanded ? "max-h-[500px]" : "max-h-0"
        )}
      >
        {activeTab === "focused" ? <ChatsList /> : <EmptyChatsContent />}
      </div>
    </div>
  );
};
