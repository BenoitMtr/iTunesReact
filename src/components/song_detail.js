import { Typography } from '@material-ui/core'
import classNames from 'classnames'
import * as css from './theme.css'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../themeContext'
import MaterialSwitch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './song_detail.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'


const Songdetail= ({match}) => {
    const API = 'https://itunes.apple.com/search'
    let song;

    const { theme, lumiere, checked, toggleTheme } = useContext(ThemeContext)
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    })
    const [result, setResult]=useState('');
    const [pageLoading, setPageLoading]=useState(false);

    useEffect(() => {
        if(!pageLoading)
        {
            search(match.params.id);

        }
        setPageLoading(true);
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    /**
     * Perform a search request + add the results to the DOM
     */
    const search = async (param) => {
        const response = await fetchItunesSongs(param)
        if (response.resultCount) {
            const songs = response.results.filter((r) => r.kind === 'song')
            console.log('songs: ' + songs.toString())
            songs.forEach((s) => {
                console.log(s)
                setResult((previousResult) => {
                    return s;
                })
            })
        }
    }

    /**
     * Fetch iTunes API with HTTP GET
     * return JSON
     * @param {string} term
     */
    const fetchItunesSongs = async (term) => {
        try {
            const url = `${API}?term=${term}`

            const response = await fetch(url)
            console.log(response)
            const responseJson = await response.json()
            return responseJson
        } catch (err) {
            console.log(err)
        }
    }

    function handleClickBack() {
        console.log("click back");
    }

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
       <Link to={'/'}><Button variant="contained" color="primary" onClick={handleClickBack}>Retour à la liste</Button></Link>
        <FormControlLabel
            className={classNames([], {
                [css.lightText]: theme === 'light',
                [css.darkText]: theme === 'dark',
            })}
            control={
                <MaterialSwitch
                    checked={checked}
                    onClick={toggleTheme}
                    name="checkedB"
                />
            }
            label={lumiere}
            labelPlacement="top"
        />
        <br/>

        <img src={result.artworkUrl100} alt={"disque"} width={200} height={200}/>
        <h1 className={classNames([css.lightText], {
            [css.lightText]: theme === 'light',
            [css.darkText]: theme === 'dark',
        })}>{result.trackName}</h1>
        <h2 className={classNames([css.lightText], {
            [css.lightText]: theme === 'light',
            [css.darkText]: theme === 'dark',
        })}>{result.artistName}</h2>


        <p className={classNames([css.lightText], {
            [css.lightText]: theme === 'light',
            [css.darkText]: theme === 'dark',
        })}>{result.collectionName}</p>
        <p className={classNames([css.lightText], {
            [css.lightText]: theme === 'light',
            [css.darkText]: theme === 'dark',
        })}>{result.primaryGenreName}</p>


        <audio className="player" controls
        src={result.previewUrl}>
            Your browser does not support the
            <code>audio</code> element.
        </audio>
    </div>)
}
        export default Songdetail;