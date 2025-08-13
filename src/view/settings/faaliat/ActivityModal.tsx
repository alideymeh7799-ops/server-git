import { FaaliatTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Input } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  formValue: FaaliatTypeData;
  title: string;
  show: boolean;
  onOk: (values: FaaliatTypeData, type: "add" | "edit") => void;
  onCancel: VoidFunction;
}

export default function ActivityModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FaaliatTypeData>({
    defaultValues: formValue,
    mode: "onChange", // ولیدیشن زنده
  });

  useEffect(() => {
    reset(formValue);
  }, [formValue, reset]);

  const onSubmit = (values: FaaliatTypeData) => {
    onOk(values, formValue.id ? "edit" : "add");
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* کد فعالیت */}
          <div>
            <label className="block mb-1">کد فعالیت</label>
            <Controller
              name="code"
              control={control}
              rules={{
                required: "کد فعالیت الزامی است",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "کد فعالیت باید فقط عدد باشد",
                },
                minLength: {
                  value: 1,
                  message: "کد فعالیت باید حداقل ۱ رقم باشد",
                },
                maxLength: {
                  value: 10,
                  message: "کد فعالیت باید حداکثر ۱۰ رقم باشد",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  value={field.value || ""}
                  className="w-full"
                />
              )}
            />
            {errors.code && (
              <p className="text-error mt-1 text-sm">{errors.code.message}</p>
            )}
          </div>

          {/* توضیحات */}
          <div>
            <label className="block mb-1">توضیحات</label>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "توضیحات الزامی است",
                minLength: {
                  value: 3,
                  message: "توضیحات باید حداقل ۳ کاراکتر باشد",
                },
                maxLength: {
                  value: 200,
                  message: "توضیحات باید حداکثر ۲۰۰ کاراکتر باشد",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ""}
                  className="w-full"
                />
              )}
            />
            {errors.description && (
              <p className="text-error mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* دکمه‌ها */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="px-5 py-2 rounded-md ml-2 border-gray-300 text-white bg-error/50 hover:bg-error"
              onClick={onCancel}
            >
              انصراف
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className={`px-5 py-2 rounded-md text-white ${
                isValid
                  ? "bg-success/70 hover:bg-success"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {formValue.id ? "ویرایش" : "افزودن"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
