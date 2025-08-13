import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { FaaliatTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { Input, message } from "antd";
import { useEffect, useState } from "react";
import ActivityModal from "./ActivityModal";
import ActivityTable from "./ActivityTable";

interface TypeGetData {
  data?: FaaliatTypeData[];
  message: string;
  success: boolean;
}
const defaultValue: FaaliatTypeData = {
  code: null,
  description: null,
};
export default function FaaliatManager() {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;

  const [search, setSearch] = useState("");

  const [data, setData] = useState<FaaliatTypeData[]>([]);

  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [modalProps, setModalProps] = useState({
    show: false,
    title: "افزودن فعالیت جدید",
    formValue: defaultValue,
  });
  const axiosHook = useCustomAxios();
  // !!GET DATA
  const getData = axiosHook.useGetData<TypeGetData>(
    buildApiRoute(resourceList.FAALIAT, operationList.GETALL)
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted && can(resourceList.FAALIAT, operationList.GETALL)) {
      getData.fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);
  // !!GET DATA AND ADD TO SATE FOR THE AMELEKHARID(DATA)
  useEffect(() => {
    const res = getData.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getData.data]);
  // !!_________POST DATA
  const sendCreate = axiosHook.usePostData(
    buildApiRoute(resourceList.FAALIAT, operationList.CREATE)
  );
  // !!________UPDATE DATA
  const sendUpdate = axiosHook.useUpdateData(
    buildApiRoute(
      resourceList.FAALIAT,
      operationList.UPDATE
      // modalProps?.formValue.id
    )
  );

  // !!_________DELETE DATA
  const sendDelete = axiosHook.useDeleteData(
    buildApiRoute(resourceList.FAALIAT, operationList.DELETE)
  );
  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, show: false }));
  };
  const openModal = (
    record:
      | FaaliatTypeData
      | { code: null; description: null; id?: number | string }
  ) => {
    setModalProps({
      show: true,
      title: "ویرایش  فعالیت",
      formValue: {
        code: record?.code,
        id: record?.id,
        description: record?.description,
      },
    });
  };

  const handleModalSubmit = async (
    newData: FaaliatTypeData,
    type: "edit" | "add"
  ) => {
    let res;

    if (type === "add") {
      res = await sendCreate.sendData({
        code: Number(newData.code),
        description: newData.description,
      });
    } else {
      res = await sendUpdate.sendData({
        code: Number(newData.code),
        description: newData.description,
      });
    }

    if (res) {
      setRefreshKey(Date.now());
      type === "add"
        ? message.success(" فعالیت جدید اضافه شد")
        : message.info(" فعالیت ویرایش شد");
    }

    closeModal();
  };

  const deleteDataSubmit = async (id: number | string | null) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="text-lg font-semibold">مدیریت فعالیت ها</div>
          <div className="flex gap-2">
            {can(resourceList.FAALIAT, operationList.SEARCH) && (
              <Input
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-60"
                allowClear
              />
            )}
            {can(resourceList.FAALIAT, operationList.CREATE) && (
              <Button
                className="text-white bg-primary/95 hover:bg-primary "
                onClick={() => openModal({ code: null, description: null })}
              >
                افزودن فعالیت
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <ActivityTable
        data={data}
        onEdit={openModal}
        onDelete={deleteDataSubmit}
      />

      {modalProps.show && (
        <ActivityModal
          title={modalProps.title}
          show={modalProps.show}
          formValue={modalProps.formValue}
          onOk={handleModalSubmit}
          onCancel={closeModal}
        />
      )}
    </Card>
  );
}
