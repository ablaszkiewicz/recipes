export type Recipe = {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

export enum SearchType {
  Dish,
  Ingredient,
  Country,
}

export type SearchData = {
  searchType: SearchType;
  searchBox?: string;
  ingredient?: string;
  country?: string;
};
