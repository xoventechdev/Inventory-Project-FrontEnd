import { addDays, format, subDays } from "date-fns";

export const BaseUrl = "http://localhost:3030/api/v1/";
// export const BaseUrl = "https://inventory-project-back-end-five.vercel.app/api/v1/";
export const reqHeaders = {
  headers: {
    token: localStorage.getItem("token"),
  },
};

export const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = start - end;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays + 1;
};

export const mergedReportData = (toDate, rangeCount, data) => {
  const dateRange = subDays(toDate, rangeCount - 1);
  let dateArray = [];
  for (let i = 0; i < rangeCount; i++) {
    dateArray.push(format(addDays(dateRange, i), "yyyy-MM-dd"));
  }
  return dateArray.map((date) => {
    if (data) {
      let found = data.find((d) => d._id === date);
      return {
        _id: date,
        total: found ? found.total : 0,
      };
    } else {
      return null;
    }
  });
};
