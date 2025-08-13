// import { useUserPermission } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";

import type { CreditEntry } from "#/entity"; // define this type
import { useForm } from "react-hook-form";

export type CreditModalProps = {
	formValue: CreditEntry;
	title: string;
	show: boolean;
	onOk: (values: CreditEntry) => void;
	onCancel: VoidFunction;
};

export default function CreditModal({ title, show, formValue, onOk, onCancel }: CreditModalProps) {
	const form = useForm<CreditEntry>({
		defaultValues: formValue,
	});

	const onSubmit = (values: CreditEntry) => {
		onOk(values);
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title} </DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="radif"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ردیف</FormLabel>
									<FormControl>
										<Input {...field} value={field?.value ?? undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="program"
							render={({ field }) => (
								<FormItem>
									<FormLabel>برنامه</FormLabel>
									<FormControl>
										<Input {...field} value={field?.value ?? undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="madeh"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ماده</FormLabel>
									<FormControl>
										<Input {...field} value={field?.value ?? undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="sharh_hazineh"
							render={({ field }) => (
								<FormItem>
									<FormLabel>شرح هزینه</FormLabel>
									<FormControl>
										<Input {...field} value={field?.value ?? undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* <FormField
              control={form.control}
              name="BarnameID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شرح برنامه</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field?.value??undefined} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="FaaliatID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شرح فعالیت</FormLabel>
                  <FormControl>
                    
                    <Input type="number" {...field} value={field?.value??undefined} />
                  </FormControl>
                </FormItem>
              )}
            />
         
            <FormField
              control={form.control}
              name="DeletedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاریخ</FormLabel>
                  <FormControl>
                    <DatePicker
                      style={{ width: "100%" }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date ? date.toISOString() : null)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

						<DialogFooter>
							<Button variant="outline" onClick={onCancel}>
								خروج
							</Button>
							<Button type="submit" variant="default">
								ثبت
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
