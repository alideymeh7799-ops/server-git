// import { useUserPermission } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";

import type { CreditEntry } from "#/entity"; // define this type
import useLocale from "@/locales/use-locale";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type CreditModalProps = {
	formValue: CreditEntry;
	title: string;
	show: boolean;
	onOk: (values: CreditEntry, type: "add" | "edit") => void;
	onCancel: VoidFunction;
};

export default function CreditModal({ title, show, formValue, onOk, onCancel }: CreditModalProps) {
	const { locale } = useLocale();

	const form = useForm<CreditEntry>({
		defaultValues: formValue,
	});
	const { t } = useTranslation();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (values: CreditEntry) => {
		onOk(values, formValue.faaliat_id ? "edit" : "add");
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title} </DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}>
						<FormField
							control={form.control}
							name="radif"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("credits.credit_budget_origin.culoumns_header.radif")}</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="program"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("credits.credit_budget_origin.culoumns_header.program")}</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="madeh"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("credits.credit_budget_origin.culoumns_header.madeh")}</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="payment_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel> {t("credits.credit_budget_origin.culoumns_header.sharh_hazineh")}</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="program"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("credits.credit_budget_origin.culoumns_header.sharhe_program")} </FormLabel>
									<FormControl>
										<Input type="text" {...field} value={field.value || undefined} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="program"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("credits.credit_budget_origin.culoumns_header.sharh_faliat")} </FormLabel>
									<FormControl>
										<Input type="text" {...field} value={field.value || undefined} />
									</FormControl>
								</FormItem>
							)}
						/>
						{/* 
            <FormField
              control={form.control}
              name="deletedAt"
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
							<Button variant="outline" className="text-red-500 " onClick={onCancel}>
								{t("buttons.cansel")}
							</Button>
							<Button type="submit" className="text-common-white" variant="default">
								{t("buttons.add")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
