import type { CreditDetailBargeEtebar, CreditEntryNonBudget } from "#/entity";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

export const TableActions = ({
	record,
	// onRefresh,
	onEdit,
	openCreateModalCredit,
	onDelete,
}: {
	record: CreditEntryNonBudget;
	onRefresh: () => void;
	onEdit: (formValue: CreditEntryNonBudget) => void;
	openCreateModalCredit: (record: CreditDetailBargeEtebar | null, id: string | number | null) => void;
	onDelete: (id: number | string) => void;
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleDelete = () => {
		toast.warning(`آیا از حذف ${record.sarfasl} مطمئن هستید؟`, {
			action: {
				label: "حذف",
				onClick: () => {
					if (record.id) onDelete(record.id);
				},
			},
			cancel: {
				label: "لغو",
				onClick: () => console.log("حذف لغو شد"),
			},
		});
	};
	const openCredit = () => {
		if (record.id) openCreateModalCredit(null, record.id ? record.id : null);
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
		},
		{
			key: "addCredit",
			label: (
				<div className="flex items-center text-gray">
					<Icon icon="solar:wallet-bold" />
					<span className="ml-2">افزودن اعتبار</span>
				</div>
			),
			action: openCredit,
		},
	];

	return (
		<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="text-gray! ">
					<Icon icon="dashicons:ellipsis" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{items.map((item) => (
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
