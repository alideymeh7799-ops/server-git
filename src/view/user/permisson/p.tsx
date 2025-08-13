import { Button } from "@/ui/button";

import { Form, Input } from "antd";

import type { DataNode } from "antd/es/tree";
// const { Panel } = Collapse;

import type { Role_Old } from "#/entity";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Textarea } from "@/ui/textarea";
import { useForm } from "react-hook-form";

export type RoleModalProps = {
  formValue: Role_Old;
  title: string;
  show: boolean;
  onOk: (data: Role_Old) => void;
  onCancel: VoidFunction;
};

export function PermissionModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: RoleModalProps) {
  const form = useForm<Role_Old>({
    defaultValues: formValue,
  });

  // const [checkedPermissions, setCheckedPermissions] = useState<
  //   Record<string, string[]>
  // >({});

  // const handlePermissionChange = (path: string, values: string[]) => {
  //   setCheckedPermissions((prev) => ({
  //     ...prev,
  //     [path]: values,
  //   }));
  // };

  // const renderTreeTitle = (node: any) => {
  //   if (!node.path) return <strong>{node.title}</strong>;
  //   return (
  //     <div className="tree-item">
  //       <span className="tree-title">{node.title}</span>
  //       <Checkbox.Group
  //         options={Object.values(operationPermissionList).map((op) => ({
  //           label: op.label,
  //           value: op.key,
  //         }))}
  //         value={checkedPermissions[node.path]}
  //         onChange={(values) =>
  //           handlePermissionChange(node.path, values as string[])
  //         }
  //       />
  //     </div>
  //   );
  // };

  const generateTreeData = (data: any[]): DataNode[] => {
    return data.map((item) => ({
      title: item.title,
      key: item.path || item.title,
      path: item.path,
      children: item.children ? generateTreeData(item.children) : [],
    }));
  };

  const handleSubmit = form.handleSubmit(onOk);

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">نام نقش</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
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
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">توضیحات</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>{" "}
          {/* <div className="flex w-full  items-center justify-center">
            <Collapse
              accordion
              expandIconPosition="right"
              // style={{ width: "100%", maxHeight: "320px" }}
              className="max-h-[340px]  overflow-auto w-full px-2"
              expandIcon={({ isActive }) => (
                <RightOutlined
                  style={{
                    transform: isActive ? "rotate(90deg)" : "rotate(-180deg)",
                    transition: "transform 0.3s ease",
                  }}
                  className="RightOutlined-collapse"
                />
              )}
            >
              {routes.map((group, idx) => (
                <Panel header={group.title} key={idx}>
                  <Tree
                    switcherIcon={({ expanded }) => (
                      <RightOutlined
                        style={{
                          transform: expanded
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                        className="RightOutlined-tree"
                      />
                    )}
                    treeData={generateTreeData(group.children)}
                    titleRender={renderTreeTitle}
                    defaultExpandAll
                    className="custom-tree"
                  />
                </Panel>
              ))}
            </Collapse>
          </div> */}
        </Form>

        <DialogFooter className="pt-4">
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
