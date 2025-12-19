export type Category = {
  id: number;
  name: string;
  color: string;
};

export type AddCategoryPayload = {
  name: string;
  color: string;
};

export type AddCategoryResponse = {
  message: string;
  added: Category;
};

export type DeleteCategoryParams = {
  id: string;
};

export type DeleteCategoryResponse = {
  message: string;
  deleted: Category;
};

export type UpdateCategoryParams = {
  id: string;
};

export type UpdateCategoryPayload = {
  name: string;
  color: string;
};

export type UpdateCategoryResponse = {
  message: string;
  updated: Category;
};
