import {
  AmeleKharidTypeData,
  typeDataPersonal,
  YeganTypeData,
} from "@/types/entity";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export type ModalProps = {
  formValue: AmeleKharidTypeData;
  title: string;
  show: boolean;
  onOk: (values: AmeleKharidTypeData, type: "add" | "edit") => void;
  onCancel: VoidFunction;
  dataPerson: typeDataPersonal[];
  dataYegan: YeganTypeData[];
};

export default function ModalAgentBuild({
  title,
  show,
  formValue,
  onOk,
  onCancel,
  dataPerson,
  dataYegan,
}: ModalProps) {
  // const [selectedPaymentType, setSelectedPaymentType] = useState<
  //   number | undefined
  // >(undefined);

  // const [selectedPerson, setSelectedPerson] = useState<number | undefined>(
  //   undefined
  // );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AmeleKharidTypeData>({
    defaultValues: formValue,
    mode: "onChange", // ولیدیشن زنده
  });

  useEffect(() => {
    reset(formValue);
    // if (formValue.yegan_id) {
    //   setSelectedPaymentType(formValue.yegan_id);
    // }
    // if (formValue.person_id) {
    //   setSelectedPerson(formValue.person_id);
    // }
  }, [formValue, reset]);

  const onSubmit = (data: AmeleKharidTypeData) => {
    const values = {
      ...data,
      // yegan_id: selectedPaymentType ? Number(selectedPaymentType) : null,
      // person_id: selectedPerson ? Number(selectedPerson) : null,
    };
    onOk(values, formValue.id ? "edit" : "add");
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* شماره حساب */}
          <Form.Item className="flex flex-col gap-2">
            <label className="text-sm font-medium">شماره حساب</label>
            <Controller
              name="number_hesab"
              control={control}
              rules={{
                required: "شماره حساب الزامی است",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "شماره حساب باید فقط عدد باشد",
                },
                minLength: {
                  value: 10,
                  message: "شماره حساب باید حداقل ۱۰ رقم باشد",
                },
                maxLength: {
                  value: 20,
                  message: "شماره حساب باید حداکثر ۲۰ رقم باشد",
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
            {errors.number_hesab && (
              <p className="text-error mt-0.5 ">
                {errors.number_hesab.message}
              </p>
            )}
          </Form.Item>

          {/* عنوان حساب */}
          <Form.Item className="flex flex-col gap-2">
            <label className="text-sm font-medium">عنوان حساب</label>
            <Controller
              name="onvan_hesab"
              control={control}
              rules={{
                required: "عنوان حساب الزامی است",
                minLength: {
                  value: 3,
                  message: "عنوان حساب باید حداقل ۳ کاراکتر باشد",
                },
                maxLength: {
                  value: 50,
                  message: "عنوان حساب باید حداکثر ۵۰ کاراکتر باشد",
                },
                pattern: {
                  value: /^[آ-یA-Za-z\s]+$/,
                  message: "عنوان حساب باید فقط شامل حروف باشد",
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
            {errors.onvan_hesab && (
              <p className="text-error mt-0.5 ">{errors.onvan_hesab.message}</p>
            )}
          </Form.Item>

          <Form.Item className="flex flex-col gap-2">
            <label className="text-sm font-medium">انتخاب عامل خرید</label>
            <Controller
              name="person_id"
              control={control}
              rules={{ required: "لطفا عامل خرید را انتخاب کنید" }}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value ?? undefined}
                  className="w-full px-2 py-1 border border-accent rounded-md"
                >
                  <option value="" className="bg-background">
                    انتخاب کنید
                  </option>
                  {dataPerson.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-background"
                    >
                      {item.name + " " + item.family}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.person_id && (
              <p className="text-error mt-0.5">{errors.person_id.message}</p>
            )}
          </Form.Item>

          {/* انتخاب یگان */}
          <Form.Item className="flex flex-col gap-2">
            <label className="text-sm font-medium">انتخاب یگان</label>
            <Controller
              name="yegan_id"
              control={control}
              rules={{ required: "لطفا یگان را انتخاب کنید" }}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value ?? undefined}
                  className="w-full px-2 py-1 border border-accent rounded-md"
                >
                  <option value="" className="bg-background">
                    انتخاب کنید
                  </option>
                  {dataYegan.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-background"
                    >
                      {"  نام یگان » " + item.name + " کد یگان » " + item.code}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.yegan_id && (
              <p className="text-error mt-0.5">{errors.yegan_id.message}</p>
            )}
          </Form.Item>

          {/* دکمه‌ها */}
          <Form.Item className="flex justify-end items-center gap-5 mt-4">
            <Button
              type="button"
              className="px-5 py-2 rounded-md ml-2 border-gray-300 text-white bg-error/50 hover:bg-error"
              onClick={onCancel}
            >
              انصراف
            </Button>
            <Button
              type="submit"
              disabled={!isValid} // تا ولیدیشن کامل نشه، فعال نمیشه
              className={`px-5 py-2 rounded-md text-white ${
                isValid
                  ? "bg-success/70 hover:bg-success"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {formValue?.id ? "ویرایش" : "افزودن"}
            </Button>
          </Form.Item>
        </form>
      </DialogContent>
    </Dialog>
  );
}
