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

  if (days > 5) {
    return dayjs(value).format("DD MMM, YYYY");
  } else {
    return dayjs(value).fromNow();
  }
};

const plural = function(value, number) {
  return pluralize(value, number);
};

Vue.filter("formattedDate", dateFilter);
Vue.filter("pluralize", plural);
