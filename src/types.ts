export interface MealAddOn {
  title: string;
  note?: string;
}

export interface MealIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Meal {
  id: number;
  title: string;
  type: string;
  time: string;
  calories: number;
  image: string;
  ingredients: MealIngredient[];
  steps: string[];
  additions?: MealAddOn[];
}

export interface ShoppingItem {
  name: string;
  checked: boolean;
}

export interface ShoppingGroup {
  mealTitle: string;
  items: ShoppingItem[];
}

