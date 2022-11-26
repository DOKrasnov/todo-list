import dayjs from "dayjs";

/**
 * @file imports a library and stores its associated functions and constants
 */

/**
 * IsSameOrBefore adds .isSameOrBefore() API to returns a boolean indicating if a date is same or before another date.
 * @function isSameOrBefore
 * @example dayjs('2010-10-20').isSameOrBefore('2010-10-19', 'year')
 */
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

/**
 * Current day in MM/DD/YYYY format
 * @constant {string} today
 */
export const today = dayjs().format("MM/DD/YYYY");

/**
 * Current year in '2022' format
 * @constant {string} currentYear
 */
export const currentYear = dayjs().format("YYYY");
