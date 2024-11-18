import { Icon } from "@tabler/icons-react-native";

export enum CategoryType {
  Music = 'Music',
  Sports = 'Sports',
  Workshop = 'Workshop',
  Art = 'Art',
  FoodAndDrink = 'Food & Drink',
  Business = 'Business',
  Languages = 'Languages',
  Festival = 'Festival',
  Travel = 'Travel',
  Outdoors = 'Outdoors',
  Social = 'Social',
}

export type Category = {
  name: CategoryType;
  icon: Icon;
  backgroundColor: [string, string];
};