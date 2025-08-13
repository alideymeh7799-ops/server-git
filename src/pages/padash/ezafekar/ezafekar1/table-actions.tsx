import type { CreditEntry } from "#/entity";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

export const TableActions = ({
	record,
	onRefresh,
	onEdit,
}: {
	record: CreditEntry;
	onRefresh: () => void;
	onEdit: (formValue: CreditEntry) => void;
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleAddCredit = async () => {
		// const promise = handleAddCreditAPI(record.id);
		// toast.promise(promise, {
		//   loading: "در حال افزودن اعتبار...",
		//   success: (data) => `اعتبار به ${data.program} اضافه شد.`,
		//   error: "خطا در افزودن اعتبار",
		// });
		// await promise;
		onRefresh();
	};

	const handleDelete = () => {
		toast.warning(`آیا از حذف ${record.program} مطمئن هستید؟`, {
			action: {
				label: "حذف",
				onClick: async () => {
					// const promise = handleDeleteAPI(record.id);
					// toast.promise(promise, {
					//   loading: "در حال حذف...",
					//   success: (data) => `${data.program} حذف شد.`,
					//   error: "خطا در حذف",
					// });
					// await promise;
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
		},
		{
			key: "addCredit",
			label: (
				<div className="flex items-center text-gray">
					<Icon icon="solar:wallet-bold" />
					<span className="ml-2">افزودن اعتبار</span>
				</div>
			),
			action: handleAddCredit,
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
	];

	return (
		<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="text-gray!">
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
