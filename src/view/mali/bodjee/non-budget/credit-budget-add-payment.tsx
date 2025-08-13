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

import { Select } from "antd";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CreditFormData } from "@/types/entity";
import { useTranslation } from "react-i18next";

const { Option } = Select;

export type CreditModalProps = {
  title: string;
  show: boolean;
  formValue: CreditFormData;
  onOk: (values: CreditFormData) => void;
  onCancel: VoidFunction;
};

export default function CreditModalPaymentBudget({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: CreditModalProps) {
  const { t } = useTranslation();
  const form = useForm<CreditFormData>({
    defaultValues: formValue,
  });

  const [selectedDate, setSelectedDate] = useState<string>(
    formValue.creditDate || ""
  );

  useEffect(() => {
    form.reset(formValue);
    setSelectedDate(formValue.creditDate || "");
  }, [formValue, form]);

  const onSubmit = (values: CreditFormData) => {
    onOk({ ...values, creditDate: selectedDate });
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
              name="creditNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>  

                    {t("barge_etebar.creditNumber")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${t("barge_etebar.creditNumber")} " را وارد کنید"`}
                      {...field}
                      value={field?.value||undefined}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>تاریخ برگه اعتبار (شمسی)</FormLabel>
              <FormControl>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={selectedDate}
                  onChange={(date) =>
                    setSelectedDate(date?.format("YYYY/MM/DD") || "")
                  }
                  inputClass="w-full rounded border px-3 py-2"
                  calendarPosition="bottom-right"
                  format="YYYY/MM/DD"
                  placeholder="تاریخ را انتخاب کنید"
                />
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مبلغ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={`${t("barge_etebar.creditNumber")} " را وارد کنید"`}
                      {...field}
                      value={field?.value||undefined}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>یگان واگذار کننده</FormLabel>
                  <FormControl>
                    <Select
                      style={{ width: "100%" }}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="انتخاب کنید"
                    >
                      <Option value="یگان ۱">یگان ۱</Option>
                      <Option value="یگان ۲">یگان ۲</Option>
                      <Option value="یگان ۳">یگان ۳</Option>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                انصراف
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
