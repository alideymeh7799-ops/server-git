import useCustomAxios, { Authorization } from "@/hooks/use-request";
import { usePermission } from "@/hooks/user";
import { YeganTypeData } from "@/types/entity";
import { CardHeader } from "@/ui/card";
import { Select } from "antd";
import { useEffect, useState } from "react";

interface HeaderProps {
  selectedUnit: string | undefined;
  onUnitChange: (value: string) => void;
}
interface TypeGetDataYegan {
  data?: YeganTypeData[];
  message: string;
  success: boolean;
}
const Header: React.FC<HeaderProps> = ({ selectedUnit, onUnitChange }) => {
  const serverAllowed = usePermission();

  const { Option } = Select;
  const axiosHook = useCustomAxios();
  const getData = axiosHook.useGetData<TypeGetDataYegan>("api/yegan", {
    Authorization: Authorization,
  });

  const [data, setData] = useState<YeganTypeData[]>([]);

  // !!_____GET DATA FOR THE USE_Effect
  useEffect(() => {
    serverAllowed.can("tankhah", "getAll") && getData.fetchData();
  }, []);

  useEffect(() => {
    const res = getData.data;
    if (res?.success && res.data) {
      setData(res.data);
    }
  }, [getData.data]);
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold">{"لیست تنخواه "}</div>
        <Select
          className="w-56"
          placeholder={"انتخاب یگان مورد نظر"}
          value={selectedUnit}
          onChange={onUnitChange}
          allowClear
        >
          {data.map((item, index) => (
            <Option key={index} value={item.id}>
              {item.name + " کد یگان » " + item.code}
            </Option>
          ))}
        </Select>
      </div>
    </CardHeader>
  );
};

export default Header;
