import { toast } from "react-toastify";
import AxiosInstance from "util/intercepter";
export const GetAllAbsences = () => {
  return AxiosInstance.get(`/api/absences`)
    .then((response) => response.data)
    .catch((err) => toast.error("Failed to load data"));
};
