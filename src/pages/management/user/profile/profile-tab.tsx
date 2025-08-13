import { fakeAvatars } from "@/_mock/utils";
import { Icon } from "@/components/icon";
import { useUserInfo } from "@/store/userStore";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Text } from "@/ui/typography";
import { faker } from "@faker-js/faker";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Table, Timeline } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface DataType {
	key: string;
	avatar: string;
	name: string;
	date: string;
	leader: string;
	team: string[];
	status: number;
}

export default function ProfileTab() {
	const { username } = useUserInfo();
	const AboutItems = [
		{
			icon: <Icon icon="fa-solid:user" size={18} />,
			label: "Full Name",
			val: username,
		},
		{
			icon: <Icon icon="eos-icons:role-binding" size={18} />,
			label: "Role",
			val: "Developer",
		},
		{
			icon: <Icon icon="tabler:location-filled" size={18} />,
			label: "Country",
			val: "USA",
		},
		{
			icon: <Icon icon="ion:language" size={18} />,
			label: "Language",
			val: "English",
		},
		{
			icon: <Icon icon="ph:phone-fill" size={18} />,
			label: "Contact",
			val: "(123)456-7890",
		},
		{
			icon: <Icon icon="ic:baseline-email" size={18} />,
			label: "Email",
			val: username,
		},
	];

	const ConnectionsItems = [
		{
			avatar: faker.image.avatarGitHub(),
			name: faker.person.fullName(),
			connections: `${faker.number.int(100)} Connections`,
			connected: faker.datatype.boolean(),
		},

		{
			avatar: faker.image.avatarGitHub(),
			name: faker.person.fullName(),
			connections: `${faker.number.int(100)} Connections`,
			connected: faker.datatype.boolean(),
		},

		{
			avatar: faker.image.avatarGitHub(),
			name: faker.person.fullName(),
			connections: `${faker.number.int(100)} Connections`,
			connected: faker.datatype.boolean(),
		},

		{
			avatar: faker.image.avatarGitHub(),
			name: faker.person.fullName(),
			connections: `${faker.number.int(100)} Connections`,
			connected: faker.datatype.boolean(),
		},

		{
			avatar: faker.image.avatarGitHub(),
			name: faker.person.fullName(),
			connections: `${faker.number.int(100)} Connections`,
			connected: faker.datatype.boolean(),
		},
	];

	const TeamItems = [
		{
			avatar: <Icon icon="devicon:react" size={36} />,
			name: "React Developers",
			members: `${faker.number.int(100)} Members`,
			tag: <Badge variant="warning">Developer</Badge>,
		},
		{
			avatar: <Icon icon="devicon:figma" size={36} />,
			name: "UI Designer",
			members: `${faker.number.int()} Members`,
			tag: <Badge variant="info">Designer</Badge>,
		},
		{
			avatar: <Icon icon="logos:jest" size={36} />,
			name: "Test Team",
			members: `${faker.number.int(100)} Members`,
			tag: <Badge variant="success">Test</Badge>,
		},
		{
			avatar: <Icon icon="logos:nestjs" size={36} />,
			name: "Nest.js Developers",
			members: `${faker.number.int(100)} Members`,
			tag: <Badge variant="warning">Developer</Badge>,
		},

		{
			avatar: <Icon icon="logos:twitter" size={36} />,
			name: "Digital Marketing",
			members: `${faker.number.int(100)} Members`,
			tag: <Badge variant="info">Marketing</Badge>,
		},
	];

	const items = [
		{
			key: "1",
			label: (
				<div
					className="flex items-center text-gray"
					onClick={() => {}}
					// onKeyDown={(e) => {}}
				>
					<Icon icon="solar:pen-bold" />
					<span className="ml-2">ویرایش</span>
				</div>
			),
		},
		{
			key: "2",
			label: (
				<div
					className="flex items-center text-gray"
					onClick={() => {}}
					// onKeyDown={(e) => {}}
				>
					<Icon icon="solar:eraser-bold" />
					<span className="ml-2">حذف</span>
				</div>
			),
		},
		{
			key: "3",
			label: (
				<div
					className="flex items-center text-warning"
					onClick={() => {}}
					// onKeyDown={(e) => {}}
				>
					<Icon icon="solar:trash-bin-trash-bold" />
					<span className="ml-2">ثبت برگ اعتبار</span>
				</div>
			),
		},
	];

	const fakeProjectItems = () => {
		const arr: DataType[] = [];
		for (let i = 0; i <= 25; i += 1) {
			arr.push({
				key: faker.string.uuid(),
				avatar: faker.image.urlPicsumPhotos(),
				name: faker.company.buzzPhrase(),
				date: faker.date.past().toDateString(),
				leader: faker.person.fullName(),
				team: fakeAvatars(faker.number.int({ min: 2, max: 5 })),
				status: faker.number.int({ min: 50, max: 99 }),
			});
		}
		return arr;
	};

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const handleMenuItemClick = (menuInfo: any) => {
		setDropdownOpen(false);
		menuInfo.domEvent.stopPropagation();
	};

	const ProjectColumns: ColumnsType<DataType> = [
		{
			title: "برنامه",
			align: "center",
			dataIndex: "name",
			render: (_, record) => (
				<div className="ml-2 flex flex-col items-center">
					<span className="font-semibold">{record.name}</span>
					<span className="text-xs opacity-50">{record.date}</span>
				</div>
			),
		},
		{
			title: "فعالیت",
			align: "center",
			dataIndex: "name",
			render: (_, record) => (
				<div className="ml-2 flex flex-col items-center">
					<span className="font-semibold">{record.name}</span>
				</div>
			),
		},
		{
			title: "ردیف",
			align: "center",
			dataIndex: "name",
			render: (_, record) => (
				<div className="ml-2 flex flex-col items-center">
					<span className="font-semibold">{record.name}</span>
				</div>
			),
		},
		{
			title: "ماده",
			align: "center",
			dataIndex: "name",
			render: (_, record) => (
				<div className="ml-2 flex flex-col items-center">
					<span className="font-semibold">{record.name}</span>
				</div>
			),
		},
		{
			title: "شرح هزینه",
			align: "center",
			dataIndex: "name",
			render: (_, record) => (
				<div className="ml-2 flex flex-col items-center">
					<span className="font-semibold">{record.name}</span>
				</div>
			),
		},
		{
			title: "ACTIONS",
			dataIndex: "action",
			render: () => (
				<div className="flex gap-2">
					<Button className="bg-success text-white">ویرایش</Button>
					<Button className="bg-success text-white">حذف</Button>
					<Button className="bg-success text-white">ثبت برگه اعتبار</Button>
				</div>
			),
		},
		{
			title: "عملیات",
			align: "right",
			dataIndex: "action2",
			render: () => (
				<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="text-gray!">
							<Icon icon="dashicons:ellipsis" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{items?.map((item) => {
							if (item && "key" in item && "label" in item) {
								return (
									<DropdownMenuItem key={item.key} onClick={() => handleMenuItemClick({ key: item.key })}>
										{item.label}
									</DropdownMenuItem>
								);
							}
							return null;
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	return (
		<>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<Card>
						<CardHeader>
							<CardTitle>About</CardTitle>
							<CardDescription>{faker.lorem.paragraph()}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-4">
								{AboutItems.map((item) => (
									<div className="flex" key={item.label}>
										<div className="mr-2">{item.icon}</div>
										<div className="mr-2">{item.label}:</div>
										<div className="opacity-50">{item.val}</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="flex-2">
					<Card>
						<CardHeader>
							<CardTitle>Activity Timeline</CardTitle>
						</CardHeader>
						<CardContent>
							<Timeline
								className="mt-4! w-full"
								items={[
									{
										color: themeVars.colors.palette.error.default,
										children: (
											<div className="flex flex-col">
												<div className="flex items-center justify-between">
													<Text>8 Invoices have been paid</Text>
													<div className="opacity-50">Wednesday</div>
												</div>
												<Text variant="caption" color="secondary">
													Invoices have been paid to the company.
												</Text>

												<div className="mt-2 flex items-center gap-2">
													<Icon icon="local:file-pdf" size={30} />
													<span className="font-medium opacity-60">invoice.pdf</span>
												</div>
											</div>
										),
									},
									{
										color: themeVars.colors.palette.primary.default,
										children: (
											<div className="flex flex-col">
												<div className="flex items-center justify-between">
													<Text>Create a new project for client 😎</Text>
													<div className="opacity-50">April, 18</div>
												</div>
												<Text variant="caption" color="secondary">
													Invoices have been paid to the company.
												</Text>
												<div className="mt-2 flex items-center gap-2">
													<img alt="" src={faker.image.avatarGitHub()} className="h-8 w-8 rounded-full" />
													<span className="font-medium opacity-60">{faker.person.fullName()} (client)</span>
												</div>
											</div>
										),
									},
									{
										color: themeVars.colors.palette.info.default,
										children: (
											<div className="flex flex-col">
												<div className="flex items-center justify-between">
													<Text>Order #37745 from September</Text>
													<div className="opacity-50">January, 10</div>
												</div>
												<Text variant="caption" color="secondary">
													Invoices have been paid to the company.
												</Text>
											</div>
										),
									},
									{
										color: themeVars.colors.palette.warning.default,
										children: (
											<div className="flex flex-col">
												<div className="flex items-center justify-between">
													<Text>Public Meeting</Text>
													<div className="opacity-50">September, 30</div>
												</div>
											</div>
										),
									},
								]}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<Card>
						<CardHeader>
							<CardTitle className="w-full flex items-center justify-between">
								<span>Connections</span>
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" />
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex w-full flex-col gap-4">
								{ConnectionsItems.map((item) => (
									<div className="flex" key={item.name}>
										<img alt="" src={item.avatar} className="h-10 w-10 flex-none rounded-full" />
										<div className="ml-4 flex flex-1 flex-col">
											<span className="font-semibold">{item.name}</span>
											<span className="mt-1 text-xs opacity-50">{item.connections}</span>
										</div>
										<div
											className="flex h-8 w-8 flex-none items-center justify-center rounded"
											style={{
												backgroundColor: item.connected ? themeVars.colors.palette.primary.default : "transparent",
												border: item.connected ? "" : `1px solid ${themeVars.colors.palette.primary.default}`,
											}}
										>
											<Icon icon="tdesign:user" color={item.connected ? "#fff" : themeVars.colors.palette.primary.default} size={20} />
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="flex-1">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>Teams</CardTitle>
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex w-full flex-col gap-4">
								{TeamItems.map((item) => (
									<div className="flex" key={item.name}>
										{item.avatar}
										<div className="ml-4 flex flex-1 flex-col">
											<span className="font-semibold">{item.name}</span>
											<span className="mt-1 text-xs opacity-50">{item.members}</span>
										</div>
										<div className="h-6">{item.tag}</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<Card>
						<CardHeader>
							<CardTitle>Projects</CardTitle>
						</CardHeader>
						<CardContent>
							<Table rowSelection={{ type: "checkbox" }} columns={ProjectColumns} dataSource={fakeProjectItems()} />
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
