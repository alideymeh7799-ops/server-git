import type { Role_Old } from "#/entity";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { PermissionModal, RoleModalProps } from "./permission-modal";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";

const DEFAULE_ROLE_VALUE: Role_Old = {
  id: "",
  name: "",
  code: "",
  desc: "",
  permission: [],
};
const ROLES: Role_Old[] = [
  {
    id: "1",
    name: "مدیر سیستم",
    code: "admin",
    desc: "دسترسی کامل به همه بخش‌ها",
    status: 0,
    order: 1,
    permission: [
      {
        id: "p1",
        parentId: "",
        name: "Dashboard",
        label: "داشبورد",
        type: 0,
        route: "/dashboard",
        icon: "dashboard",
        status: 0,
        order: 1,
        component: "DashboardPage",
        children: [],
      },
      {
        id: "p2",
        parentId: "",
        name: "User Management",
        label: "مدیریت کاربران",
        type: 0,
        route: "/users",
        icon: "users",
        status: 1,
        order: 2,
        component: "UserPage",
        children: [
          {
            id: "p2-1",
            parentId: "p2",
            name: "Add User",
            label: "افزودن کاربر",
            type: 1,
            route: "/users/add",
            order: 1,
            component: "AddUserPage",
          },
          {
            id: "p2-2",
            parentId: "p2",
            name: "Edit User",
            label: "ویرایش کاربر",
            type: 0,
            route: "/users/edit",
            order: 2,
            component: "EditUserPage",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "اپراتور",
    code: "operator",
    desc: "دسترسی محدود به بخش کاربران",
    status: 1,
    order: 2,
    permission: [
      {
        id: "p3",
        parentId: "",
        name: "User View",
        label: "مشاهده کاربران",
        type: 1,
        route: "/users",
        icon: "eye",
        status: 0,
        order: 1,
        component: "UserPage",
      },
    ],
  },
  {
    id: "3",
    name: "مهمان",
    code: "guest",
    desc: "فقط دسترسی به مشاهده داشبورد",
    status: 0,
    order: 3,
    permission: [
      {
        id: "p4",
        parentId: "",
        name: "Dashboard",
        label: "داشبورد",
        type: 1,
        route: "/dashboard",
        icon: "dashboard",
        status: 1,
        order: 1,
        component: "DashboardPage",
      },
    ],
  },
];

export default function ManagementPermission() {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  // const [roleModalProps, setRoleModalProps] = useState<RoleModalProps>({
  //   formValue: { ...DEFAULE_ROLE_VALUE },
  //   title: "اعطای دسترسی ",
  //   show: false,
  //   onOk: () => {
  //     setRoleModalProps((prev) => ({ ...prev, show: false }));
  //   },
  //   onCancel: () => {
  //     setRoleModalProps((prev) => ({ ...prev, show: false }));
  //   },
  // });
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [data, setData] = useState([]);
  const [permissionModalProps, setPermissionModalProps] =
    useState<RoleModalProps>({
      formValue: { ...DEFAULE_ROLE_VALUE },
      title: "اعطای دسترسی",
      show: false,
      onOk: () => {
        setPermissionModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
        setPermissionModalProps((prev) => ({ ...prev, show: false }));
      },
    });
  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getDataBudget = axiosHook.useGetData<any>(
    buildApiRoute(resourceList.PERMISSIONS, operationList.GETALL)
  );
  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    if (can(resourceList.PERSONS, operationList.GETALL)) {
      getDataBudget.fetchData();
    }
  }, [refreshKey]);

  useEffect(() => {
    const res = getDataBudget.data;
    if (res?.success && res.data) {
      setData(res.data);
    } else {
      setRefreshKey(Date.now());
    }
  }, [getDataBudget.data]);
  console.log("data for the ", data);

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
    {
      title: "توضیحات",
      dataIndex: "desc",
    },
    {
      title: "عملیات",
      key: "operation",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="flex w-full justify-center gap-2 text-gray">
          <Button
            className="bg-chart3 text-white font-bold"
            onClick={() => onRegisterPermissions(record)}
          >
            ثبت دسترسی
          </Button>
        </div>
      ),
    },
  ];

  const onRegisterPermissions = (formValue: Role_Old) => {
    setPermissionModalProps((prev) => ({
      ...prev,
      show: true,
      title: `ثبت دسترسی برای ${formValue.name}`,
      formValue,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>مدیریت دسترسی ها</div>
          {/* <Button className="bg-primary text-white" onClick={onCreate}>
            ساخت نقش جدید
          </Button> */}
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
      {permissionModalProps.show && (
        <PermissionModal {...permissionModalProps} />
      )}
    </Card>
  );
}
