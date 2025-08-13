import axios from "axios";

import { t } from "@/locales/i18n";
import userStore from "@/store/userStore";
import { toast } from "sonner";

import type { Result } from "#/api";
import { ResultEnum } from "#/enum";

// ساخت axios instance
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 50000,
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
});

// Interceptor درخواست
axiosInstance.interceptors.request.use(
	(config: any) => {
		config.headers = {
			...(config.headers ?? {}),
			Authorization: "Bearer Token", // یا توکن واقعی از userStore
		};
		return config;
	},
	(error) => Promise.reject(error),
);

// Interceptor پاسخ
axiosInstance.interceptors.response.use(
	(res: any) => {
		if (!res.data) throw new Error(t("sys.api.apiRequestFailed"));

		const { status, data, message } = res.data;

		const hasSuccess = data && Reflect.has(res.data, "status") && status === ResultEnum.SUCCESS;
		if (hasSuccess) {
			return data;
		}

		throw new Error(message || t("sys.api.apiRequestFailed"));
	},
	(error: any) => {
		const { response, message } = error || {};
		const errMsg = response?.data?.message || message || t("sys.api.errorMessage");

		toast.error(errMsg, { position: "top-center" });

		if (response?.status === 401) {
			userStore.getState().actions.clearUserInfoAndToken();
		}

		return Promise.reject(error);
	},
);

// کلاس API Client
class APIClient {
	get<T = any>(config: any): Promise<T> {
		return this.request<T>({ ...config, method: "GET" });
	}

	post<T = any>(config: any): Promise<T> {
		return this.request<T>({ ...config, method: "POST" });
	}

	put<T = any>(config: any): Promise<T> {
		return this.request<T>({ ...config, method: "PUT" });
	}

	delete<T = any>(config: any): Promise<T> {
		return this.request<T>({ ...config, method: "DELETE" });
	}

	request<T = any>(config: any): Promise<T> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.request<Result>(config)
				.then((res) => {
					resolve(res as unknown as T);
				})
				.catch((e: Error | any) => {
					reject(e);
				});
		});
	}
}

export default new APIClient();
