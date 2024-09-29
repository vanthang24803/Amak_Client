import { Response, Category } from "@/types";
import _http from "@/utils/http";

const fetchCategories = () => _http.get<Response<Category[]>>(`/Categories`);

export { fetchCategories };
