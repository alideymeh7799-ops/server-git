// تنظیم کوکی با نام، مقدار و مدت اعتبار (پیش‌فرض 24 ساعت)
export function setCookie(
  cname: string,
  cvalue: string,
  hours: number = 24
): void {
  if (typeof window !== "undefined") {
    const d = new Date();
    d.setTime(d.getTime() + hours * 60 * 60 * 1000); // تبدیل ساعت به میلی‌ثانیه
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/; SameSite=Lax`;
  }
}

// خواندن مقدار کوکی با نام مشخص
export function getCookie(cname: string): string {
  if (typeof window !== "undefined") {
    const name = cname + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const c = cookies[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length);
      }
    }
  }
  return "";
}

// بررسی وجود کوکی (بررسی می‌کند آیا کوکی با این نام وجود دارد یا نه)
export function checkCookie(name: string): boolean {
  return typeof window !== "undefined" && getCookie(name) !== "";
}
