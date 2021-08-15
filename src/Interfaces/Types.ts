export type Recipe = {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strTags: string;
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
