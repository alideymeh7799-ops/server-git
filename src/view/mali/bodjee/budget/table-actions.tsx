import type { CreditEntry } from "#/entity";
import { resourceAndOperation } from "@/_mock/item-permission";
import { Icon } from "@/components/icon";
import { usePermission } from "@/hooks/user";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

export const TableActions = ({
  record,
  onRefresh,
  onEdit,
  openCreateModalCredit,
}: {
  record: CreditEntry;
  onRefresh: () => void;
  onEdit: (formValue: CreditEntry) => void;
  openCreateModalCredit: () => void;
}) => {
  const serverAllowed = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDelete = () => {
    toast.warning(`آیا از حذف  مطمئن هستید؟`, {
      action: {
        label: "حذف",
        onClick: async () => {
          onRefresh();
        },
      },
      cancel: {
        label: "لغو",
        onClick: () => console.log("حذف لغو شد"),
      },
    });
  };

  const items = [
    {
      key: "edit",
      label: (
        <div className="flex items-center text-gray">
          <Icon icon="solar:pen-bold" />
          <span className="ml-2">ویرایش</span>
        </div>
      ),
      action: () => onEdit(record),
      permission: serverAllowed.can(
        resourceList.CREDITBUDGET,
        operationList.UPDATE
      ),
    },
    {
      key: "addCredit",
      label: (
        <div className="flex items-center text-gray">
          <Icon icon="solar:wallet-bold" />
          <span className="ml-2">افزودن اعتبار</span>
        </div>
      ),
      action: openCreateModalCredit,
      permission: serverAllowed.can(
        resourceList.CREDITBUDGET,
        operationList.CREATE
      ),
    },
    {
      key: "delete",
      label: (
        <div className="flex items-center text-warning">
          <Icon icon="solar:trash-bin-trash-bold" />
          <span className="ml-2">حذف</span>
        </div>
      ),
      action: handleDelete,
      permission: serverAllowed.can(
        resourceList.CREDITBUDGET,
        operationList.DELETE
      ),
    },
  ];

  const filteredItems = items.filter((item) => item.permission);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray! ">
          <Icon icon="dashicons:ellipsis" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {filteredItems.map((item) => (
          <DropdownMenuItem
            key={item.key}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(false);
              item.action();
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
