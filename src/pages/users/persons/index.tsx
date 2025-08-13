import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { PersonalType } from "@/types/entity";
import { Card, CardHeader } from "@/ui/card";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Form, Input, message, Popconfirm, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import UserFormModal from "./create-user-modal";
import { rankOptions, unitCodeOptions } from "./data";
import { Button } from "@/ui/button";

const defaultValue: PersonalType = {
  name: null,
  family: null,
  id_number: null,
  personnel_number: null,
  accountNumber: null,
  bankCode: null,
  fmoSource: null,
  hsaSource: null,
  hsoSource: null,
};
interface TypeGetData {
  data?: PersonalType[];
  message: string;
  success: boolean;
}
const UserManagement: React.FC = () => {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [form] = Form.useForm();

  const [data, setData] = useState<PersonalType[]>([]);
  const [searchText, setSearchText] = useState("");

  // const [searchField, setSearchField] =
  //   useState<keyof PersonalType>("firstName");

  //   !!____STATE GET DATA FOR THE NOW
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  const [modalProps, setModalProps] = useState({
    show: false,
    title: "افزودن کاربر",
    formValue: defaultValue,
  });

  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getDataBudget = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.PERSONS, operationList.GETALL)
  );

  // !!________UPDATE DATA
  const sendUpdatePersonnel = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.PERSONS,
      operationList.UPDATE,
      modalProps?.formValue.id
    )
  );
  // !!_________POST DATA
  const sendCreatePersonnel = axiosHook.usePostData(
    buildApiRoute(resourceList.PERSONS, operationList.CREATE)
  );

  // !!_________DELETE DATA
  const sendDeletePerson = axiosHook.useDeleteData(
    buildApiRoute(resourceList.PERSONS, operationList.DELETE)
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
    }
  }, [getDataBudget.data]);

  // !!_______POST DATA AND ADD NEW ITEM
  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };
  const handleModalSubmit = async (
    newData: PersonalType,
    type: "edit" | "add"
  ) => {
    let res;

    if (type === "add") {
      res = await sendCreatePersonnel.sendData({
        name: newData.name,
        family: newData.family,
        unitCode: newData.accountNumber,
        nationalId: newData.nationalId,
        accountNumber: newData.accountNumber,
        bankCode: newData.bankCode,
        hsaSource: newData.hsaSource,
        fmoSource: newData.fmoSource,
        hsoSource: newData.hsoSource,
        personnel_number: newData.personnelId,
      });
    } else {
      res = await sendUpdatePersonnel.sendData({
        name: newData.name,
        firstName: newData.family,
        id_number: newData.id_number,
        nationalId: newData.nationalId,
        accountNumber: newData.accountNumber,
        bankCode: newData.bankCode,
        hsaSource: newData.hsaSource,
        fmoSource: newData.fmoSource,
        hsoSource: newData.hsoSource,
        personnel_number: newData.personnelId,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
      type === "add"
        ? message.success(" پرسنل جدید اضافه شد")
        : message.info(" پرسنل ویرایش شد");
    }

    closeModal();
  };

  //!!______DELETED ITEM CREDIT AND BUDGET

  const deleteDataSubmit = async (id: number | string | null) => {
    try {
      let res: any;
      if (id) {
        res = await sendDeletePerson.remove(id.toString());
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
  // ??-----------------
  const getColumns = () => {
    const actionsEnabled = {
      canEdit: can(resourceList.PERSONS, operationList.UPDATE),
      canDelete: can(resourceList.PERSONS, operationList.DELETE),
    };

    const baseColumns: any[] = [
      {
        title: "شماره پرسنلی",
        dataIndex: "personnel_number",
        key: "personnel_number",
      },
      {
        title: "نام",
        dataIndex: "name",
        key: "name",
        filteredValue: [searchText],
        // onFilter: (value, record) => record.name,
      },
      {
        title: "نام خانوادگی",
        dataIndex: "family",
        key: "family",
        // filteredValue: [searchText],
        // onFilter: (value, record) => record.name,
      },
      {
        title: "کد یگان",
        dataIndex: "unitCode",
        key: "unitCode",
        render: (value: number | string) =>
          unitCodeOptions.find((opt) => opt.value === value)?.label || value,
      },
      {
        title: "درجه",
        dataIndex: "rank",
        key: "rank",
        render: (value: number | string) =>
          rankOptions.find((opt) => opt.value === value)?.label || value,
      },
      {
        title: "شماره ملی",
        dataIndex: "id_number",
        key: "id_number",
      },
      {
        title: "شماره حساب",
        dataIndex: "accountNumber",
        key: "accountNumber",
      },
      {
        title: "کد بانک",
        dataIndex: "bankCode",
        key: "bankCode",
      },
      {
        title: "ماخذ HSA",
        dataIndex: "hsaSource",
        key: "hsaSource",
      },
      {
        title: "ماخذ FMO",
        dataIndex: "fmoSource",
        key: "fmoSource",
      },
      {
        title: "ماخذ HSO",
        dataIndex: "hsoSource",
        key: "hsoSource",
      },
      // {
      //   title: "تاریخ اعزام",
      //   dataIndex: "dispatchDate",
      //   key: "dispatchDate",
      // },
      // {
      //   title: "نقش",
      //   dataIndex: "role",
      //   key: "role",
      // },
      // {
      //   title: "دسترسی‌ها",
      //   dataIndex: "permissions",
      //   key: "permissions",
      //   render: (permissions: string[]) => permissions.join(", "),
      // },
    ];

    const actionColumn = {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: PersonalType) => (
        <div className="flex gap-2 items-center">
          {(can(resourceList.CREDITBUDGET, operationList.UPDATE) ||
            can(resourceList.CREDITBUDGET, operationList.CREATE)) && (
            <Space size="middle">
              <Button
                className="flex items-center cursor-pointer justify-center px-4 py-1 text-sm font-medium font-iransans bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                onClick={() =>
                  setModalProps((prev) => ({
                    ...prev,
                    show: true,
                    title: "ویرایش شخص",
                    formValue: record,
                  }))
                }
              >
                <EditOutlined />
                ویرایش
              </Button>
              <Popconfirm
                title="آیا از حذف این کاربر مطمئن هستید؟"
                onConfirm={() => deleteDataSubmit(record.id ? record.id : null)}
                okText="بله"
                cancelText="خیر"
              >
                <Button className="flex cursor-pointer items-center justify-center px-4 py-1 text-sm font-medium font-iransans bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors">
                  {" "}
                  <DeleteOutlined />
                  حذف
                </Button>
              </Popconfirm>
            </Space>
          )}
        </div>
      ),
    };

    if (actionsEnabled.canEdit || actionsEnabled.canDelete) {
      baseColumns.push(actionColumn);
    }

    return baseColumns;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">لیست پرسنل</h1>
          <div className="flex items-center  gap-2">
            {can(resourceList.PERSONS, operationList.CREATE) && (
              <Button
                onClick={() => {
                  form.resetFields();
                  setModalProps((prev) => ({ ...prev, show: true }));
                }}
                className="bg-primary/70 hover:bg-primary text-white font-bold"
              >
                افزودن کاربر جدید
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Select
                defaultValue="firstName"
                className="w-60"
                // onChange={(value: any) => setSearchField(value)}
                options={[
                  { label: "نام", value: "firstName" },
                  { label: "شماره پرسنلی", value: "personnelId" },
                  { label: "شماره ملی", value: "nationalId" },
                  { label: "کد یگان", value: "unitCode" },
                  { label: "درجه", value: "rank" },
                ]}
              />
              <Input
                className="w-80"
                placeholder={`عبارت انتخاب شده را جستجو کنید`}
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      {modalProps.show && (
        <UserFormModal
          show={modalProps.show}
          title={modalProps.title}
          formValue={modalProps.formValue}
          onOk={handleModalSubmit}
          onCancel={closeModal}
        />
      )}

      <Table
        columns={getColumns()}
        dataSource={data} // ✅ حالا فیلتر شده رو نشون میده
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1500 }}
      />
    </Card>
  );
};

export default UserManagement;
