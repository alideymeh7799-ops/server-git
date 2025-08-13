// import { ROLE_LIST } from "@/_mock/assets";
import type { RolesType } from "#/entity";
import { resourceAndOperation } from "@/_mock/item-permission";
import { Icon } from "@/components/icon";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { message, Popconfirm, Space } from "antd";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { RoleModal } from "./role-modal";

interface TypeGetData {
  data?: RolesType[];
  message: string;
  success: boolean;
}
type RoleModalProps = {
  formValue: RolesType;
  title: string;
  show: boolean;
};
const DEFAULE_ROLE_VALUE: RolesType = {
  name: null,
  description: null,
};

export default function ManagementRoles() {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [data, setData] = useState<RolesType[]>([]);
  const [roleModalPros, setRoleModalProps] = useState<RoleModalProps>({
    formValue: { ...DEFAULE_ROLE_VALUE },
    title: "ساخت نقش جدید",
    show: false,
  });
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const axiosHook = useCustomAxios();
  const getData = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.ROLES, operationList.GETALL)
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted && can(resourceList.ROLES, operationList.GETALL)) {
      getData.fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);
  useEffect(() => {
    const res = getData.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getData.data]);

  // !!_________POST DATA
  const sendCreate = axiosHook.usePostData(
    buildApiRoute(resourceList.ROLES, operationList.CREATE)
  );
  // !!________UPDATE DATA
  const sendUpdate = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.ROLES,
      operationList.UPDATE,
      roleModalPros?.formValue.id
    )
  );
  const handleModalSubmit = async (
    newData: RolesType,
    type: "edit" | "add"
  ) => {
    let res;

    if (type === "add") {
      res = await sendCreate.sendData({
        name: newData.name,
        description: newData.description,
      });
    } else {
      res = await sendUpdate.sendData({
        name: newData.name,
        description: newData.description,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
      type === "add"
        ? message.success(" برنامه جدید اضافه شد")
        : message.info(" برنامه ویرایش شد");
    }

    setRoleModalProps({
      formValue: { ...DEFAULE_ROLE_VALUE },
      title: "ساخت نقش جدید",
      show: false,
    });
  };

  // !!_________DELETE DATA
  const sendDelete = axiosHook.useDeleteData(
    buildApiRoute(resourceList.ROLES, operationList.DELETE)
  );
  const deleteDataSubmit = async (id?: number) => {
    try {
      let res: any;
      if (id) {
        res = await sendDelete.remove("/" + id.toString());
      }

      if (res?.success) {
        message.success("با موفقیت حذف شد");
        setRefreshKey(Date.now());
      } else {
        message.error("خطا در حذف");
      }
    } catch (error) {
      message.error(
        error.status === "500" ? "خطا در ارتباط با سرور" : "خطایی رخ داده است"
      );
    }
  };
  const getColumns = () => {
    const actionsEnabled = {
      canEdit: can(resourceList.ROLES, operationList.UPDATE),
      canDelete: can(resourceList.ROLES, operationList.DELETE),
    };

    const baseColumns: any[] = [
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
        dataIndex: "description",
      },
    ];

    const actionColumn = {
      title: "عملیات",
      key: "actions",
      render: (_: RolesType, record: RolesType) => (
        <Space>
          {actionsEnabled.canEdit && (
            <Button
              onClick={() => onEdit(record)}
              className="bg-chart3 text-white font-bold hover:bg-primary cursor-pointer "
            >
              <Icon icon="solar:pen-bold-duotone" size={18} />
              ویرایش
            </Button>
          )}
          {actionsEnabled.canDelete && (
            <Popconfirm
              title="آیا مطمئن هستید؟"
              onConfirm={() => deleteDataSubmit(Number(record.id))}
              okText="بله"
              cancelText="خیر"
            >
              <Button className="bg-error-light hover:bg-error cursor-pointer text-white">
                حذف
                <Icon
                  icon="mingcute:delete-2-fill"
                  size={18}
                  className="text-white!"
                />
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    };

    if (actionsEnabled.canEdit || actionsEnabled.canDelete) {
      baseColumns.push(actionColumn);
    }

    return baseColumns;
  };

  const onCreate = () => {
    setRoleModalProps((prev) => ({
      ...prev,
      show: true,
      title: "ساخت نقش جدید",
      formValue: {
        ...prev.formValue,
        ...DEFAULE_ROLE_VALUE,
      },
    }));
  };

  const onEdit = (formValue: RolesType) => {
    setRoleModalProps((prev) => ({
      ...prev,
      show: true,
      title: "ویرایش نقش",
      formValue,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>مدیریت نقش‌ها</div>
          <Button className="bg-primary text-white" onClick={onCreate}>
            ساخت نقش جدید
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={getColumns()}
          dataSource={data}
        />
      </CardContent>
      <RoleModal
        onOk={handleModalSubmit}
        formValue={roleModalPros.formValue}
        show={roleModalPros.show}
        title={roleModalPros.title}
        onCancel={() => {
          setRoleModalProps((prev) => ({
            ...prev,
            show: false,
            title: "افزودن نقش",
          }));
        }}
      />
    </Card>
  );
}
