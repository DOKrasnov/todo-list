import dayjs from "dayjs";

var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

export const today = dayjs().format("MM/DD/YYYY");
export const currentYear = dayjs().format("YYYY");
