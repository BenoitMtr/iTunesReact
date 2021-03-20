import logo from './logo.svg'
import './App.css'
import React, { useContext } from 'react'
import Itunes from './components/iTunes'
import { darkTheme } from './components/theme.css'
import classNames from 'classnames'
import * as css from './components/theme.css'
import { ThemeContext } from './themeContext'

function App() {
    const { theme } = useContext(ThemeContext)
    return (
        <div
            className="App"
            className={classNames([], {
                [css.lightThemeBackground]: theme === 'light',
                [css.darkThemeBackground]: theme === 'dark',
            })}
        >
            <Itunes />
        </div>
    )
}

export default App
