import { getCookie } from "./useCookie";

// هدر عمومی
export const header = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

// هدر همراه با توکن
const authHeader = () => {
  const staticToken = getCookie("static_token");
  const dynamicToken = getCookie("dynamic_token");

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${dynamicToken || staticToken}`,
  };
};

export default authHeader;
