import type { CreditEntry, FaaliatTypeData } from "#/entity";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type CreditModalProps = {
  formValue: CreditEntry;
  title: string;
  show: boolean;
  onOk: (
    values: CreditEntry & { barname_id: number; faaliat_id: number },
    type: "add" | "edit"
  ) => void;
  onCancel: VoidFunction;
  dataBarname: FaaliatTypeData[];
  dataFaaliat: FaaliatTypeData[];
};

export default function CreditModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
  dataFaaliat,
  dataBarname,
}: CreditModalProps) {
  const { locale } = useLocale();
  const { t } = useTranslation();

  const form = useForm<
    CreditEntry & { barname_id?: number; faaliat_id?: number }
  >({
    defaultValues: formValue,
    mode: "onChange", // اعتبارسنجی زنده
  });

  const [selectedPaymentType, setSelectedPaymentType] = useState<
    number | undefined
  >(formValue.barname_id);
  const [selectedPerson, setSelectedPerson] = useState<number | undefined>(
    formValue.faaliat_id
  );

  useEffect(() => {
    form.reset(formValue);
    setSelectedPaymentType(formValue.barname_id);
    setSelectedPerson(formValue.faaliat_id);
  }, [formValue, form]);

  const onSubmit = (values: CreditEntry) => {
    if (!selectedPaymentType) {
      form.setError("barname_id", {
        type: "required",
        message: "انتخاب برنامه الزامی است",
      });
      return;
    }
    if (!selectedPerson) {
      form.setError("faaliat_id", {
        type: "required",
        message: "انتخاب فعالیت الزامی است",
      });
      return;
    }
    onOk(
      {
        ...values,
        faaliat_id: selectedPerson,
        barname_id: selectedPaymentType,
      },
      formValue.id ? "edit" : "add"
    );
  };

  // بررسی اعتبار فرم به همراه انتخاب برنامه و فعالیت
  const isFormValid =
    form.formState.isValid &&
    selectedPaymentType !== undefined &&
    selectedPerson !== undefined;

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}
          >
            {/* ردیف */}
            <FormField
              control={form.control}
              name="radif"
              rules={{ required: "ردیف الزامی است" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {t("credits.credit_budget_origin.culoumns_header.radif")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noe_etebar"
              rules={{ required: "نوع اعتبار الزامی است" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>نوع اعتبار</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* انتخاب برنامه */}
            <FormField
              control={form.control}
              name="barname_id"
              rules={{ required: "انتخاب برنامه الزامی است" }}
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>انتخاب برنامه</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full px-2 py-1 border border-accent rounded-b-md"
                      value={selectedPaymentType ?? ""}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSelectedPaymentType(val);
                        field.onChange(val);
                      }}
                    >
                      <option value="" disabled className="bg-background">
                        انتخاب کنید
                      </option>
                      {dataBarname.map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                          className="bg-background"
                        >
                          {item.code + "  " + item.description}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* انتخاب فعالیت */}
            <FormField
              control={form.control}
              name="faaliat_id"
              rules={{ required: "انتخاب فعالیت الزامی است" }}
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>انتخاب فعالیت</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full px-2 py-1 border border-accent rounded-b-md"
                      value={selectedPerson ?? ""}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSelectedPerson(val);
                        field.onChange(val);
                      }}
                    >
                      <option value="" disabled className="bg-background">
                        انتخاب کنید
                      </option>
                      {dataFaaliat.map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                          className="bg-background"
                        >
                          {item.code + "  " + item.description}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* ماده */}
            <FormField
              control={form.control}
              name="madeh"
              rules={{ required: "ماده الزامی است" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {t("credits.credit_budget_origin.culoumns_header.madeh")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* توضیحات هزینه */}
            <FormField
              control={form.control}
              name="payment_description"
              rules={{ required: "توضیحات هزینه الزامی است" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    {t(
                      "credits.credit_budget_origin.culoumns_header.sharh_hazineh"
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                className="bg-error/80 hover:bg-error text-white font-bold"
                onClick={onCancel}
              >
                {t("buttons.cansel")}
              </Button>
              <Button
                type="submit"
                className="text-common-white"
                variant="default"
                disabled={!isFormValid}
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
