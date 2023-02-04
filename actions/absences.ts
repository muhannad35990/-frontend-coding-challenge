import AxiosInstance from "util/intercepter";
export const GetAllAbsences = () => {
  return AxiosInstance.get(`/api/absences`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
