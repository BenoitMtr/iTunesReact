import './iTunes.css'
import { useContext } from 'react'
import { Button, TextField, FormControl, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons'
import * as css from './theme.css'
import { GlobalStyles } from './global'
import classNames from 'classnames'
import { ThemeContext } from '../themeContext'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaterialSwitch from '@material-ui/core/Switch'
import ReactDOM from 'react-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import { render } from '@testing-library/react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Form from './Form'
import Songdetail from './song_detail'
import Dictaphone from './search'
import Search from './search'


const Itunes = () => {
    const { theme, lumiere, toggleTheme } = useContext(ThemeContext)

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    })

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    return (
        <div className="app">

            <Typography
                variant="h2"
                className={classNames([css.lightTitleStyle], {
                    [css.lightTitleStyle]: theme === 'light',
                    [css.darkTitleStyle]: theme === 'dark',
                })}
            >
                ITUNES API
            </Typography>
            <Form/>
            <br/>
            <FormControlLabel
                className={classNames([], {
                    [css.lightText]: theme === 'light',
                    [css.darkText]: theme === 'dark',
                })}
                control={
                    <MaterialSwitch
                        checked={state.checkedB}
                        onChange={handleChange}
                        onClick={toggleTheme}
                        name="checkedB"
                    />
                }
                label={lumiere}
                labelPlacement="top"
            />
            <Search/>

        </div>
    )
}

export default Itunes
