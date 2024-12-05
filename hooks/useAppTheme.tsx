import { AppTheme } from "@/constants/theme";
import { useTheme } from "react-native-paper";

export const useAppTheme = () => useTheme<AppTheme>();