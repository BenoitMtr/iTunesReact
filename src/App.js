import logo from './logo.svg'
import './App.css'
import React, { useContext } from 'react'
import Itunes from './components/iTunes'
import { darkTheme } from './components/theme.css'
import classNames from 'classnames'
import * as css from './components/theme.css'
import { ThemeContext } from './themeContext'
import {  } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Songdetail from './components/song_detail'

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
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Itunes/>}>
                    </Route>
                    <Route path="/song_detail" render={() => <Songdetail />}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>


    )
}

export default App
