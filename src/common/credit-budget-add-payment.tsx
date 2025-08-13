import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";

import { CreditDetailBargeEtebar, YeganTypeData } from "@/types/entity";
import { Select } from "antd";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";

const { Option } = Select;

export type CreditModalProps = {
  title: string;
  show: boolean;
  formValue: CreditDetailBargeEtebar;
  onOk: (newData: CreditDetailBargeEtebar, type: "edit" | "add") => void;
  onCancel: VoidFunction;
  dataYegan: YeganTypeData[];
};

export default function CreditModalPaymentBudget({
  title,
  show,
  formValue,
  onOk,
  onCancel,
  dataYegan,
}: CreditModalProps) {
  const { t } = useTranslation();
  const form = useForm<CreditDetailBargeEtebar>({
    defaultValues: formValue,
    mode: "onChange", // اعتبارسنجی لحظه‌ای و فعال/غیرفعال کردن دکمه
  });

  const [selectedDate, setSelectedDate] = useState<any>(
    formValue.date_etebar || ""
  );

  useEffect(() => {
    form.reset(formValue);
    setSelectedDate(formValue.date_etebar || "");
  }, [formValue, form]);

  const onSubmit = (values: any) => {
    onOk(
      { ...values, date_etebar: selectedDate },
      formValue.number_etebar ? "edit" : "add"
    );
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number_etebar"
              rules={{
                required: "این فیلد اجباری است",
                minLength: {
                  value: 3,
                  message: "حداقل باید ۳ کاراکتر وارد کنید",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {t("credits.credit_budget_origin.number_payment")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "credits.credit_budget_origin.placholder_number_payment"
                      )}
                      {...field}
                      value={field.value || undefined}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-sm text-red-600 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>
                {t("credits.credit_budget_origin.tarikh_payment")}
              </FormLabel>
              <FormControl>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={selectedDate !== "" ? selectedDate : Date.now()}
                  onChange={(date) => setSelectedDate(date || "")}
                  inputClass="w-full rounded border px-3 py-2"
                  calendarPosition="bottom-right"
                  format="YYYY/MM/DD"
                  placeholder={t(
                    "credits.credit_budget_origin.palceholder_tarikh_payment"
                  )}
                />
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="amount_etebar"
              rules={{
                required: "این فیلد اجباری است",
                min: {
                  value: 1,
                  message: "مقدار باید حداقل ۱ باشد",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {t("credits.credit_budget_origin.payment_counter")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder={t(
                        "credits.credit_budget_origin.placeholder_tarikh_payment"
                      )}
                      value={field.value || undefined}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-sm text-red-600 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yegan_vagozar_id"
              rules={{
                required: "انتخاب یک گزینه الزامی است",
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {t("credits.credit_budget_origin.yegan_vagozar")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      style={{ width: "100%" }}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t(
                        "credits.credit_budget_origin.placeholder_yegan_vagozar"
                      )}
                    >
                      {dataYegan.map((item) => (
                        <Option
                          key={item.id}
                          value={item.id}
                          className="bg-background"
                        >
                          {item.name + "  -  " + " کد یگان » " + item.code}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-sm text-red-600 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                {t("buttons.cansel")}
              </Button>
              <Button
                type="submit"
                className="text-white"
                variant="default"
                disabled={!form.formState.isValid}
              >
                {!formValue.id ? t("buttons.add") : t("buttons.edit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
