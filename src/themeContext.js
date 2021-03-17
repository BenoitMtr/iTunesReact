import React, { useState } from 'react'
const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState('light')
    const [lumiere, setLumiere] = useState('Il fait jour')
    const [color, setColor] = useState('black')

    function toggleTheme() {
        if (theme === 'light') {
            setLumiere('Il fait nuit')
            setColor('white')
        } else {
            setLumiere('Il fait jour')
            setColor('black')
        }
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, lumiere, color, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>

        // or (children as a property):
        // <ThemeContext.Provider children={props.children} value={{ theme, toggleTheme }}>
        // </ThemeContext.Provider>
    )
}

export { ThemeContextProvider, ThemeContext }
