import React, { useState } from 'react'
const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState('light')
    const [lumiere, setLumiere] = useState('Il fait jour')
    const [color, setColor] = useState('black')
    const [checked, setChecked] = useState(true)
    const [searchEnable, setSearchEnable] = useState(true)

    function toggleTheme() {
        if (theme === 'light') {
            setLumiere('Il fait nuit')
            setColor('white')
            setChecked(false)
        } else {
            setLumiere('Il fait jour')
            setColor('black')
            setChecked(true)
        }
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, lumiere, checked, color, searchEnable, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>

        // or (children as a property):
        // <ThemeContext.Provider children={props.children} value={{ theme, toggleTheme }}>
        // </ThemeContext.Provider>
    )
}

export { ThemeContextProvider, ThemeContext }
