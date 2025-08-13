import useCustomAxios, { Authorization } from "@/hooks/use-request";
import { AmeleKharidTypeData, YeganTypeData } from "@/types/entity";
import { CardHeader } from "@/ui/card";
import { Select } from "antd";
import { useEffect, useState } from "react";

interface HeaderProps {
	selectedUnit: string | undefined;
	onUnitChange: (value: string) => void;
	selectedAgent: string | undefined;
	onAgentChange: (value: string | undefined) => void;
}
interface TypeGetDataYegan {
	data?: YeganTypeData[];
	message: string;
	success: boolean;
}
interface TypeGetDataAmeleKharid {
	data?: AmeleKharidTypeData[];
	message: string;
	success: boolean;
}
const Header: React.FC<HeaderProps> = ({ selectedUnit, onUnitChange, selectedAgent, onAgentChange }) => {
	// !!GET DATA YEGAN FOR THE SELECTED
	const [dataYegan, setDataYegan] = useState<YeganTypeData[]>([]);
	const axiosHook = useCustomAxios();
	const getDataYegan = axiosHook.useGetData<TypeGetDataYegan>("api/yegan", {
		Authorization: Authorization,
	});
	const [dataAmeleKharid, setDataAmeleKharid] = useState<AmeleKharidTypeData[]>([]);
	useEffect(() => {
		const res = getDataYegan.data;
		if (res?.success && res.data) {
			setDataYegan(res.data);
		}
	}, [getDataYegan.data]);
	//!!GET DATA AMELEKHARID THE SELCTED

	const getDataAmeleKharid = axiosHook.useGetData<TypeGetDataAmeleKharid>("api/amelkharid", {
		Authorization: Authorization,
	});
	useEffect(() => {
		getDataYegan.fetchData();
		getDataAmeleKharid.fetchData();
	}, []);

	useEffect(() => {
		const res = getDataAmeleKharid.data;
		if (res?.success && res.data) {
			setDataAmeleKharid(res.data);
		}
	}, [getDataAmeleKharid.data]);
	//   !!GET DATA AMELIN KHARID

	const { Option } = Select;
	console.log("dataAmeleKharid", dataAmeleKharid);

	return (
		<CardHeader>
			<div className="flex items-center justify-between">
				<div className="text-3xl  ">لیست سند های برگشتی</div>
				<div className="flex gap-2 items-center">
					<Select className="w-56" placeholder={"یگان مورد نظر را انتخاب کنید"} value={selectedUnit} onChange={onUnitChange} allowClear>
						{dataYegan.map((item, index) => (
							<Option key={index + 1} value={item.id}>
								{item.name + " کد یگان » " + item.code}
							</Option>
						))}
					</Select>

					<Select className="w-56" placeholder="عامل خرید مورد نظر را انتخاب کنید" value={selectedAgent} onChange={onAgentChange} allowClear>
						{dataAmeleKharid.map((item, index) => (
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
