import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/ui/textarea";

import type { RolesType } from "#/entity";

export type RoleModalProps = {
  formValue: RolesType;
  title: string;
  show: boolean;
  onOk: (values: RolesType, type: "add" | "edit") => void;
  onCancel: () => void;
};

export function RoleModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: RoleModalProps) {
  const form = useForm<RolesType>({
    defaultValues: formValue,
  });

  useEffect(() => {
    form.reset(formValue);
  }, [formValue, form]);

  const handleSubmit = form.handleSubmit((values) => {
    const type = formValue?.id ? "edit" : "add";
    onOk(values, type);
  });

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">نام نقش</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} value={field.value || undefined} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            {/* Code */}
            {/* <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">کد نقش</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            /> */}

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">توضیحات</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea {...field} value={field.value || undefined} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </Form>

        <DialogFooter className="pt-4">
          <Button
            className="bg-error hover:bg-error text-white"
            onClick={onCancel}
          >
            انصراف
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            {formValue.id ? "ویرایش" : "افزودن"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
