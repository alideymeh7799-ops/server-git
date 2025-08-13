import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import {
  AmeleKharidTypeData,
  typeDataPersonal,
  YeganTypeData,
} from "@/types/entity";
import { Button } from "@/ui/button";
import { CardContent, CardHeader } from "@/ui/card";
import { Form, Input, message, Popconfirm, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import ModalAgentBuild from "./modal-create";
export interface TypeGetDataYegan {
  data?: YeganTypeData[];
  message: string;
  success: boolean;
}
interface TypeGetDataPersonal {
  data?: typeDataPersonal[];
  message: string;
  success: boolean;
}
const { Option } = Select;

interface TypeGetData {
  data?: AmeleKharidTypeData[];
  message: string;
  success: boolean;
}
const defaultValue: AmeleKharidTypeData = {
  person_id: null,
  yegan_id: null,
  number_hesab: null,
  onvan_hesab: null,
};
const AgentComponent: React.FC = () => {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;
  const [data, setData] = useState<AmeleKharidTypeData[]>([]);
  const [dataYegan, setDataYegan] = useState<YeganTypeData[]>([]);

  const [dataPerson, setDataPerson] = useState<typeDataPersonal[]>([]);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");

  //   !!____STATE GET DATA FOR THE NOW
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  const [modalProps, setModalProps] = useState({
    show: false,
    title: "افزودن عامل جدید",
    formValue: defaultValue,
  });

  const axiosHook = useCustomAxios();
  // !!________GET DATA
  const getData = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.AMELE_KHARID, operationList.GETALL)
  );
  const getDataYegan = axiosHook.useGetData<TypeGetDataYegan>(
    buildApiRoute(resourceList.YEGAN, operationList.GETALL)
  );
  const getDataPersonal = axiosHook.useGetData<TypeGetDataPersonal>(
    buildApiRoute(resourceList.PERSONS, operationList.GETALL)
  );
  // !!________UPDATE DATA
  const sendUpdatePersonnel = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.AMELE_KHARID,
      operationList.UPDATE,
      modalProps?.formValue.id
    )
  );
  // !!_________POST DATA
  const sendCreatePersonnel = axiosHook.usePostData(
    buildApiRoute(resourceList.AMELE_KHARID, operationList.CREATE)
  );

  // !!_________DELETE DATA
  const sendDeletePerson = axiosHook.useDeleteData(
    buildApiRoute(resourceList.AMELE_KHARID, operationList.DELETE)
  );

  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    let isMounted = true;
    if (isMounted && can(resourceList.AMELE_KHARID, operationList.GETALL)) {
      getData.fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  // !!_____GET DATA FOR THE USE_Effect

  // !!GET DATA AND ADD TO SATE FOR THE AMELEKHARID(DATA)
  useEffect(() => {
    const res = getData.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getData.data]);
  // !!GET DATA AND ADD O STATE FOR THE PERSONS AND YEGAN
  useEffect(() => {
    let called = false;
    if (
      !called &&
      can(resourceList.YEGAN, operationList.GETALL) &&
      can(resourceList.PERSONS, operationList.GETALL)
    ) {
      getDataYegan.fetchData();
      getDataPersonal.fetchData();
      called = true;
    }
  }, []);

  useEffect(() => {
    const res = getDataYegan.data;
    if (res?.success && res.data) {
      setDataYegan(res.data);
    }
    const resPerson = getDataPersonal.data;
    if (resPerson?.success && resPerson.data) {
      setDataPerson(resPerson.data);
    }
  }, [getDataYegan.data, getDataPersonal.data]);
  // !!_______POST DATA AND ADD NEW ITEM
  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };
  const handleModalSubmit = async (
    newData: AmeleKharidTypeData,
    type: "edit" | "add"
  ) => {
    let res;

    if (type === "add") {
      res = await sendCreatePersonnel.sendData({
        person_id: Number(newData.person_id),
        yegan_id: Number(newData.yegan_id),
        onvan_hesab: newData.onvan_hesab,
        number_hesab: newData.number_hesab,
      });
    } else {
      res = await sendUpdatePersonnel.sendData({
        person_id: Number(newData.person_id),
        yegan_id: Number(newData.yegan_id),
        onvan_hesab: newData.onvan_hesab,
        number_hesab: newData.number_hesab,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
      type === "add"
        ? message.success("عامل خرید جدید اضافه شد")
        : message.info("عامل خرید ویرایش شد");
    }

    closeModal();
  };

  //!!______DELETED ITEM CREDIT AND BUDGET

  const deleteDataSubmit = async (id: number | string | null) => {
    try {
      let res: any;
      if (id) {
        res = await sendDeletePerson.remove("/" + id.toString());
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
  const getColumns = (): ColumnsType<AmeleKharidTypeData> => {
    const actionsEnabled = {
      canEdit: can(resourceList.AMELE_KHARID, operationList.UPDATE),
      canDelete: can(resourceList.AMELE_KHARID, operationList.DELETE),
    };

    const baseColumns: ColumnsType<AmeleKharidTypeData> = [
      {
        title: "کد عامل خرید",
        dataIndex: "person_id",
        key: "person_id",
      },
      {
        title: "نام عامل خرید",
        dataIndex: "person_id",
        key: "person_id",
      },
      {
        title: "شماره حساب",
        dataIndex: "number_hesab",
        key: "number_hesab",
      },
      {
        title: "عنوان حساب",
        dataIndex: "onvan_hesab",
        key: "onvan_hesab",
      },
    ];

    const actionColumn: ColumnsType<AmeleKharidTypeData>[number] = {
      title: "عملیات",
      key: "actions",
      render: (_, record) => (
        <Space>
          {actionsEnabled.canEdit && (
            <Button
              onClick={() => {
                form.setFieldsValue(record);
                setModalProps({
                  show: true,
                  title: "ویرایش عامل خرید",
                  formValue: record,
                });
              }}
              className="bg-chart3 text-white font-bold hover:bg-primary cursor-pointer "
            >
              ویرایش
            </Button>
          )}
          {actionsEnabled.canDelete && (
            <Popconfirm
              title="آیا مطمئن هستید؟"
              onConfirm={() => deleteDataSubmit(record.id ?? null)}
            >
              <Button className="bg-error-light hover:bg-error cursor-pointer text-white">
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
  // const columns: ColumnsType<AmeleKharidTypeData> = [
  //   {
  //     title: "کد عامل خرید",
  //     dataIndex: "person_id",
  //     key: "person_id",
  //   },
  //   {
  //     title: "نام عامل خرید",
  //     dataIndex: "person_id",
  //     key: "person_id",
  //   },
  //   {
  //     title: "شماره حساب",
  //     dataIndex: "number_hesab",
  //     key: "number_hesab",
  //   },
  //   {
  //     title: "عنوان حساب",
  //     dataIndex: "onvan_hesab",
  //     key: "onvan_hesab",
  //   },
  //   {
  //     title: "عملیات",
  //     key: "actions",
  //     render: (_, record) => (
  //       <Space>
  //         <Button
  //           className="bg-chart1 text-white"
  //           onClick={() => {
  //             form.setFieldsValue(record);

  //             setModalProps((prev) => ({
  //               ...prev,
  //               title: "ویرایش عامل خرید",
  //               show: true,
  //               formValue: record,
  //             }));
  //           }}
  //         >
  //           ویرایش
  //         </Button>
  //         <Popconfirm
  //           title="آیا مطمئن هستید؟"
  //           onConfirm={() => deleteDataSubmit(record.id ? record.id : null)}
  //         >
  //           <Button className="bg-error/70 hover:bg-error text-white">
  //             حذف
  //           </Button>
  //         </Popconfirm>
  //       </Space>
  //     ),
  //   },
  // ];

  return (
    <>
      <CardHeader className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
        <h1 className="text-lg font-semibold text-right w-full sm:w-auto">
          مدیریت عاملین خرید
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {can(resourceList.AMELE_KHARID, operationList.SEARCH) && (
            <>
              <Select
                // value={searchField}
                // onChange={(value) => setSearchField(value)}
                style={{ width: 160 }}
              >
                <Option value="code">کد عامل خرید</Option>
                <Option value="name">نام عامل خرید</Option>
                <Option value="accountNumber">شماره حساب</Option>
                <Option value="accountTitle">عنوان حساب</Option>
              </Select>

              <Input
                placeholder="متن جستجو"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            </>
          )}
          {can(resourceList.AMELE_KHARID, operationList.CREATE) && (
            <Button
              className="text-white cursor-pointer"
              onClick={() => setModalProps((prev) => ({ ...prev, show: true }))}
            >
              افزودن عامل خرید
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
      {modalProps.show && (
        <ModalAgentBuild
          title={modalProps.title}
          show={modalProps.show}
          formValue={modalProps.formValue}
          onOk={handleModalSubmit}
          onCancel={closeModal}
          dataPerson={dataPerson}
          dataYegan={dataYegan}
        />
      )}
    </>
  );
};

export default AgentComponent;
