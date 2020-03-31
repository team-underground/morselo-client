import Vue from "vue";
import pluralize from "pluralize";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const dateFilter = function(value) {
  if (!value) return;

  let d1 = dayjs(value).format("YYYY-MM-DD");
  let now = dayjs();

  let days = now.diff(d1, "days");

  if (days <= 1) {
    return dayjs(value).fromNow();
  }
  if (days < 2) {
    return "Yesterday";
  }

  if ([3, 4, 5, 6, 7].includes(days)) {
    return `${days} days ago`;
  } else {
    return dayjs(value).format("DD MMM, YYYY");
  }

  // if (days > 5) {
  //   return dayjs(value).format("DD MMM, YYYY");
  // } else {
  //   return dayjs(value).fromNow();
  // }
};

const plural = function(value, number) {
  return pluralize(value, number);
};

const titleCase = function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

Vue.filter("formattedDate", dateFilter);
Vue.filter("pluralize", plural);
Vue.filter("titleCase", titleCase);
