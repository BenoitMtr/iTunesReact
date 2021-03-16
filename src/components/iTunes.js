import './iTunes.css'
import { useContext } from 'react'
import { Button, TextField, FormControl, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from 'styled-components'
import * as css from './theme.css'
import { GlobalStyles } from './global'
import classNames from 'classnames'
import { ThemeContext } from '../themeContext'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ReactDOM from 'react-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import { TextFormat } from '@material-ui/icons'

const API = 'https://itunes.apple.com/search'

const historique = {}

const Itunes = () => {
    const resultList = []
    const { theme, lumiere, color, toggleTheme } = useContext(ThemeContext)
    const searchInput = document.querySelector('#search')
    const searchBtn = document.querySelector('.search-container .btn')
    const songsList = document.querySelector('.results')

    const [historique, setHistorique] = useState(['']) // le state pour la liste de hobby
    const [inputValue, setInputValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [results, setResults] = useState('')
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    })

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    /**
     * Handle click on the <ul> results list
     * Get the corresponding <li>, and the data attribute attached
     * Play the song
     * @param {object} event
     */
    const handleClickSong = (event) => {
        const audioTag = document.querySelector('audio')

        const target = event.target
        console.log('target:' + target)
        if (target.tagName !== 'LI' && !target.getAttribute('data-preview')) {
            console.log('pas bon')
            return
        }
        audioTag.setAttribute('src', target.getAttribute('data-preview'))
        audioTag.play()
    }

    const createSongLI = (s) => {
        const h1 = React.createElement('h1', null, s.artistName)
        const span = React.createElement('span', null, s.trackName)
        const li = React.createElement(
            'li',
            {
                id: s.trackId,
                'data-preview': s.previewUrl,
                onClick: handleClickSong,
            },
            { h1, span }
        )
        return li
    }

    /**
     * Perform a search request + add the results to the DOM
     */
    const search = async () => {
        console.log('valeur: ' + searchValue)
        if (!searchValue) return
        document.querySelector('.results').innerHTML =
            '' +
            '<p> chargement </p>' +
            '<FontAwesomeIcon icon={faSpinner} spin/>'

        // searchValue = searchValue.replace(' ', '+')

        const response = await fetchItunesSongs(searchValue.replace(' ', '+'))
        if (response.resultCount) {
            document.querySelector('.no-result').style.display = 'none'
            const songs = response.results.filter((r) => r.kind === 'song')
            console.log('songs: ' + songs.toString())
            songs.forEach((s) => {
                console.log(s)
                setResults((previousResultList) => {
                    return [...previousResultList, s]
                })
                // resultList.push(createSongLI(s))
            })
            const ul = React.createElement('ul', null, resultList)
            console.log(resultList.toString())
            // document.querySelector('.results').innerHTML = ''
            // ReactDOM.render(ul, document.getElementById('results'))
            //ReactDOM.unmountComponentAtNode(document.getElementById('results'))
            // document.querySelector('.results').appendChild(ul)
        } else {
            document.querySelector('.no-result').style.display = 'block'
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
            setHistorique((previousHistory) => {
                return [...previousHistory, url]
            })
            console.log(...historique)
            const response = await fetch(url)
            console.log(response)
            const responseJson = await response.json()
            return responseJson
        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value)
        console.log(e.target.value)
    }

    const handleBtnClick = (e) => {
        search()
    }

    const CssTextField = withStyles({
        root: {
            '& label': {
                color: color,
            },
            '& label.Mui-focused': {
                color: color,
            },
            '& .MuiInput-underline': {
                color: color,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: color,
            },
        },
    })(TextField)

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
            <FormControlLabel
                className={classNames([], {
                    [css.lightText]: theme === 'light',
                    [css.darkText]: theme === 'dark',
                })}
                control={
                    <Switch
                        checked={state.checkedB}
                        onChange={handleChange}
                        onClick={toggleTheme}
                        name="checkedB"
                    />
                }
                label={lumiere}
                labelPlacement="top"
            />
            <div>
                <FormControl>
                    <CssTextField
                        id="custom-css-standard-input"
                        label="Nom d'une musique"
                        value={searchValue}
                        style={{ height: '100%' }}
                        onChange={handleChangeSearchValue}
                    />
                    <br />
                    <Button
                        className={classNames([], {
                            [css.lightTheme]: theme === 'light',
                            [css.darkTheme]: theme === 'dark',
                        })}
                        style={{ height: '100%' }}
                        type="button"
                        onClick={handleBtnClick}
                    >
                        Search
                    </Button>
                </FormControl>
            </div>

            <div className="results" id="results">
                {(results || []).map((result, index) => {
                    return <div key={index}>{createSongLI(result)}</div>
                })}
            </div>

            <p className="no-result">
                No results found
                <br />
                Try different keywords
            </p>
            <audio className="player" controls>
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        </div>
    )
}

export default Itunes
