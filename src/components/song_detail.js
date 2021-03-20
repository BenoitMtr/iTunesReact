import { Typography } from '@material-ui/core'
import classNames from 'classnames'
import * as css from './theme.css'
import React, { useContext } from 'react'
import { ThemeContext } from '../themeContext'

const Songdetail= () => {
    const { theme, lumiere, color, toggleTheme } = useContext(ThemeContext)


    return (<div className="app">
        <Typography
            variant="h2"
            className={classNames([css.lightTitleStyle], {
                [css.lightTitleStyle]: theme === 'light',
                [css.darkTitleStyle]: theme === 'dark',
            })}
        >
            ITUNES API
        </Typography>
    </div>)
}
        export default Songdetail;