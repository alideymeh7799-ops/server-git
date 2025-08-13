import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav";
import { Badge } from "@/ui/badge";

export const frontendNavData: NavProps["data"] = [
	{
		name: "sys.nav.dashboard",
		items: [
			{
				title: "sys.nav.workbench",
				path: "/workbench",
				icon: <Icon icon="local:ic-workbench" size="24" />,
			},
			{
				title: "sys.nav.analysis",
				path: "/analysis",
				icon: <Icon icon="local:ic-analysis" size="24" />,
			},
		],
	},
	{
		name: "sys.nav.pages",
		items: [
			// management
			{
				title: "sys.nav.management",
				path: "/management",
				icon: <Icon icon="local:ic-management" size="24" />,
				children: [
					{
						title: "sys.nav.user.index",
						path: "/management/user",
						children: [
							{
								title: "sys.nav.user.profile",
								path: "/management/user/profile",
							},
							{
								title: "sys.nav.user.account",
								path: "/management/user/account",
							},
						],
					},
					{
						title: "sys.nav.system.index",
						path: "/management/system",
						children: [
							{
								title: "sys.nav.system.permission",
								path: "/management/system/permission",
							},
							{
								title: "مدیریت اشخاص",
								path: "/management/system/person",
							},
							{
								title: "sys.nav.system.yegan",
								path: "/management/system/yegan",
							},
							{
								title: "عاملین خرید",
								path: "/management/system/amele-kharid",
							},
							{
								title: "sys.nav.system.role",
								path: "/management/system/role",
							},
							{
								title: "sys.nav.system.user",
								path: "/management/system/user",
							},
						],
					},
				],
			},
			// menulevel
			{
				title: "sys.nav.menulevel.index",
				path: "/menu_level",
				icon: <Icon icon="local:ic-menulevel" size="24" />,
				children: [
					{
						title: "sys.nav.menulevel.credits.index",
						path: "/menu_level/credits",
						children: [
							{
								title: "sys.nav.menulevel.credits.credit_budget",
								path: "/menu_level/credits/credit_budget",
							},

							{
								title: "sys.nav.menulevel.credits.elamie_barghashti_budget",
								path: "/menu_level/credits/elamie_barghashti_budget",
							},
							{
								title: "sys.nav.menulevel.credits.naghd_pardakht_budget",
								path: "/menu_level/credits/naghd_pardakht_budget",
							},
							{
								title: "sys.nav.menulevel.credits.sanad_barghashti_budget",
								path: "/menu_level/credits/sanad_barghashti_budget",
							},
							{
								title: "sys.nav.menulevel.credits.takhsis_etebarat_budget",
								path: "/menu_level/credits/takhsis_etebarat_budget",
							},
							{
								title: "sys.nav.menulevel.credits.tankhah_budget",
								path: "/menu_level/credits/tankhah_budget",
							},
						],
					},

					{
						title: "sys.nav.menulevel.non_credits.index",
						path: "/menu_level/non_credits",
						children: [
							{
								title: "sys.nav.menulevel.non_credits.credit_non_budget",
								path: "/menu_level/non_credits/credit_non_budget",
							},
							{
								title: "sys.nav.menulevel.non_credits.elamie_barghashti_non_budget",
								path: "/menu_level/non_credits/elamie_barghashti_non_budget",
							},
							{
								title: "sys.nav.menulevel.non_credits.naghd_pardakht_non_budget",
								path: "/menu_level/non_credits/naghd_pardakht_non_budget",
							},
							{
								title: "sys.nav.menulevel.non_credits.sanad_barghashti_non_budget",
								path: "/menu_level/non_credits/sanad_barghashti_non_budget",
							},
							{
								title: "sys.nav.menulevel.non_credits.takhsis_etebarat_non_budget",
								path: "/menu_level/non_credits/takhsis_etebarat_non_budget",
							},
							{
								title: "sys.nav.menulevel.non_credits.tankhah_non_budget",
								path: "/menu_level/non_credits/tankhah_non_budget",
							},
						],
					},

					{
						title: "sys.nav.menulevel.Registration_information.index",
						path: "/menu_level/Registration_information",
						children: [
							{
								title: "sys.nav.menulevel.Registration_information.yegan",
								path: "/menu_level/Registration_information/yegan",
							},
							{
								title: "sys.nav.menulevel.Registration_information.amel_kharid",
								path: "/menu_level/Registration_information/amel_kharid",
							},
							{
								title: "sys.nav.menulevel.Registration_information.emza_yegan",
								path: "/menu_level/Registration_information/emza_yegan",
							},
							{
								title: "sys.nav.menulevel.Registration_information.emza_kont",
								path: "/menu_level/Registration_information/emza_kont",
							},
							{
								title: "sys.nav.menulevel.Registration_information.name1",
								path: "/menu_level/Registration_information/name1",
							},
							{
								title: "sys.nav.menulevel.Registration_information.name2",
								path: "/menu_level/Registration_information/name2",
							},
						],
					},
				],
			},
			//padash & ezafekar
			{
				title: "sys.nav.padash.index",
				path: "/padash",
				icon: <Icon icon="local:ic-padash" size="24" />,
				children: [
					{
						title: "sys.nav.padash.padash1.index",
						path: "/padash/padash1",
						children: [
							{
								title: "sys.nav.padash.padash1.padash2",
								path: "/padash/padash1/padash2",
							},

							{
								title: "sys.nav.padash.padash1.padash3",
								path: "/padash/padash1/padash3",
							},
							{
								title: "sys.nav.padash.padash1.padash4",
								path: "/padash/padash1/padash4",
							},
							{
								title: "sys.nav.padash.padash1.padash5",
								path: "/padash/padash1/padash5",
							},
							{
								title: "sys.nav.padash.padash1.padash6",
								path: "/padash/padash1/padash6",
							},
							{
								title: "sys.nav.padash.padash1.padash7",
								path: "/padash/padash1/padash7",
							},
						],
					},

					{
						title: "sys.nav.padash.ezafekar.index",
						path: "/padash/ezafekar",
						children: [
							{
								title: "sys.nav.padash.ezafekar.ezafekar2",
								path: "/padash/ezafekar/ezafekar2",
							},

							{
								title: "sys.nav.padash.ezafekar.ezafekar3",
								path: "/padash/ezafekar/ezafekar3",
							},
							{
								title: "sys.nav.padash.ezafekar.ezafekar4",
								path: "/padash/ezafekar/ezafekar4",
							},
							{
								title: "sys.nav.padash.ezafekar.ezafekar5",
								path: "/padash/ezafekar/ezafekar5",
							},
							{
								title: "sys.nav.padash.ezafekar.ezafekar6",
								path: "/padash/ezafekar/ezafekar6",
							},
							{
								title: "sys.nav.padash.ezafekar.ezafekar7",
								path: "/padash/ezafekar/ezafekar7",
							},
						],
					},
				],
			},
			// errors
			{
				title: "sys.nav.error.index",
				path: "/error",
				icon: <Icon icon="bxs:error-alt" size="24" />,
				children: [
					{
						title: "sys.nav.error.403",
						path: "/error/403",
					},
					{
						title: "sys.nav.error.404",
						path: "/error/404",
					},
					{
						title: "sys.nav.error.500",
						path: "/error/500",
					},
				],
			},
		],
	},
	{
		name: "sys.nav.ui",
		items: [
			// components
			{
				title: "sys.nav.components",
				path: "/components",
				icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
				caption: "sys.nav.custom_ui_components",
				children: [
					{
						title: "sys.nav.icon",
						path: "/components/icon",
					},
					{
						title: "sys.nav.animate",
						path: "/components/animate",
					},
					{
						title: "sys.nav.scroll",
						path: "/components/scroll",
					},
					{
						title: "sys.nav.i18n",
						path: "/components/multi-language",
					},
					{
						title: "sys.nav.upload",
						path: "/components/upload",
					},
					{
						title: "sys.nav.chart",
						path: "/components/chart",
					},
					{
						title: "sys.nav.toast",
						path: "/components/toast",
					},
				],
			},
			// functions
			{
				title: "sys.nav.functions",
				path: "/functions",
				icon: <Icon icon="solar:plain-2-bold-duotone" size="24" />,
				children: [
					{
						title: "sys.nav.clipboard",
						path: "/functions/clipboard",
					},
					{
						title: "sys.nav.token_expired",
						path: "/functions/token_expired",
					},
				],
			},
		],
	},
	{
		name: "sys.nav.others",
		items: [
			{
				title: "sys.nav.permission",
				path: "/permission",
				icon: <Icon icon="mingcute:safe-lock-fill" size="24" />,
			},
			{
				title: "مدیریت اشخاص",
				path: "/person",
				icon: <Icon icon="mingcute:safe-lock-fill" size="24" />,
			},
			{
				title: "sys.nav.permission.page_test",
				path: "/permission/page-test",
				icon: <Icon icon="mingcute:safe-lock-fill" size="24" />,
				auth: ["permission:read"],
				hidden: true,
			},
			{
				title: "sys.nav.calendar",
				path: "/calendar",
				icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
				info: <Badge variant="warning">+12</Badge>,
			},
			{
				title: "sys.nav.kanban",
				path: "/kanban",
				icon: <Icon icon="solar:clipboard-bold-duotone" size="24" />,
			},
			{
				title: "sys.nav.disabled",
				path: "/disabled",
				icon: <Icon icon="local:ic-disabled" size="24" />,
				disabled: true,
			},
			{
				title: "sys.nav.label",
				path: "#label",
				icon: <Icon icon="local:ic-label" size="24" />,
				info: (
					<Badge variant="info">
						<Icon icon="solar:bell-bing-bold-duotone" size={14} />
						New
					</Badge>
				),
			},
			{
				title: "sys.nav.link",
				path: "/link",
				icon: <Icon icon="local:ic-external" size="24" />,
				children: [
					{
						title: "sys.nav.external_link",
						path: "/link/external-link",
					},
					{
						title: "sys.nav.iframe",
						path: "/link/iframe",
					},
				],
			},
			{
				title: "sys.nav.blank",
				path: "/blank",
				icon: <Icon icon="local:ic-blank" size="24" />,
			},
		],
	},
];
