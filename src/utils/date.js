import { FORMAT_DATE, FORMAT_DATE_TIME_2 } from "@/constant";
import moment from "moment";
import MomentTimezone from "moment-timezone";

export const getDaysDifference = (targetDate) => {
	const currentDate = moment();
	const targetDateObj = moment(targetDate);
	return currentDate.diff(targetDateObj, "day");
};

export const formatDateTime = (date, format = FORMAT_DATE_TIME_2) => moment(date).format(format);
export const formatDate = (date, format = FORMAT_DATE) => moment(date).format(format);

export const getDateFromSecondTime = (date) => (date ? moment(date * 1000) : moment());

/**
 * @convertDate
 * @created by falcon at 21/11/2023
 * @params date -> second time number -> need update based
 * @FORMAT_DATE { DD MMM YYYY }
 */
export const convertDate = (date, format = FORMAT_DATE) => {
	return moment(getDateFromSecondTime(date)).format(format);
};

export const convertTimeByMomentTimezoneToLocalTimezone = ({ date, fromTimezone = "Asia/Singapore" }) => {
	const originalTime = MomentTimezone.tz(date, fromTimezone);
	const localTimezone = MomentTimezone.tz.guess();
	return originalTime.tz(localTimezone).format("YYYY-MM-DD HH:mm:ss");
};
