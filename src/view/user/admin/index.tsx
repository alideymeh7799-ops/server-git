// import { ROLE_LIST } from "@/_mock/assets";
// import type { Role_Old } from "#/entity";
import { BasicStatus } from "#/enum";
import { resourceAndOperation } from "@/_mock/item-permission";
import { usePermission } from "@/hooks/user";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Input, Select } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  dataHeaderForTheSearch,
  dataHeaderForTheSearchAdmin,
} from "./permission";
import { RoleModal } from "./role-modal";
const { Option } = Select;
// TODO: fix
// const ROLES: Role_Old[] = ROLE_LIST as Role_Old[];
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
  // role?: string; // نقش
}
type RoleModalProps = {
  formValue: Role_Old;
  title: string;
  show: boolean;
  onOk: (data: Role_Old) => void;
  onCancel: VoidFunction;
};
const DEFAULE_ROLE_VALUE: Role_Old = {
  id: "",
  firstName: "",
  lastName: "",
  nationalId: "",
  personnelNumber: "",
  phoneNumber: "",
  username: "",
  password: "",
  status: BasicStatus.ENABLE,
  startDate: "",
  endDate: "",
};

export default function ManagementAdmin() {
  // !!DATA PROFILE
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<
    "name" | "family" | "nationalId" | "personnelNumber" | "phoneNumber"
  >("name");
  const [searchFieldAdmin, setSearchFieldAdmin] = useState<
    "name" | "family" | "nationalId" | "phoneNumber"
  >("name");
  const [roleModalPros, setRoleModalProps] = useState<RoleModalProps>({
    formValue: { ...DEFAULE_ROLE_VALUE },
    title: "ساخت ادمین جدید",
    show: false,
    onOk: () => {
      setRoleModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setRoleModalProps((prev) => ({ ...prev, show: false }));
    },
  });
  const ROLES: Role_Old[] = [
    {
      id: "1",
      firstName: "علی",
      lastName: "محمدی",
      nationalId: "1234567890",
      personnelNumber: "P001",
      phoneNumber: "09123456789",
      username: "ali.mohammadi",
      password: "",
      status: BasicStatus.ENABLE,
      startDate: "1404/01/01",
      endDate: "1405/12/29",
    },
    {
      id: "2",
      firstName: "حسین",
      lastName: "احمدی",
      nationalId: "0987654321",
      personnelNumber: "P002",
      phoneNumber: "09198765432",
      username: "hossein.ahmadi",
      password: "",
      status: BasicStatus.DISABLE,
      startDate: "1404/02/01",
      endDate: "1405/11/30",
    },
  ];
  const onRegisterUser = (record: Role_Old) => {
    setRoleModalProps((prev) => ({
      ...prev,
      show: true,
      title: "ثبت نام کاربری",
      formValue: {
        ...DEFAULE_ROLE_VALUE,
        id: record.id,
        firstName: record.firstName,
        lastName: record.lastName,
        nationalId: record.nationalId,
        personnelNumber: record.personnelNumber,
        phoneNumber: record.phoneNumber,
      },
    }));
  };
  const columnsPerson: ColumnsType<Role_Old> = [
    {
      title: "نام",
      dataIndex: "firstName",
      width: 150,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      width: 150,
    },
    {
      title: "کد ملی",
      dataIndex: "nationalId",
      width: 150,
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "personnelNumber",
      width: 150,
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      width: 150,
    },

    {
      title: "عملیات",
      key: "operation",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="flex w-full justify-center gap-2">
          <Button
            className="bg-chart3 text-white font-bold"
            onClick={() => onRegisterUser(record)}
          >
            ثبت نام کاربری
          </Button>
        </div>
      ),
    },
  ];
  const columnsAdmins: ColumnsType<Role_Old> = [
    {
      title: "نام",
      dataIndex: "firstName",
      width: 150,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      width: 150,
    },
    {
      title: "کد ملی",
      dataIndex: "nationalId",
      width: 150,
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "personnelNumber",
      width: 150,
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      title: " نام کاربری",
      dataIndex: "username",
      width: 150,
    },
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
    {
      title: "عملیات",
      key: "operation",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="flex w-full justify-center gap-2">
          <Button
            onClick={() => onRegisterUser(record)}
            className="bg-chart3 text-white font-bold hover:bg-primary cursor-pointer "
          >
            ویرایش
          </Button>
        </div>
      ),
    },
  ];

  // const onCreate = () => {
  //   setRoleModalProps((prev) => ({
  //     ...prev,
  //     show: true,
  //     title: "ساخت ادمین جدید",
  //     formValue: {
  //       ...prev.formValue,
  //       ...DEFAULE_ROLE_VALUE,
  //     },
  //   }));
  // };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div> اطلاعات پرسنل</div>
          {can(resourceList.CREDITBUDGET, operationList.SEARCH) && (
            <div className="flex flex-col sm:flex-row gap-2 items-center border p-3 rounded-md bg-card text-card-foreground  w-full sm:w-auto">
              <div className="flex gap-1 items-center justify-start">
                <Input
                  placeholder={"فیلد مورد نظر خود را انتخاب فرمائید"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  className="w-full sm:w-52"
                  style={{ minWidth: "260px" }}
                />
              </div>
              <Select
                value={searchField}
                onChange={(value) => setSearchField(value)}
                className="w-40"
              >
                {dataHeaderForTheSearch.map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="max-h-[460px] overflow-auto">
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columnsPerson}
          dataSource={ROLES}
        />
      </CardContent>
      <CardHeader className="mt-8 border-t border-t-primary/50  pt-4">
        <div className="flex items-center justify-between">
          <div>مدیریت ادمین‌ها</div>
          {can(resourceList.CREDITBUDGET, operationList.SEARCH) && (
            <div className="flex flex-col sm:flex-row gap-2 items-center border p-3 rounded-md bg-card text-card-foreground   w-full sm:w-auto">
              <div className="flex gap-1 items-center justify-start ">
                <Input
                  placeholder={"فیلد مورد نظر خود را انتخاب فرمائید"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // allowClear
                  className="w-full sm:w-64 "
                  style={{ minWidth: "260px" }}
                />
              </div>
              <Select
                value={searchFieldAdmin}
                onChange={(value) => setSearchFieldAdmin(value)}
                className="w-40"
              >
                {dataHeaderForTheSearchAdmin.map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columnsAdmins}
          dataSource={ROLES}
        />
      </CardContent>
      <RoleModal {...roleModalPros} />
    </Card>
  );
}
