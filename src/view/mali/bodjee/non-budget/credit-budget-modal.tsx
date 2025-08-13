// import { useUserPermission } from "@/store/userStore";
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

import type { CreditEntryNonBudget } from "#/entity"; // define this type
import useLocale from "@/locales/use-locale";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
type typeSendData = "edit" | "add";

export type CreditModalProps = {
  formValue: CreditEntryNonBudget;
  title: string;
  show: boolean;
  onOk: (values: CreditEntryNonBudget, action: typeSendData) => void;

  onCancel: VoidFunction;
};

export default function CreditModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: CreditModalProps) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const form = useForm<CreditEntryNonBudget>({
    defaultValues: formValue,
  });

  useEffect(() => {
    form.reset(formValue);
  }, [formValue, form]);

  const onSubmit = (values: CreditEntryNonBudget) => {
    onOk(values, formValue?.id ? "edit" : "add");
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            style={{ direction: locale === "fa_IR" ? "rtl" : "ltr" }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="credit_origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("non_credits.culoumns_header.no_etebar")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${t(
                        "non_credits.culoumns_header.no_etebar"
                      )} راوارد کنید`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="radif"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("non_credits.culoumns_header.radif")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field}placeholder={`${t("non_credits.culoumns_header.radif")} راوارد کنید`} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="sarfasl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("non_credits.culoumns_header.sarfasl")}{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${t(
                        "non_credits.culoumns_header.sarfasl"
                      )} راوارد کنید`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("non_credits.culoumns_header.sharh_hazineh")}{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${t(
                        "non_credits.culoumns_header.sharh_hazineh"
                      )} راوارد کنید`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mojavez"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("non_credits.culoumns_header.mojavez")}{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${t(
                        "non_credits.culoumns_header.mojavez"
                      )} راوارد کنید`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={onCancel}>
                {t("buttons.cansel")}
              </Button>
              <Button
                type="submit"
                className="text-common-white"
                variant="default"
              >
                {formValue.id ? t("buttons.edit") : t("buttons.add")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
