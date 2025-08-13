// import { Tree } from "antd";
// import { useEffect, useMemo, useState } from "react";
// import { useForm } from "react-hook-form";

// import { Button } from "@/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
// import { Input } from "@/ui/input";
// import { Label } from "@/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
// import { Textarea } from "@/ui/textarea";
// import { flattenTrees } from "@/utils/tree";

// import type { Role_Old } from "#/entity";
// import { BasicStatus } from "#/enum";
// import useProfile from "@/store/profile";
// import { buildPermissions } from "./permission";

// export type RoleModalProps = {
//   formValue: Role_Old;
//   title: string;
//   show: boolean;
//   onOk: (data: Role_Old) => void;
//   onCancel: VoidFunction;
// };

// export function RoleModal({
//   title,
//   show,
//   formValue,
//   onOk,
//   onCancel,
// }: RoleModalProps) {
//   const form = useForm<any>({
//     defaultValues: formValue,
//   });
//   const keyItemMenu = useProfile((state) => state.keyItemMenu);

//   const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

//   const flattenedPermissions = useMemo(
//     () => flattenTrees(formValue.permission),
//     [formValue.permission]
//   );

//   useEffect(() => {
//     setCheckedKeys(flattenedPermissions.map((item) => item.id));
//     form.reset(formValue);
//   }, [flattenedPermissions, formValue, form]);

//   const handleCheck = (checked: any) => {
//     setCheckedKeys(checked);
//     const selectedPermissions = buildPermissions(keyItemMenu).filter((item) =>
//       checked.includes(item.id)
//     );
//     form.setValue("permission", selectedPermissions);
//   };

//   const handleSubmit = form.handleSubmit(onOk);

//   return (
//     <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <div className="space-y-4">
//             {/* Name */}
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="grid grid-cols-4 items-center gap-4">
//                   <FormLabel className="text-right">نام ادمین</FormLabel>
//                   <div className="col-span-3">
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Code */}
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem className="grid grid-cols-4 items-center gap-4">
//                   <FormLabel className="text-right">کد ادمین</FormLabel>
//                   <div className="col-span-3">
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Order */}
//             <FormField
//               control={form.control}
//               name="order"
//               render={({ field }) => (
//                 <FormItem className="grid grid-cols-4 items-center gap-4">
//                   <FormLabel className="text-right">ترتیب نمایش</FormLabel>
//                   <div className="col-span-3">
//                     <FormControl>
//                       <Input type="number" {...field} />
//                     </FormControl>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Status */}
//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem className="grid grid-cols-4 items-center gap-4">
//                   <FormLabel className="text-right">وضعیت</FormLabel>
//                   <div className="col-span-3">
//                     <FormControl>
//                       <RadioGroup
//                         onValueChange={(value) => field.onChange(Number(value))}
//                         defaultValue={String(field.value)}
//                       >
//                         <div className="flex items-center gap-2">
//                           <RadioGroupItem
//                             value={String(BasicStatus.ENABLE)}
//                             id="enable"
//                           />
//                           <Label htmlFor="enable">فعال</Label>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <RadioGroupItem
//                             value={String(BasicStatus.DISABLE)}
//                             id="disable"
//                           />
//                           <Label htmlFor="disable">غیرفعال</Label>
//                         </div>
//                       </RadioGroup>
//                     </FormControl>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Description */}
//             <FormField
//               control={form.control}
//               name="desc"
//               render={({ field }) => (
//                 <FormItem className="grid grid-cols-4 items-center gap-4">
//                   <FormLabel className="text-right">توضیحات</FormLabel>
//                   <div className="col-span-3">
//                     <FormControl>
//                       <Textarea {...field} />
//                     </FormControl>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Permissions Tree */}
//             <FormField
//               control={form.control}
//               name="permission"
//               render={() => (
//                 <FormItem className="grid grid-cols-4 items-start gap-4">
//                   <FormLabel className="text-right mt-2">دسترسی‌ها</FormLabel>
//                   <div className="col-span-3 max-h-[280px] overflow-auto">
//                     <FormControl>
//                       <Tree
//                         // style={{ direction: "ltr" }}
//                         checkable
//                         checkedKeys={checkedKeys}
//                         treeData={buildPermissions(keyItemMenu)}
//                         fieldNames={{
//                           key: "id",
//                           children: "children",
//                           title: "name",
//                         }}
//                         onCheck={handleCheck}
//                       />
//                     </FormControl>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </Form>

//         <DialogFooter className="pt-4">
//           <Button variant="outline" onClick={onCancel}>
//             انصراف
//           </Button>
//           <Button onClick={handleSubmit}>ذخیره</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
