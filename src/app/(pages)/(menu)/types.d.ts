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
  menu?: string;
  groupName: string;
  name: string;
  image: File | string;
}

export interface IDish {
  _id?: string;
  category: string;
  name: string;
  weight: string;
  price: string;
  oldPrice: string;
  calories: string;
  proteinAndFatAndCarbohydrates: string;
  preparationTime: string;
  description: string;
  image: File | string;
}
