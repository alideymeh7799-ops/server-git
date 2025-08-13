import en_US from "antd/locale/en_US";
import fa_IR from "antd/locale/fa_IR";
import zh_CN from "antd/locale/zh_CN";
import "dayjs/locale/fa";
import "dayjs/locale/zh-cn";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { LocalEnum } from "#/enum";
import type { Locale as AntdLocal } from "antd/es/locale";

type Locale = keyof typeof LocalEnum;
type Language = {
	locale: keyof typeof LocalEnum;
	icon: string;
	label: string;
	antdLocal: AntdLocal;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
	[LocalEnum.zh_CN]: {
		locale: LocalEnum.zh_CN,
		label: "Chinese",
		icon: "flag-cn",
		antdLocal: zh_CN,
	},
	[LocalEnum.en_US]: {
		locale: LocalEnum.en_US,
		label: "English",
		icon: "flag-us",
		antdLocal: en_US,
	},
	[LocalEnum.fa_IR]: {
		locale: LocalEnum.fa_IR,
		label: "فارسی",
		icon: "flag-ir",
		antdLocal: fa_IR,
	},
};

export default function useLocale() {
	const { t, i18n } = useTranslation();

	const locale = (i18n.resolvedLanguage || LocalEnum.en_US) as Locale;
	const language = LANGUAGE_MAP[locale];

	/**
	 * localstorage -> i18nextLng change
	 */
	const setLocale = (locale: Locale) => {
		i18n.changeLanguage(locale);
		document.documentElement.lang = locale;
		dayjs.locale(locale);

		// تنظیم جهت صفحه برای فارسی
		if (locale === LocalEnum.fa_IR) {
			document.documentElement.dir = "rtl";
		} else {
			document.documentElement.dir = "ltr";
		}
	};

	return {
		t,
		locale,
		language,
		setLocale,
	};
}
