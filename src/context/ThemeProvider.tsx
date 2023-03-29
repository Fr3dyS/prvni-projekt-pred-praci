import React from 'react';

export const ThemeContext = React.createContext({
    theme: 'light',
    setTheme: (theme: string) => { },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState('light');

    const contextValue = {
        theme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
