import {
  ChevronDown,
  ChevronRightIcon,
  InfoIcon,
  PlusIcon,
} from "lucide-react";
import { cn } from "src/utils/cn";
import { UserAvatar } from "./UserAvatar";
import { Card, CardHeader } from "./primitives/Card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./primitives/DropdownMenu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./primitives/Tooltip";

const UserRecommendation: React.FC<{
  name: string;
  imageUrl: string;
  subtext: string;
}> = ({ name, subtext, imageUrl }) => {
  return (
    <div className="flex flex-row p-3">
      <UserAvatar imageUrl={imageUrl} />
      <div className="w-full ml-2">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-zinc-500 mb-2">{subtext}</div>
        <span
          className={cn(
            "rounded-2xl font-semibold text-zinc-500 border-zinc-500 hover:border-zinc-700 text-sm w-24 p-1",
            "flex flex-row items-center border justify-center hover:bg-zinc-200 cursor-pointer transition-all"
          )}
        >
          <PlusIcon size={18} /> <span className="ml-1">Follow</span>
        </span>
      </div>
    </div>
  );
};

const AsideHeader = () => {
  return (
    <>
      <div className="font-semibold w-full">Add to your feed</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="cursor-pointer">
            <InfoIcon size={16} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-48">
              Follow things that interest you to personalize your feed.{" "}
              <span className="text-underline font-semibold text-blue-600">
                Learn more.
              </span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

const AsideFooterLink: React.FC<{
  text: string;
  subItems?: { href: string; text: string }[];
}> = ({ text, subItems }) => {
  return (
    <span className="m-1 cursor-pointer hover:underline hover:text-blue-500 ">
      {subItems ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex flex-row">
              {text}
              <ChevronDown size={15} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {subItems.map((item) => (
              <DropdownMenuItem key={item.text}>
                <span>{item.text}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        text
      )}
    </span>
  );
};

const AsideFooter = () => {
  return (
    <div className="text-xs text-zinc-500 flex flex-wrap p-4 m-2 justify-center sticky top-14">
      <AsideFooterLink text="About" />
      <AsideFooterLink text="Accessibility" />
      <AsideFooterLink text="Help Center" />
      <AsideFooterLink
        text="Privacy & Terms"
        subItems={[
          {
            text: "Privacy Policy",
            href: "#",
          },
          {
            text: "User Agreement",
            href: "#",
          },
          {
            text: "Pages Terms",
            href: "#",
          },
          {
            text: "Cookie Policy",
            href: "#",
          },
          {
            text: "Copyright Policy",
            href: "#",
          },
        ]}
      />
      <AsideFooterLink text="Ad Choices" />
      <AsideFooterLink text="Advertising" />
      <AsideFooterLink text="Business Services" />
    </div>
  );
};

export const Aside = () => {
  return (
    <aside style={{ gridArea: "aside" }}>
      <Card>
        <CardHeader className="p-3 flex flex-row">
          <AsideHeader />
        </CardHeader>
        <UserRecommendation
          name="Bill Gates"
          imageUrl="https://media.licdn.com/dms/image/D5603AQFxd6snfB-80w/profile-displayphoto-shrink_100_100/0/1686850028795?e=1692835200&v=beta&t=rcGox-VIihouJsvoqyR_9wMH_cu9QNZpICsWyVUVajA"
          subtext="Co-chair, Bill & Melinda Gates Foundation"
        />
        <UserRecommendation
          name="Satya Nadella"
          imageUrl="https://media.licdn.com/dms/image/C5603AQHHUuOSlRVA1w/profile-displayphoto-shrink_100_100/0/1579726624860?e=1692835200&v=beta&t=m5EDtXZALcLc9SM6BNRsfbid9cEUxfN8B_LYhdwFwGo"
          subtext="Chairman and CEO at Microsoft"
        />
        <UserRecommendation
          name="Clara Shih"
          imageUrl="https://media.licdn.com/dms/image/D5603AQGVuircu90KUw/profile-displayphoto-shrink_100_100/0/1677475762784?e=1692835200&v=beta&t=zTH1P27U-lV_I_2hT74hDcqk-fhgg7wHrhx8W8a5xio"
          subtext="CEO of Salesforce AI, Board Director & Entrepreneur"
        />
        <div className="mt-1 ml-3 text-zinc-500 flex flex-row text-sm p-2 items-center font-semibold cursor-pointer">
          View all recommendations <ChevronRightIcon size={18} />
        </div>
      </Card>
      <AsideFooter />
    </aside>
  );
};
