import { BASE_URL } from "./constants";
import type {
  AddCategoryPayload,
  AddCategoryResponse,
  Category,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  UpdateCategoryParams,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
} from "@together/types";
import axios from "axios";

const CATEGORIES_SERVICE_BASE_URL = BASE_URL + "/categories";

export const fetchCategories = async () => {
  const response = await axios.get<Category[]>(CATEGORIES_SERVICE_BASE_URL);
  return response.data;
};

export const addCategory = async (payload: AddCategoryPayload) => {
  const response = await axios.post<AddCategoryResponse>(
    `${CATEGORIES_SERVICE_BASE_URL}/add`,
    payload
  );
  return response.data;
};

export const deleteCategory = async (params: DeleteCategoryParams) => {
  const response = await axios.delete<DeleteCategoryResponse>(
    `${CATEGORIES_SERVICE_BASE_URL}/delete/${params.id}`
  );

  return response.data;
};

export const updateCategory = async (
  params: UpdateCategoryParams,
  payload: UpdateCategoryPayload
) => {
  const response = await axios.patch<UpdateCategoryResponse>(
    `${CATEGORIES_SERVICE_BASE_URL}/update/${params.id}`,
    payload
  );
  return response.data;
};
