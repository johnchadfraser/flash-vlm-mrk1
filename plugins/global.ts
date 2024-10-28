import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("scrollTop", () => window.scrollTo(0, 0));
  nuxtApp.provide("dateNowFormat", (value: moment.MomentInput) =>
    moment(value).format("yyyy")
  );
  nuxtApp.provide("dateFormat", (value: moment.MomentInput) =>
    moment(value).format("DD-MM-yyyy")
  );
});
