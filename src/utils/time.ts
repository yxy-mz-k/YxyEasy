import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

// 获取当前具体本周 本月 本季度 本年末尾还差多少天
export const getTimeEndDays = () => {
  const today = dayjs();
  const results: any = {};

  // 1. 本周最后一天（周日）
  // 使用 isoWeek 插件，周一为第一天，周日为最后一天
  const daysUntilWeekEnd = 7 - today.isoWeekday() + 1;
  results.rweek = daysUntilWeekEnd;

  // 2. 本月最后一天
  const lastDayOfMonth = today.endOf("month");
  const daysUntilMonthEnd = lastDayOfMonth.diff(today, "day") + 1;
  results.rmonth = daysUntilMonthEnd;

  // 3. 本季度最后一天
  // 使用 quarterOfYear 插件获取季度信息
  const currentQuarter = today.quarter();
  const quarterEndMonth = currentQuarter * 3; // 季度结束月份
  const lastDayOfQuarter = dayjs()
    .month(quarterEndMonth - 1)
    .endOf("month");
  const daysUntilQuarterEnd = lastDayOfQuarter.diff(today, "day") + 1;
  results.rquarter = daysUntilQuarterEnd;

  // 4. 半年最后一天
  // 判断当前属于上半年还是下半年
  let halfYearEndDate;
  if (today.month() + 1 <= 6) {
    // 月份从0开始，所以+1
    halfYearEndDate = dayjs().month(5).endOf("month"); // 6月最后一天
  } else {
    halfYearEndDate = dayjs().month(11).endOf("month"); // 12月最后一天
  }
  const daysUntilHalfYearEnd = halfYearEndDate.diff(today, "day") + 1;
  results.rhalfyear = daysUntilHalfYearEnd;

  // 5. 年度最后一天
  const yearEndDate = today.endOf("year");
  const daysUntilYearEnd = yearEndDate.diff(today, "day") + 1;
  results.ryear = daysUntilYearEnd;
  return results;
};

// 可以获取各种个是的时间
export const getFormatDay = (date: any, format: any) => {
  return dayjs(date).format(format);
};

// 根据两个日期，计算中间相差多少年月日时分秒
export const getDaysBetween = (
  startDate: any,
  endDate?: any,
  duration?: any,
) => {
  let diffSeconds: any = duration ?? 0;
  const EndD: any = endDate ? dayjs(endDate) : dayjs();
  const StartD: any = startDate ? dayjs(startDate) : null;

  if (StartD) {
    diffSeconds = EndD.diff(StartD, "second");
  }
  const dur = dayjs.duration(diffSeconds, "seconds");

  const years = Math.floor(dur.asYears());
  const months = Math.floor(dur.asMonths()) % 12;
  const days = Math.floor(dur.asDays()) % 30;
  const hours = dur.hours();
  const minutes = dur.minutes();
  const seconds = dur.seconds();

  let str: any = "";
  if (years) {
    str += `${years}年`;
  }
  if (months) {
    str += `${months}月`;
  }
  if (days) {
    str += `${days}天`;
  }
  if (hours) {
    str += `${hours}时`;
  }
  if (minutes) {
    str += `${minutes}分`;
  }
  if (seconds) {
    str += `${seconds}秒`;
  }
  return str;
};
