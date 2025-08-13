import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { cn } from "@/utils";
import { useToggle } from "react-use";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ name, items }: NavGroupProps) {
  const [open, toggleOpen] = useToggle(true);

  return (
    <Collapsible open={open}>
      <CollapsibleTrigger asChild>
        <Group name={name} open={open} onClick={toggleOpen} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex w-full flex-col gap-1">
          {items.map((item, index) => (
            <NavList key={item.title || index} data={item} depth={1} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Group({
  name,
  open,
  onClick,
}: {
  name?: string;
  open: boolean;
  onClick: (nextValue: boolean) => void;
}) {
  const { t } = useLocale();
  return (
    name && (
      <div
        className={cn(
          "group relative w-full inline-flex items-center justify-start gap-2 cursor-pointer pt-4 pr-2 pb-2 pl-3 transition-all duration-300 ease-in-out",
          "hover:pl-4",

          "after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[1px] after:bg-primary/50 after:transition-all after:duration-500",
          open ? "after:w-full mb-2" : "after:w-0"
        )}
        onClick={() => onClick(!open)}
      >
        <Icon
          icon="eva:arrow-ios-forward-fill"
          className={cn(
            "absolute left-[4px] h-6 w-7 inline-flex  shrink-0 transition-all duration-300 ease-in-out",
            "[&>*]:fill-primary/50 group-hover:[&>*]:fill-primary dark:[&>*]:fill-primary/50 dark:group-hover:[&>*]:fill-primary",
            {
              "rotate-90": open,
              "rotate-180": !open,
            }
          )}
        />

        <span
          className={cn(
            "text-md font-medium transition-all duration-300 ease-in-out ",
            "group-hover:text-text-primary group-hover:font-semibold",
            open ? "text-primary " : "text-foreground"
          )}
        >
          {t(name)}
        </span>
      </div>
    )
  );
}
