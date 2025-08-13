import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { PeymanKarTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { CardContent, CardHeader } from "@/ui/card";
import { Form, Input, message, Modal, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const defaultValue: PeymanKarTypeData = {
  number_hesab: null,
  name: null,
};
interface TypeGetData {
  data?: PeymanKarTypeData[];
  message: string;
  success: boolean;
}
const PeymanKarComponent: React.FC = () => {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;

  const [data, setData] = useState<PeymanKarTypeData[]>([]);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");

  //   !!____STATE GET DATA FOR THE NOW
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  const [modalProps, setModalProps] = useState({
    show: false,
    title: "افزودن پیمان کار جدید",
    formValue: defaultValue,
  });

  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getData = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.PEYMANKAR, operationList.GETALL)
  );

  // !!________UPDATE DATA
  const sendUpdateYegan = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.PEYMANKAR,
      operationList.UPDATE,
      modalProps?.formValue.id
    )
  );
  // !!_________POST DATA
  const sendCreateYegan = axiosHook.usePostData(
    buildApiRoute(resourceList.PEYMANKAR, operationList.CREATE)
  );

  // !!_________DELETE DATA
  const sendDeleteYegan = axiosHook.useDeleteData(
    buildApiRoute(resourceList.PEYMANKAR, operationList.DELETE)
  );

  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    if (can(resourceList.PEYMANKAR, operationList.GETALL)) {
      getData.fetchData();
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
    newData: PeymanKarTypeData,
    type: "edit" | "add"
  ) => {
    let res;

    if (type === "add") {
      res = await sendCreateYegan.sendData({
        number_hesab: newData.number_hesab?.toString(),
        name: newData.name,
      });
    } else {
      res = await sendUpdateYegan.sendData({
        number_hesab: Number(newData.number_hesab).toString(),
        name: newData.name,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
      type === "add"
        ? message.success("با موفقیت اضافه  شد")
        : message.info("با موفقیت ویرایش شد");
    } else {
      message.error("خطا در ارسال اطلاعات");
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
  const getColumns = (): ColumnsType<PeymanKarTypeData> => {
    const actionsEnabled = {
      canEdit: can(resourceList.YEGAN, operationList.UPDATE),
      canDelete: can(resourceList.YEGAN, operationList.DELETE),
    };

    const baseColumns: ColumnsType<PeymanKarTypeData> = [
      {
        title: "نام پیمانکار",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "شماره حساب ",
        dataIndex: "number_hesab",
        key: "number_hesab",
      },
    ];

    const actionColumn: ColumnsType<PeymanKarTypeData>[number] = {
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
                  title: "ویرایش پیمانکار",
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
          مدیریت یگان ها
        </h1>
        <div className="flex items-center gap-2">
          {can(resourceList.YEGAN, operationList.SEARCH) && (
            <Input
              placeholder="جستجوی    پیمانکار"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 300 }}
            />
          )}
          {can(resourceList.YEGAN, operationList.CREATE) && (
            <Button
              onClick={() =>
                setModalProps((prev) => ({
                  ...prev,
                  show: true,
                }))
              }
              className="bg-primary/95 text-white dark:bg-primary"
            >
              افزودن پیمانکار جدید
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
            name="name"
            label="نام پیمانکار"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number_hesab"
            label="شماره حساب پیمانکار "
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PeymanKarComponent;
