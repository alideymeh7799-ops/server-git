import { resourceAndOperation } from "@/_mock/item-permission";
import useCustomAxios from "@/hooks/use-request";
import { buildApiRoute, usePermission } from "@/hooks/user";
import { Button } from "@/ui/button";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";

type Field = {
  label: string;
  name: string;
  value?: string;
  editable?: boolean;
};

type SignersPageProps = {
  title: string;
  fields: Field[];
  type: "emza_yegans" | "emza_conts" | "emza_sanad_barghashtis";
};

const SignersPage: React.FC<SignersPageProps> = ({ title, fields, type }) => {
  const { can } = usePermission();
  const { operationList, resourceList } = resourceAndOperation;

  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, field.value || ""]))
  );
  const resourceMap = {
    emza_yegans: resourceList.ELEMEBARGASHTI,
    emza_conts: resourceList.EMZA_TANKHAH,
    emza_sanad_barghashtis: resourceList.EMZA_SANAD_BARGASHTI,
  } as const;

  const axiosHook = useCustomAxios();
  // const [data, setData] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  // !!GET DATA
  console.log("setRefreshKey alaki", setRefreshKey);

  const getData = axiosHook.useGetData<any>(
    buildApiRoute(resourceMap[type], operationList.GETALL)
    // `${type}/${operationList.GETALL}`
  );
  console.log("da", can(resourceList.EMZA_SANAD_BARGASHTI, "create"));

  useEffect(() => {
    // let isMounted = true;

    getData.fetchData();

    // return () => {
    //   isMounted = false;
    // };
  }, [refreshKey]);

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    Object.fromEntries(fields.map((field) => [field.name, false]))
  );

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (name: string) => {
    setEditableFields((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = () => {
    console.log("اطلاعات ثبت‌شده:", formData);
  };

  // if (can(resourceMap[type], operationList.GETALL))
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 sm:p-10 transition-colors">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 text-gray-800 dark:text-white">
          ✍️ {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fields.map((field) => {
            const isEditable = editableFields[field.name];

            return (
              <div key={field.name} className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {field.label}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    value={formData[field.name]}
                    disabled={!isEditable}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className={`w-full transition-all ${
                      isEditable
                        ? "bg-white dark:bg-gray-800 border-blue-500"
                        : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500"
                    }`}
                  />
                  {(can(resourceMap[type], "create") ||
                    can(resourceMap[type], "update")) && (
                    <Button
                      onClick={() => toggleEdit(field.name)}
                      className={`flex items-center cursor-pointer px-[10px] py-2 justify-center duration-300 ${
                        isEditable ? "bg-chart2  " : "bg-chart3"
                      }`}
                    >
                      {isEditable ? <CheckOutlined /> : <EditOutlined />}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {(can(resourceMap[type], "create") ||
          can(resourceMap[type], "update")) && (
          <div className="mt-10 flex items-center justify-center w-full">
            <Button
              className="w-full max-w-[240px] text-white bg-success font-bold text-lg"
              onClick={handleSubmit}
            >
              ثبت اطلاعات
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignersPage;
