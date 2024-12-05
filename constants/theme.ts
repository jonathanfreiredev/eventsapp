import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#202936',
        secondary: '#5F19F2',
        terciary: '#B0B0B0',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        surfaceVariant: 'white',
    },
};

export type AppTheme = typeof theme;

