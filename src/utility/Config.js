export const BaseUrl = "http://localhost:3030/api/v1/";
// export const BaseUrl = "https://inventory-project-back-end-five.vercel.app/api/v1/";
export const reqHeaders = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
