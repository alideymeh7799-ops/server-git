// import { ROLE_LIST } from "@/_mock/assets";
import type { Role_Old } from "#/entity";
import { BasicStatus } from "#/enum";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Table, { type ColumnsType } from "antd/es/table";
// import { RoleModal, type RoleModalProps } from "./role-modal";

// TODO: fix
// const ROLES: Role_Old[] = ROLE_LIST as Role_Old[];
const ROLES: Role_Old[] = [];

// const DEFAULE_ROLE_VALUE: Role_Old = {
//   id: "",
//   name: "",
//   code: "",
//   status: BasicStatus.ENABLE,
//   permission: [],
// };

export default function ManagementAdmin() {
  // const [roleModalPros, setRoleModalProps] = useState<RoleModalProps>({
  //   formValue: { ...DEFAULE_ROLE_VALUE },
  //   title: "ساخت ادمین جدید",
  //   show: false,
  //   onOk: () => {
  //     setRoleModalProps((prev: any) => ({ ...prev, show: false }));
  //   },
  //   onCancel: () => {
  //     setRoleModalProps((prev: any) => ({ ...prev, show: false }));
  //   },
  // });

  const columns: ColumnsType<Role_Old> = [
    {
      title: "نام نقش",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "کد نقش",
      dataIndex: "code",
    },
    { title: "ترتیب", dataIndex: "order", width: 60 },
    {
      title: "وضعیت",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (status) => (
        <Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
          {status === BasicStatus.DISABLE ? "غیرفعال" : "فعال"}
        </Badge>
      ),
    },
    { title: "توضیحات", dataIndex: "desc" },
    {
      title: "عملیات",
      key: "operation",
      align: "center",
      width: 100,
      render: () => (
        <div className="flex w-full justify-center text-gray">
          <Button variant="ghost" size="icon" onClick={() => onEdit()}>
            <Icon icon="solar:pen-bold-duotone" size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon
              icon="mingcute:delete-2-fill"
              size={18}
              className="text-error!"
            />
          </Button>
        </div>
      ),
    },
  ];

  const onCreate = () => {
    // setRoleModalProps((prev: any) => ({
    //   ...prev,
    //   show: true,
    //   title: "ساخت ادمین جدید",
    //   formValue: {
    //     ...prev.formValue,
    //     ...DEFAULE_ROLE_VALUE,
    //   },
    // }));
  };

  const onEdit = () => {
    // formValue: Role_Old
    // setRoleModalProps((prev: any) => ({
    //   ...prev,
    //   show: true,
    //   title: "ویرایش ادمین",
    //   formValue,
    // }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>مدیریت ادمین‌ها</div>
          <Button className="bg-primary text-white" onClick={onCreate}>
            ساخت ادمین جدید
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columns}
          dataSource={ROLES}
        />
      </CardContent>
      {/* <RoleModal {...roleModalPros} /> */}
    </Card>
  );
}
