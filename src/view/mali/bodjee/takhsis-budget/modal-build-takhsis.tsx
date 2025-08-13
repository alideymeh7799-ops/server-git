import type { TakhsisItem, YeganTypeData } from "#/entity";
import useLocale from "@/locales/use-locale";
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
import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { stateModalTakhsisItem } from ".";

export type CreditModalProps = {
  formValue: TakhsisItem;
  title: string;
  show: boolean;
  onOk: (values: TakhsisItem, type: "add" | "edit") => void;
  onCancel: VoidFunction;
  dataPayment: stateModalTakhsisItem;
  dataYegan: YeganTypeData[];
};

export default function ModalAddTakhsisItem({
  title,
  show,
  formValue,
  onOk,
  onCancel,
  dataPayment,
  dataYegan,
}: CreditModalProps) {
  const [selectedPaymentType, setSelectedPaymentType] = useState<
    number | undefined
  >(formValue.yegan_id || undefined);

  const { locale } = useLocale();
  const [selectedDate, setSelectedDate] = useState<string>(
    formValue?.date_takhsis || ""
  );

  const form = useForm<TakhsisItem>({
    defaultValues: formValue,
    mode: "onChange", // بررسی اعتبار سنجی در هر تغییر
  });

  useEffect(() => {
    form.reset(formValue);
    setSelectedDate(formValue?.date_takhsis || "");
    setSelectedPaymentType(formValue.yegan_id || undefined);
  }, [formValue, form]);

  const onSubmit = (formdata: TakhsisItem) => {
    if (dataPayment.baghi_mande)
      if (Number(formdata.amount_takhsis) > dataPayment.baghi_mande) {
        form.setError("amount_takhsis", {
          type: "manual",
          message: "مبلغ بیشتر از حد مجاز می‌باشد",
        });
        return;
      }
    if (!selectedPaymentType) {
      form.setError("yegan_id", {
        type: "manual",
        message: "انتخاب یگان الزامی است",
      });
      return;
    }
    if (!selectedDate) {
      form.setError("date_takhsis", {
        type: "manual",
        message: "تاریخ تخصیص الزامی است",
      });
      return;
    }

    const values = {
      ...formdata,
      yegan_id: selectedPaymentType ? Number(selectedPaymentType) : null,
      date_takhsis: selectedDate,
    };
    onOk(values, formValue.id ? "edit" : "add");
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* 🔹 بخش نمایش مشخصات برگ اعتبار */}
        <div className="p-3 mb-4 border rounded  text-sm leading-6">
          <p>
            <strong>شماره برگه اعتبار:</strong>{" "}
            {dataPayment.dataItem.number_etebar}
          </p>
          <p>
            <strong>مبلغ کل:</strong>{" "}
            {dataPayment.kol && dataPayment.kol.toLocaleString()} ریال
          </p>
          <p>
            <strong>مبلغ اختصاص یافته:</strong>{" "}
            {dataPayment?.kharj_shode &&
              dataPayment.kharj_shode.toLocaleString()}{" "}
            ریال
          </p>
          <p>
            <strong>باقی‌مانده:</strong>{" "}
            {dataPayment.baghi_mande &&
              dataPayment.baghi_mande.toLocaleString()}{" "}
            ریال
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}
          >
            {/* مبلغ تخصیص */}
            <FormField
              control={form.control}
              name="amount_takhsis"
              rules={{
                required: "مبلغ تخصیص الزامی است",
                min: {
                  value: 1,
                  message: "مبلغ تخصیص باید بزرگتر از صفر باشد",
                },
                validate: (value) => {
                  if (
                    !dataPayment?.baghi_mande &&
                    dataPayment?.baghi_mande !== 0
                  ) {
                    return true;
                  }
                  return (
                    (value && value <= dataPayment.baghi_mande) ||
                    "مبلغ بیشتر از حد مجاز می‌باشد"
                  );
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>مبلغ تخصیص</FormLabel>
                  <FormControl>
                    <InputNumber
                      className="w-full"
                      style={{ width: "100%" }}
                      {...field}
                      value={field.value || null}
                      onChange={(value) => {
                        field.onChange(value);
                        if (
                          typeof dataPayment?.baghi_mande === "number" &&
                          value > dataPayment.baghi_mande
                        ) {
                          form.setError("amount_takhsis", {
                            type: "manual",
                            message: "مبلغ بیشتر از حد مجاز می‌باشد",
                          });
                        } else {
                          form.clearErrors("amount_takhsis");
                        }
                      }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value: any) =>
                        value?.replace(/\$\s?|(,*)/g, "") ?? ""
                      }
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* شرح تخصیص */}
            <FormField
              control={form.control}
              name="sharh_takhsis"
              rules={{
                required: "شرح تخصیص الزامی است",
                minLength: {
                  value: 3,
                  message: "شرح تخصیص باید حداقل 3 کاراکتر باشد",
                },
                maxLength: {
                  value: 200,
                  message: "شرح تخصیص نباید بیش از 200 کاراکتر باشد",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>شرح تخصیص</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* یگان تخصیص‌یافته */}
            <FormField
              control={form.control}
              name="yegan_id"
              rules={{
                validate: () =>
                  selectedPaymentType !== undefined &&
                  selectedPaymentType !== null &&
                  selectedPaymentType !== 0
                    ? true
                    : "انتخاب یگان الزامی است",
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>یگان تخصیص‌یافته</FormLabel>
                  <FormControl>
                    <select
                      className="w-full flex flex-col gap-2 px-2 py-1 border border-accent rounded-b-md"
                      value={selectedPaymentType || ""}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const val = e.target.value;
                        setSelectedPaymentType(val ? Number(val) : undefined);
                        field.onChange(val ? Number(val) : undefined);
                      }}
                    >
                      <option value="">انتخاب کنید</option>
                      {dataYegan.map((item, index) => (
                        <option
                          className="w-full bg-background text-accent-foreground flex items-center justify-start px-2 py-1"
                          key={index}
                          value={item.id}
                        >
                          {"  نام یگان » " +
                            item.name +
                            " کد یگان » " +
                            item.code}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* تاریخ تخصیص */}
            <FormField
              control={form.control}
              name="date_takhsis"
              rules={{
                required: "تاریخ تخصیص الزامی است",
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>تاریخ تخصیص</FormLabel>
                  <FormControl>
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      className="w-full custom-date-picker"
                      value={selectedDate}
                      onChange={(date: any) => {
                        setSelectedDate(date);
                        field.onChange(date);
                      }}
                      inputClass="w-full rounded border px-3 py-2"
                      calendarPosition="bottom-right"
                      format="YYYY/MM/DD"
                      placeholder="تاریخ را انتخاب کنید"
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                className="bg-error-darker/50 hover:bg-error-darker cursor-pointer text-shadow-white "
                onClick={onCancel}
                type="button"
              >
                انصراف
              </Button>
              <Button
                type="submit"
                className="text-common-white"
                variant="default"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {formValue.id ? "ویرایش" : "افزودن"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
