export const useGetUserDetails = () => {
  const info = sessionStorage.getItem("info");

  return JSON.parse(info as string) || {};
};
