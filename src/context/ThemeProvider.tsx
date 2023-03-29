import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ReactNode } from 'react';
import { lightTheme, darkTheme, customTheme } from './Themes';

type ThemeName = 'light' | 'dark' | 'custom';

interface ThemeProviderProps {
    children: ReactNode;
    theme: ThemeName;
}

const getTheme = (themeName: ThemeName) => {
    switch (themeName) {
        case 'light':
            return lightTheme;
        case 'dark':
            return darkTheme;
        case 'custom':
            return customTheme;
        default:
            throw new Error(`Invalid theme name: ${themeName}`);
    }
};

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
    const selectedTheme = getTheme(theme);
    return (
        <StyledComponentsThemeProvider theme={selectedTheme}>
            {children}
        </StyledComponentsThemeProvider>
    );
};
