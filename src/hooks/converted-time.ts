export function convertToShamsiIntl(
  dateStr: string,
  formatType:
    | "full" // دوشنبه 2 مرداد 1404 - 09:27
    | "date" // 1404/05/02
    | "time" // 09:27
    | "weekday" // دوشنبه
    | "custom" // 2 1404
): string {
  // ایجاد شیء تاریخ از UTC
  const date = new Date(dateStr);

  // Formatter با منطقه زمانی ایران
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: "Asia/Tehran", // خیلی مهمه
    weekday: "long",
    year: "numeric",
    month: "numeric", // ماه عددی برای تبدیل راحت‌تر
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = part.value;
    }
    return acc;
  }, {} as Record<string, string>);

  switch (formatType) {
    case "full":
      return `${parts.weekday} ${parts.day} ${getMonthName(parts.month)} ${
        parts.year
      } - ${parts.hour}:${parts.minute}`;
    case "date":
      return `${parts.year}/${("0" + parts.month).slice(-2)}/${(
        "0" + parts.day
      ).slice(-2)}`;
    case "time":
      return `${parts.hour}:${parts.minute}`;
    case "weekday":
      return parts.weekday;
    case "custom":
      return `${parts.day} ${parts.year}`;
    default:
      return formatter.format(date);
  }
}

// نام ماه شمسی
function getMonthName(monthNum: string): string {
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const m = parseInt(monthNum, 10);
  return months[m - 1] || "";
}
