import React, { useContext, useState, ReactNode } from 'react';

interface IModeContext {
    theme: string;
    toggleTheme: (nextTheme: string) => void;
}

export const ModeContext = React.createContext<IModeContext>({
    theme: 'light',
    toggleTheme: () => {
        console.log('dd');
    },
});

interface IDarkModeProviderProps {
    children: ReactNode;
}

export default function ModeProvider(props: IDarkModeProviderProps) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = (nextTheme: string) => {
        setTheme(nextTheme);
    };

    const contextValue: IModeContext = {
        theme,
        toggleTheme,
    };
    return (
        <div>
            <ModeContext.Provider value={contextValue}>
                {props.children}
            </ModeContext.Provider>
        </div>
    );
}

interface ILightSwitchProps {
    themeOptions: string[];
}


