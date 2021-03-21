import React, { useContext, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { MicRounded } from '@material-ui/icons'
import { Button, FormControl, TextField } from '@material-ui/core'
import classNames from 'classnames'
import * as css from './theme.css'
import withStyles from '@material-ui/core/styles/withStyles'
import { color } from '@material-ui/system'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../themeContext'

const API = 'https://itunes.apple.com/search'

//partie reconnaissance vocale inspirée de l'exemple sur la doc: https://www.npmjs.com/package/react-speech-recognition#developing

const Search = () => {
    let songSelected;

    const { transcript, resetTranscript } = useSpeechRecognition()
    const [searchType, setSearchType]=useState({
        type: 'text'
    });
    const [searchValue, setSearchValue] = useState('')
    const [results, setResults] = useState({
        resultList: [],
    })
    const [historique, setHistorique] = useState(['']) // le state pour la liste de hobby
    const { theme, lumiere, color, toggleTheme } = useContext(ThemeContext)

    /*if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }*/


    const handleChangeSearchValue = (e) => {
        if(transcript=="") setSearchValue(e.target.value)
        else
        {
            setSearchValue(searchValue+transcript);
            resetTranscript();
        }
        console.log(e.target.value)
    }

    const handleBtnClick = (e) => {
        search(searchValue+transcript)
    }

    /**
     * Handle click on the <ul> results list
     * Get the corresponding <li>, and the data attribute attached
     * Play the song
     * @param {object} event
     */
    const handleClickSong = (song) => {

        songSelected=song;
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

    /**
     * Perform a search request + add the results to the DOM
     */
    const search = async (realSearchValue) => {

        console.log('valeur: ' + realSearchValue)
        if (!realSearchValue) return
        document.querySelector('.results').innerHTML =
            '' + '<p> chargement </p>'
        // '<FontAwesomeIcon icon={faSpinner} spin/>'


        const response = await fetchItunesSongs(realSearchValue.replace(' ', '+'))
        if (response.resultCount) {
            document.querySelector('.no-result').style.display = 'none'
            const songs = response.results.filter((r) => r.kind === 'song')
            console.log('songs: ' + songs.toString())
            let t = results.resultList ? results.resultList : []
            songs.forEach((s) => {
                console.log(s)
                t.push(s)
            })
            document.querySelector('.results').innerHTML = ''
            setResults({ resultList: t })
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

    return (
        <div>
            <FormControl>
                <CssTextField
                    id="custom-css-standard-input"
                    label="Nom d'une musique"
                    value={searchValue+transcript}
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
               <div><MicRounded onClick={async () => {
                  await SpeechRecognition.startListening();
                  setSearchValue(searchValue+transcript)

               }}/>
                   <p>Recherche vocale (clic sur le micro)</p></div>
            </FormControl>

            <div className="results" id="results">
                {(results.resultList || []).map((result, index) => {
                    let fullUrl="/song_detail/"+result.trackId;

                    return (

                        <li
                            className={classNames([css.lightTitleStyle], {
                                [css.lightTitleStyle]: theme === 'light',
                                [css.darkTitleStyle]: theme === 'dark',
                            })}
                            key={index}
                            id={result.trackId}
                            data-preview={result.previewUrl}
                            onClick={handleClickSong(result)}
                        >
                            <img src={result.artworkUrl100} alt={"cover"}/>

                            <h1>{result.artistName}</h1>
                            <Link to={fullUrl}> <span>{result.trackName}</span></Link>

                        </li>
                    )
                })}
            </div>

            <p className="no-result">
                No results found
                <br />
                Try different keywords
            </p>
        </div>
    )
}
export default Search