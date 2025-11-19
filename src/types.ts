export interface Meal {
  id: number;
  title: string;
  type: string;
  time: string;
  calories: number;
  image: string;
  ingredients: string[];
  steps: string[];
}

export interface ShoppingItem {
  name: string;
  checked: boolean;
}

export interface ShoppingGroup {
  mealTitle: string;
  items: ShoppingItem[];
}

