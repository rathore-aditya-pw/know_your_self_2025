export const useGetTestSubmission = () => {
  const res = sessionStorage.getItem("testSubmission");

  return JSON.parse(res ?? "{}");
};
