import React, { useContext, useState, ReactNode } from 'react';

interface IDarkModeContext {
    theme: string;
    toggleTheme: (nextTheme: string) => void;
}

export const DarkModeContext = React.createContext<IDarkModeContext>({
    theme: 'light',
    toggleTheme: () => {
        console.log('dd');
    },
});

interface IDarkModeProviderProps {
    children: ReactNode;
}

export default function DarkModeProvider(props: IDarkModeProviderProps) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = (nextTheme: string) => {
        setTheme(nextTheme);
    };

    const contextValue: IDarkModeContext = {
        theme,
        toggleTheme,
    };
    return (
        <div>
            <DarkModeContext.Provider value={contextValue}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    );
}

interface ILightSwitchProps {
    themeOptions: string[];
}


