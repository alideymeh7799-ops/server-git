import useCustomAxios, { Authorization } from "@/hooks/use-request";
import { AmeleKharidTypeData, typeDataPersonal, YeganTypeData } from "@/types/entity";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export type ModalProps = {
	formValue: AmeleKharidTypeData;
	title: string;
	show: boolean;
	onOk: (values: AmeleKharidTypeData, type: "add" | "edit") => void;
	onCancel: VoidFunction;
};
interface TypeGetDataYegan {
	data?: YeganTypeData[];
	message: string;
	success: boolean;
}
interface TypeGetDataPersonal {
	data?: typeDataPersonal[];
	message: string;
	success: boolean;
}
export default function ModalAgentBuild({ title, show, formValue, onOk, onCancel }: ModalProps) {
	const axiosHook = useCustomAxios();
	const getData = axiosHook.useGetData<TypeGetDataYegan>("api/yegan", {
		Authorization: Authorization,
	});
	const getDataPersonal = axiosHook.useGetData<TypeGetDataPersonal>("api/person", {
		Authorization: Authorization,
	});
	const [data, setData] = useState<YeganTypeData[]>([]);

	const [dataPerson, setDataPerson] = useState<typeDataPersonal[]>([]);
	// !!_____GET DATA FOR THE USE_Effect
	useEffect(() => {
		getData.fetchData();
		getDataPersonal.fetchData();
	}, [show]);

	useEffect(() => {
		const res = getData.data;
		if (res?.success && res.data) {
			setData(res.data);
		}
		const resPerson = getDataPersonal.data;
		if (resPerson?.success && resPerson.data) {
			setDataPerson(resPerson.data);
		}
	}, [getData.data, getDataPersonal.data]);
	const { control, handleSubmit, reset } = useForm<AmeleKharidTypeData>({
		defaultValues: formValue,
	});

	const [selectedPaymentType, setSelectedPaymentType] = useState<number | undefined>(undefined);

	const [selectedPerson, setSelectedPerson] = useState<number | undefined>(undefined);

	useEffect(() => {
		reset(formValue);
		if (formValue.yegan_id) {
			setSelectedPaymentType(formValue.yegan_id);
		}
		if (formValue.person_id) {
			setSelectedPerson(formValue.person_id);
		}
	}, [formValue, reset]);

	const onSubmit = (data: AmeleKharidTypeData) => {
		const values = {
			...data,
			yegan_id: selectedPaymentType ? Number(selectedPaymentType) : null,
			person_id: selectedPerson ? Number(selectedPerson) : null,
		};
		onOk(values, formValue.id ? "edit" : "add");
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* شماره حساب */}
					<Form.Item className="flex flex-col gap-2" required>
						<label className="text-sm font-medium">شماره حساب</label>
						<Controller name="number_hesab" control={control} render={({ field }) => <Input {...field} value={field.value || ""} className="w-full" />} />
					</Form.Item>

					{/* عنوان حساب */}
					<Form.Item className="flex flex-col gap-2" required>
						<label className="text-sm font-medium">عنوان حساب</label>
						<Controller name="onvan_hesab" control={control} render={({ field }) => <Input {...field} value={field.value || ""} className="w-full" />} />
					</Form.Item>

					{/* انتخاب یگان */}
					<Form.Item className="flex flex-col gap-2" required>
						<label className="text-sm font-medium">انتخاب عامل خرید </label>
						<select className="w-full flex flex-col gap-2 px-2 py-1 border border-accent rounded-b-md" onChange={(e: any) => setSelectedPerson(e.target.value)}>
							{dataPerson.map((item, index) => (
								<option className="w-full bg-background text-accent-foreground flex items-center justify-start px-2 py-1" key={index} value={item.id}>
									{item.name + "  " + item.family}
								</option>
							))}
						</select>
					</Form.Item>
					<Form.Item className="flex flex-col gap-2" required>
						<label className="text-sm font-medium">انتخاب یگان </label>
						<select
							className="w-full flex flex-col gap-2 px-2 py-1 border border-accent rounded-b-md"
							onChange={(e: any) => setSelectedPaymentType(e.target.value)}
						>
							{data.map((item, index) => (
								<option className="w-full bg-background text-accent-foreground flex items-center justify-start px-2 py-1" key={index} value={item.id}>
									{"  نام یگان » " + item.name + " کد یگان » " + item.code}
								</option>
							))}
						</select>
					</Form.Item>

					{/* دکمه‌ها */}
					<Form.Item className="flex justify-end gap-4 mt-4">
						<Button type="button" className="px-5 py-2 rounded-md border-gray-300 text-white bg-error/50 hover:bg-error" onClick={onCancel}>
							انصراف
						</Button>
						<Button type="submit" className="px-5 py-2 rounded-md text-white bg-success/70 hover:bg-success">
							{formValue?.id ? "ویرایش" : "افزودن"}
						</Button>
					</Form.Item>
				</form>
			</DialogContent>
		</Dialog>
	);
}
