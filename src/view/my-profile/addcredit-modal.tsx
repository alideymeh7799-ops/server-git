// import { useUserAddCredit } from "@/store/userStore";
import type { AddCredit_Old } from "#/entity";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { TreeSelect } from "antd";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

// Constants
// const ENTRY_PATH = "/src/pages";
// const PAGES = import.meta.glob("/src/pages/**/*.tsx");
// const PAGE_SELECT_OPTIONS = Object.entries(PAGES).map(([path]) => {
//   const pagePath = path.replace(ENTRY_PATH, "");
//   return {
//     label: pagePath,
//     value: pagePath,
//   };
// });

export type AddCreditModalProps = {
	formValue: AddCredit_Old;
	title: string;
	show: boolean;
	onOk: (values: AddCredit_Old) => void;
	onCancel: VoidFunction;
};

export default function AddCreditModal({ title, show, formValue, onOk, onCancel }: AddCreditModalProps) {
	const form = useForm<AddCredit_Old>({
		defaultValues: formValue,
	});

	// TODO: fix
	// const permissions = useUserAddCredit();
	const permissions: any[] = [];

	const updateCompOptions = useCallback((name: string) => {
		console.log("newma", name);
	}, []);

	const onSubmit = (values: AddCredit_Old) => {
		onOk(values);
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="numberEtebar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>شماره برگ اعتبار</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="dateEtebar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Start</FormLabel>
									<FormControl>
										<Input type="datetime-local" value={field.value?.toISOString().slice(0, 16)} onChange={(e) => field.onChange(new Date(e.target.value))} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="yeganVagozarID"
							render={({ field }) => (
								<FormItem>
									<FormLabel>یگان واگذارکننده</FormLabel>
									<FormControl>
										<TreeSelect
											fieldNames={{
												label: "name",
												value: "id",
												children: "children",
											}}
											allowClear
											treeData={permissions}
											value={field.value}
											onSelect={(value, node) => {
												field.onChange(value);
												if (node?.name) {
													updateCompOptions(node.name);
												}
											}}
											onChange={(value) => {
												field.onChange(value);
											}}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="amountEtebar"
							render={({ field }) => (
								<FormItem>
									<FormLabel> مبلغ اعتبار </FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="amountEtebar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Order</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button variant="outline" onClick={onCancel}>
								Cancel
							</Button>
							<Button type="submit" variant="default">
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
