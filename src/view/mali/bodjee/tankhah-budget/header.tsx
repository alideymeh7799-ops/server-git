import { YeganTypeData } from "@/types/entity";
import { CardHeader } from "@/ui/card";
import { Select } from "antd";

interface HeaderProps {
  selectedUnit: string | undefined;
  onUnitChange: (value: string) => void;
  dataYegan: YeganTypeData[];
}

const Header: React.FC<HeaderProps> = ({
  selectedUnit,
  onUnitChange,
  dataYegan,
}) => {
  const { Option } = Select;

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
          {dataYegan.map((item, index) => (
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
