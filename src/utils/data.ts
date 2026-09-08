import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export const ranges = {
  今天: [
    dayjs().subtract(0, "day").startOf("day"),
    dayjs().subtract(0, "day").endOf("day"),
  ] as any,
  昨天: [
    dayjs().subtract(1, "day").startOf("day"),
    dayjs().subtract(1, "day").endOf("day"),
  ] as any,
  最近三天: [
    dayjs().subtract(3, "day").startOf("day"),
    dayjs().subtract(0, "day").endOf("day"),
  ] as any,
  最七天: [
    dayjs().subtract(7, "day").startOf("day"),
    dayjs().subtract(0, "day").endOf("day"),
  ] as any,
  本周: [dayjs().startOf("isoWeek"), dayjs().endOf("isoWeek")] as any,
  上周: [
    dayjs().subtract(1, "week").startOf("isoWeek"),
    dayjs().subtract(1, "week").endOf("isoWeek"),
  ] as any,
  本月: [dayjs().startOf("month"), dayjs().endOf("month")] as any,
  上月: [
    dayjs().subtract(1, "month").startOf("month"),
    dayjs().subtract(1, "month").endOf("month"),
  ] as any,
  下月: [
    dayjs().subtract(-1, "month").startOf("month"),
    dayjs().subtract(-1, "month").endOf("month"),
  ] as any,
  本年: [dayjs().startOf("year"), dayjs().endOf("year")] as any,
  上年: [
    dayjs().subtract(1, "year").startOf("year"),
    dayjs().subtract(1, "year").endOf("year"),
  ] as any,
  明年: [
    dayjs().subtract(-1, "year").startOf("year"),
    dayjs().subtract(-1, "year").endOf("year"),
  ] as any,
};
