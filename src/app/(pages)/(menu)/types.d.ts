export interface IMenu {
  _id?: string;
  user: string;
  name: string | null;
  image: string | null;
  address: string | null;
  wifiName: string | null;
  wifiPassword: string | null;
}

export interface ICategory {
  _id?: string;
  menu: string;
  groupName: string;
  name: string;
  image: string;
}

export interface IDish {
  _id?: string;
  category: string;
  name: string;
  image: string | null;
  weight: string;
  description: string;
  preparationTime: number;
  calories: ICalories;
  price: number;
  newPrice: number | null;
}

interface ICalories {
  total: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}
