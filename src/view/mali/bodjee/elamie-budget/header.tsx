import { AmeleKharidTypeData, YeganTypeData } from "@/types/entity";
import { CardHeader } from "@/ui/card";
import { Select } from "antd";

interface HeaderProps {
  selectedUnit: string | undefined;
  onUnitChange: (value: string) => void;
  selectedAgent: string | undefined;
  onAgentChange: (value: string | undefined) => void;
  dataSettingsYegan: YeganTypeData[];
  dataSettingsAmeleKharid: AmeleKharidTypeData[];
}

const Header: React.FC<HeaderProps> = ({
  selectedUnit,
  onUnitChange,
  selectedAgent,
  onAgentChange,
  dataSettingsAmeleKharid,
  dataSettingsYegan,
}) => {
  const { Option } = Select;

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="text-3xl  ">لیست سند های برگشتی</div>
        <div className="flex gap-2 items-center">
          <Select
            className="w-56"
            placeholder={"یگان مورد نظر را انتخاب کنید"}
            value={selectedUnit}
            onChange={onUnitChange}
            allowClear
          >
            {dataSettingsYegan.map((item, index) => (
              <Option key={index + 1} value={item.id}>
                {item.name + " کد یگان » " + item.code}
              </Option>
            ))}
          </Select>

          <Select
            className="w-56"
            placeholder="عامل خرید مورد نظر را انتخاب کنید"
            value={selectedAgent}
            onChange={onAgentChange}
            allowClear
          >
            {dataSettingsAmeleKharid.map((item, index) => (
              <Option key={index + 1} value={item.id}>
                {item.onvan_hesab + " شماره حساب  » " + item.number_hesab}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </CardHeader>
  );
};

export default Header;
