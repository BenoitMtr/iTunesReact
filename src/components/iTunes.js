import './iTunes.css';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons'
const API = 'https://itunes.apple.com/search';

const historique={};

const Itunes = () => {
    const searchInput = document.querySelector('#search');
    const searchBtn = document.querySelector('.search-container .btn');
    const songsList = document.querySelector('.results');

    const [historique, setHistorique] = useState(['']); // le state pour la liste de hobby
    const [inputValue, setInputValue] = useState('');

    /**
     * Fetch iTunes API with HTTP GET
     * return JSON
     * @param {string} term
     */
    const fetchItunesSongs = async (term) => {
        try {
            const url = `${API}?term=${term}`;
            setHistorique((previousHistory) => {
                return [...previousHistory, url];
            });
            console.log(...historique);
            const response = await fetch(url);
            console.log(response)
            const responseJson = await response.json();
            return responseJson;
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Handle click on the <ul> results list
     * Get the corresponding <li>, and the data attribute attached
     * Play the song
     * @param {object} event
     */
    const handleClickSong = (event) => {
        const audioTag = document.querySelector('audio');

        const target = event.target;
        console.log("target:"+target);
        if (target.tagName !== 'LI' && !target.getAttribute('data-preview')) {
            console.log("pas bon");
            return;
        }
        audioTag.setAttribute('src', target.getAttribute('data-preview'));
        audioTag.play();
    };

    /**
     * From a song object returned by the API, create a <li> tag
     * @param {object} s
     */
    const createSongLI = (s) => {
        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        const span = document.createElement('span');
        h1.textContent = s.artistName;
        span.textContent = s.trackName;
        li.id = s.trackId;
        li.setAttribute('data-preview', s.previewUrl);
        li.addEventListener('click', handleClickSong);
        li.appendChild(h1);
        li.appendChild(span);
        return li;
    };

    /**
     * Perform a search request + add the results to the DOM
     */
    const search = async () => {
        let searchValue = document.querySelector('#search').value.trim();
        console.log("valeur: "+searchValue);
        if (!searchValue) return;
        document.querySelector('.results').innerHTML = '' +
            '<p> chargement </p>' +
            '<FontAwesomeIcon icon={faSpinner} spin/>';

        searchValue = searchValue.replace(' ', '+');

        const response = await fetchItunesSongs(searchValue);
        if (response.resultCount) {
            document.querySelector('.no-result').style.display = 'none';
            const songs = response.results.filter((r) => r.kind === 'song');
            const ul = document.createElement('ul');
            songs.forEach((s) => {
                ul.appendChild(createSongLI(s));
            });
            document.querySelector('.results').innerHTML = '';
            document.querySelector('.results').appendChild(ul);
        } else {
            document.querySelector('.no-result').style.display = 'block';
        }
    };


    /**
     * Bind keypress event on input to catch the enter key event
     */
   /* searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            search();
        }
    });*/
// bind the click on button
   // searchBtn.addEventListener('click', search);
// bind the click on result list
  //  songsList.addEventListener('click', handleClickSong);


    // event handler pour l'input
    const handleChangeInput = (e) => {
        // lors de l'evenement onChange on change le state inputValue (controlled component)
        setInputValue(e.target.value);
    };

    return (
        <section className="app">
            <h1>ITUNES API</h1>
            <div className="search-container">
                <input type="text" placeholder="search" id="search"/>
                <button type="button" className="btn" onClick={search}>Search</button>
            </div>
            <div className="results">
            </div>

            <p className="no-result">
                No results found<br/>Try different keywords
            </p>
            <audio className="player" controls>
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        </section>
    );
}

export default Itunes;