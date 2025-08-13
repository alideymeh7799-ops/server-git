import axios from "axios";
import { useCallback, useState } from "react";
import { header } from "./auth-header";
import { getCookie } from "./useCookie";

// const baseAPI = "http://127.0.0.1:8181/";
// const baseAPI = "http://192.168.137.1:8181/";
const baseAPI = "http://65.109.192.18:8181/";
export const Authorization =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWMyNThlNjEtOWEzMi00YzQxLTljMGItZmNiNWUxOGRjYzE5IiwidXNlcm5hbWUiOiJ1c2VyMDgxIiwiZXhwIjoxNzU0MjIxMDQwLCJpYXQiOjE3NTQyMTk5MDB9.39q4VSlGaxEfpBVfFUyp8EvyvFdBWbOPuWQaSdDWMcs";
interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

const useCustomAxios = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: undefined,
    pageSize: undefined,
  });
  const [filters, setFilters] = useState<FilterParams>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const axiosInstance = axios.create({
    baseURL: baseAPI,
    headers: header(),
  });

  const axiosAuthInstance = axios.create({
    baseURL: baseAPI,
    headers: header(),
  });

  axiosAuthInstance.interceptors.request.use((config) => {
    // const staticToken = getCookie("static_token");
    // const dynamicToken = getCookie("dynamic_token");
    return config;
  });

  const withCustomHeaders = (customHeaders: Record<string, string>) => {
    const token = getCookie("token-data");

    const finalHeaders = {
      ...header(),
      ...(token && { Authorization: "Bearer " + token }),
      ...customHeaders,
    };

    return axios.create({
      baseURL: baseAPI,
      headers: finalHeaders,
    });
  };

  const performRequest = useCallback(
    async <T>(
      method: "get" | "post" | "put" | "delete",
      url: string,
      data?: any,
      customHeaders: Record<string, string> = {}
    ): Promise<T> => {
      const token = getCookie("token-data");

      const finalHeaders = {
        ...header(),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
      };

      const axiosClient = axios.create({
        baseURL: baseAPI,
        headers: finalHeaders,
      });

      const params: FilterParams = {
        ...filters,
        ...(searchQuery && { search: searchQuery }),
        page: pagination.page,
        pageSize: pagination.pageSize,
      };

      const config = { params };

      try {
        let response;
        switch (method) {
          case "get":
            response = await axiosClient.get<T>(url, config);
            break;
          case "post":
            response = await axiosClient.post<T>(url, data, config);
            break;
          case "put":
            response = await axiosClient.put<T>(url, data, config);
            break;
          case "delete":
            response = await axiosClient.delete<T>(url, config);
            break;
          default:
            throw new Error("Unsupported method");
        }
        return response.data;
      } catch (err: any) {
        console.error("Request Error:", err);
        throw err;
      }
    },
    [filters, searchQuery, pagination]
  );

  const useGetData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
    // authType: "static" | "dynamic" | null = "static"
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await performRequest<T>(
          "get",
          url,
          undefined,
          customHeaders
          // authType
        );
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, fetchData };
  };

  const usePostData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
    // authType: "static" | "dynamic" | null = "dynamic"
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const sendData = useCallback(
      async (body: any): Promise<T | null> => {
        setLoading(true);
        setError(null);
        try {
          const res = await performRequest<T>(
            "post",
            url,
            body,
            customHeaders
            // authType
          );
          setData(res);

          return res;
        } catch (err) {
          setError(err || true);
          return null;
        } finally {
          setLoading(false);
        }
      },
      [url, customHeaders, performRequest]
    );

    return { data, loading, error, sendData };
  };

  const useUpdateData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
    // authType: "static" | "dynamic" | null = "dynamic"
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const sendData = async (body: any) => {
      setLoading(true);
      setError(null);
      try {
        const res = await performRequest<T>(
          "put",
          url,
          body,
          customHeaders
          // authType
        );
        setData(res);
        return res;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, sendData };
  };

  const useDeleteData = <T>(
    baseUrl: string,
    customHeaders: Record<string, string> = {}
    // authType: "static" | "dynamic" | null = "dynamic"
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const remove = async (idOrUrlSuffix: string = "") => {
      setLoading(true);
      setError(null);
      try {
        const url = `${baseUrl}${idOrUrlSuffix}`;
        const res = await performRequest<T>(
          "delete",
          url,
          undefined,
          customHeaders
          // authType
        );
        setData(res);
        return res;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, remove };
  };

  const addFilter = (
    key: string,
    value: string | number | boolean | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const removeFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearFilters = () => setFilters({});
  const setSearch = (query: string) => setSearchQuery(query);
  const clearSearch = () => setSearchQuery("");
  const setPage = (page: number) =>
    setPagination((prev) => ({ ...prev, page }));
  const setPageSize = (pageSize: number) =>
    setPagination((prev) => ({ ...prev, pageSize, page: 1 }));

  return {
    axiosInstance,
    axiosAuthInstance,
    withCustomHeaders,
    performRequest,
    useGetData,
    usePostData,
    useUpdateData,
    useDeleteData,
    addFilter,
    removeFilter,
    clearFilters,
    setSearch,
    clearSearch,
    setPage,
    setPageSize,
    filters,
    searchQuery,
    pagination,
  };
};

export default useCustomAxios;
