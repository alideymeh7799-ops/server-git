import { BasicStatus } from "#/enum";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

interface Role_Old {
  id: string;
  firstName: string; // نام
  lastName: string; // نام خانوادگی
  nationalId: string; // کد ملی
  personnelNumber: string; // شماره پرسنلی
  phoneNumber: string; // شماره تماس
  username: string; // نام کاربری
  password: string; // رمز عبور
  status: BasicStatus; // وضعیت
  startDate: string; // تاریخ شروع (به فرمت ISO یا رشته‌ای که با تقویم شمسی سازگار باشد)
  endDate: string; // تاریخ پایان
  role?: string; // نقش
}

export type RoleModalProps = {
  formValue: Role_Old;
  title: string;
  show: boolean;
  onOk: (data: Role_Old) => void;
  onCancel: VoidFunction;
};

export function RoleModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: RoleModalProps) {
  const form = useForm<Role_Old>({
    defaultValues: formValue,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    form.reset(formValue);
    setConfirmPassword("");
  }, [formValue, form]);

  const handleSubmit = form.handleSubmit((data) => {
    if (data.password !== confirmPassword) {
      form.setError("password", {
        message: "رمز عبور و تأیید رمز عبور باید یکسان باشند",
      });
      return;
    }
    onOk(data);
  });

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-4 w-full">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              rules={{ required: "نام کاربری الزامی است" }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">نام کاربری</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                },
              }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">رمز عبور</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">تأیید رمز عبور</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
              </div>
            </FormItem>

            {/* Role Assignment */}
            <FormField
              control={form.control}
              name="role"
              rules={{ required: "نقش کاربر الزامی است" }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center min-w-40 gap-4">
                  <FormLabel className="text-right">اعطای نقش</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="نقش را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">مدیر</SelectItem>
                          <SelectItem value="user">کاربر</SelectItem>
                          <SelectItem value="editor">ویرایشگر</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              rules={{ required: "وضعیت الزامی است" }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">وضعیت</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={String(BasicStatus.ENABLE)}
                            id="enable"
                          />
                          <Label htmlFor="enable">فعال</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={String(BasicStatus.DISABLE)}
                            id="disable"
                          />
                          <Label htmlFor="disable">غیرفعال</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="w-full grid grid-cols-2">
              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                rules={{ required: "تاریخ شروع الزامی است" }}
                render={({ field }) => (
                  <FormItem className="grid col-span-1 grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right col-span-4">
                      تاریخ شروع فعالیت
                    </FormLabel>
                    <div className="col-span-4">
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={(date) =>
                            field.onChange(date?.toString() || "")
                          }
                          calendar={persian}
                          locale={persian_fa}
                          format="YYYY/MM/DD"
                          inputClass="w-full border border-gray-300 rounded-md p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                rules={{ required: "تاریخ پایان الزامی است" }}
                render={({ field }) => (
                  <FormItem className="grid col-span-1 grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right col-span-4">
                      تاریخ پایان فعالیت
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={(date) =>
                            field.onChange(date?.toString() || "")
                          }
                          calendar={persian}
                          locale={persian_fa}
                          format="YYYY/MM/DD"
                          inputClass="w-full border border-gray-300 rounded-md p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>

        <DialogFooter className="pt-4 flex justify-end gap-2">
          <Button
            className="bg-error hover:bg-error text-white"
            onClick={onCancel}
          >
            انصراف
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            ذخیره
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
