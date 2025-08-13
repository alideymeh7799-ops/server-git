import { resourceAndOperation } from "@/_mock/item-permission";
import useProfile from "@/store/profile";
import { useCallback } from "react";

type Operation =
  (typeof resourceAndOperation.operationList)[keyof typeof resourceAndOperation.operationList];
type Resource =
  (typeof resourceAndOperation.resourceList)[keyof typeof resourceAndOperation.resourceList];
export const usePermission = () => {
  const serverReq = useProfile((state) => state.serverReq);

  const can = useCallback(
    (resource: Resource, operation: Operation): boolean => {
      const item = serverReq.find((entry) => entry.name === resource);
      return item ? item.items.includes(operation) : false;
    },
    [serverReq]
  );

  return { can };
};

export const buildApiRoute = (
  resource: Resource,
  operation: Operation,
  id?: string | null | number
): string => {
  return `api/${resource}/${operation}${id ? `/${id}` : ""}`;
};
