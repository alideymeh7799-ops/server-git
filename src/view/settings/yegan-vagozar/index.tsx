import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { YeganTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { CardContent, CardHeader } from "@/ui/card";
import { Form, Input, message, Modal, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const defaultValue: YeganTypeData = {
  code: null,
  name: null,
};
interface TypeGetData {
  data?: YeganTypeData[];
  message: string;
  success: boolean;
}
const YeganVagozarComponent: React.FC = () => {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;

  const [data, setData] = useState<YeganTypeData[]>([]);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");

  //   !!____STATE GET DATA FOR THE NOW
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  const [modalProps, setModalProps] = useState({
    show: false,
    title: "افزودن یگان واگذار جدید",
    formValue: defaultValue,
  });

  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getData = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.YEGANVAGOZAR, operationList.GETALL)
  );

  // !!________UPDATE DATA
  const sendUpdateYegan = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.YEGANVAGOZAR,
      operationList.UPDATE,
      modalProps?.formValue.id
    )
  );
  // !!_________POST DATA
  const sendCreateYegan = axiosHook.usePostData(
    buildApiRoute(resourceList.YEGANVAGOZAR, operationList.CREATE)
  );

  // !!_________DELETE DATA
  const sendDeleteYegan = axiosHook.useDeleteData(
    buildApiRoute(resourceList.YEGANVAGOZAR, operationList.DELETE)
  );

  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    if (can(resourceList.YEGANVAGOZAR, operationList.GETALL)) {
      getData.fetchData();
    } else {
      const navigate = useNavigate();
      navigate(-1);
    }
  }, [refreshKey]);

  useEffect(() => {
    const res = getData.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getData.data]);

  // !!_______POST DATA AND ADD NEW ITEM
  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };
  const handleModalSubmit = async (
    newData: YeganTypeData,
    type: "edit" | "add"
  ) => {
    let res;

    if (type === "add") {
      res = await sendCreateYegan.sendData({
        code: Number(newData.code),
        name: newData.name,
      });
    } else {
      res = await sendUpdateYegan.sendData({
        code: Number(newData.code),
        name: newData.name,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
    }

    closeModal();
  };

  //!!______DELETED ITEM CREDIT AND BUDGET

  const deleteDataSubmit = async (id: number | string | null) => {
    try {
      let res: any;
      if (id) {
        res = await sendDeleteYegan.remove("/" + id.toString());
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
  const getColumns = (): ColumnsType<YeganTypeData> => {
    const actionsEnabled = {
      canEdit: can(resourceList.YEGANVAGOZAR, operationList.UPDATE),
      canDelete: can(resourceList.YEGANVAGOZAR, operationList.DELETE),
    };

    const baseColumns: ColumnsType<YeganTypeData> = [
      // {
      //   title: "کد یگان",
      //   dataIndex: "code",
      //   key: "code",
      // },
      {
        title: "نام یگان",
        dataIndex: "name",
        key: "name",
      },
    ];

    const actionColumn: ColumnsType<YeganTypeData>[number] = {
      title: "عملیات",
      key: "actions",
      render: (_, record) => (
        <Space>
          {actionsEnabled.canEdit && (
            <Button
              className="bg-primary/90 hover:bg-primary text-white cursor-pointer  font-bold"
              onClick={() => {
                form.setFieldsValue(record);
                setModalProps((prev) => ({
                  show: true,
                  title: "ویرایش یگان واگذار",
                  formValue: { ...prev.formValue, id: record.id },
                }));
              }}
            >
              ویرایش
            </Button>
          )}
          {actionsEnabled.canDelete && (
            <Popconfirm
              title="آیا مطمئن هستید؟"
              onConfirm={() => deleteDataSubmit(record.id ?? null)}
            >
              <Button className="bg-error-light hover:bg-error font-bold  cursor-pointer text-white">
                حذف
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

  return (
    <>
      <CardHeader className="flex items-center justify-between">
        <h1 className="text-2xl font-bold  text-right w-full sm:w-auto">
          مدیریت یگان های واگذار شده
        </h1>
        <div className="flex items-center gap-2">
          {can(resourceList.YEGANVAGOZAR, operationList.SEARCH) && (
            <Input
              placeholder="جستجوی کد یا نام یگان"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 300 }}
            />
          )}
          {can(resourceList.YEGANVAGOZAR, operationList.CREATE) && (
            <Button
              onClick={() =>
                setModalProps((prev) => ({
                  ...prev,
                  show: true,
                }))
              }
              className="bg-primary/95 text-white dark:bg-primary"
            >
              افزودن یگان جدید
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Table
          rowKey="id"
          columns={getColumns()}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </CardContent>

      <Modal
        title={modalProps.title}
        open={modalProps.show}
        onCancel={() => {
          setModalProps((prev) => ({
            ...prev,
            show: false,
            formValue: defaultValue,
          }));
        }}
        onOk={() => form.submit()}
        okText={modalProps.formValue.id ? "ویرایش " : "افزودن"}
        cancelText="لغو"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            const formattedValues = {
              ...values,
            };
            handleModalSubmit(
              formattedValues,
              modalProps.formValue.id ? "edit" : "add"
            );
          }}
        >
          <Form.Item
            name="code"
            label="کد یگان"
            rules={[{ required: true, message: "لطفا کد یگان را وارد کنید" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="name"
            label="نام یگان"
            rules={[
              { required: true, message: "لطفا نام یگان را وارد کنید" },

              {
                min: 3,
                max: 50,
                message: "نام یگان باید بین ۳ تا ۵۰ کاراکتر باشد",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default YeganVagozarComponent;
