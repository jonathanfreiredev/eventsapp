import { Category, CategoryType } from "@/types/categories";
import { IconArtboard, IconBallBasketball, IconDesk, IconLanguage, IconMusic, IconSoup } from "@tabler/icons-react-native";

export const Categories: Category[] = [
    {
        name: CategoryType.Music,
        icon: IconMusic,
        backgroundColor: ["#7D6AE9", "#D45A4F"],
        slug: "music",
    },
    {
        name: CategoryType.Sports,
        icon: IconBallBasketball,
        backgroundColor: ["#9BCDE9", "#4F74D4"],
        slug: "sports",
    },
    {
        name: CategoryType.Workshop,
        icon: IconDesk,
        backgroundColor: ["#C2E9DB", "#9E88DA"],
        slug: "workshop",
    },
    {
        name: CategoryType.Art,
        icon: IconArtboard,
        backgroundColor: ["#39A07C", "#569997"],
        slug: "art",
    },
    {
        name: CategoryType.FoodAndDrink,
        icon: IconSoup,
        backgroundColor: ["#5961AF", "#7DEACD"],
        slug: "food-and-drink",
    },
    {
        name: CategoryType.Languages,
        icon: IconLanguage,
        backgroundColor: ["#7071CC", "#C3B8F1"],
        slug: "languages",
    },
]