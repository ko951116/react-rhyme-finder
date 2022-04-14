import logo from './logo.svg';
import './App.css';
import {useState, useRef, useEffect} from "react";
import EventsListing from "./components/EventsListing";
import StarredEvents from "./components/StarredEvents";
import NumSyllableGroup from "./components/NumSyllableGroup";


function App() {
    const [umichEvents, setUmichEvents] = useState([]);
    const [starredEvents, setStarredEvents] = useState([])
    const [isShowRhymingWordsBtn, setIsShowRhymingWordsBt] = useState(false);
    const [isShowSynonymsBtn, setIsShowSynonymsBtn] = useState(false);

    const inputRef = useRef();

    //
    // function groupBy(objects, property) {
    //     // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    //     // value for property (obj[property])
    //     if(typeof property !== 'function') {
    //         const propName = property;
    //         property = (obj) => obj[propName];
    //     }
    //
    //     const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    //     for(const object of objects) {
    //         const groupName = property(object);
    //         //Make sure that the group exists
    //         if(!groupedObjects.has(groupName)) {
    //             groupedObjects.set(groupName, []);
    //         }
    //         groupedObjects.get(groupName).push(object);
    //     }
    //
    //     // Create an object with the results. Sort the keys so that they are in a sensible "order"
    //     const result = {};
    //     for(const key of Array.from(groupedObjects.keys()).sort()) {
    //         result[key] = groupedObjects.get(key);
    //     }
    //     return result;
    // }


    function showRhymingWordsBtn() {
        setIsShowRhymingWordsBt(true)
        setIsShowSynonymsBtn(false)
        console.log('input: ', inputRef.current.value)

        fetch(`https://api.datamuse.com/words?rel_rhy=${inputRef.current.value}`)
            .then((response) => response.json())
            .then((json) => setUmichEvents(Object.values(json)));
    }


    function showSynonymsBtn() {
        setIsShowRhymingWordsBt(false)
        setIsShowSynonymsBtn(true)

        fetch(`https://api.datamuse.com/words?ml=${inputRef.current.value}`)
            .then((response) => response.json())
            .then((json) => setUmichEvents(Object.values(json)));
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            showRhymingWordsBtn()
        }
    }


    return (
      <main className="container">
        <h1 className="row">React Rhyme Finder (579 Problem Set 6)</h1>


          <StarredEvents starredList={starredEvents} setStarredEvents={setStarredEvents} />

          <div className="input-group">
              <input
                  ref = {inputRef}
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter a word"
                  aria-label="Enter a word"
                  onKeyDown={keyDownHandler}
                  />
              <button
                  onClick={showRhymingWordsBtn}
                  className="btn btn-primary"
                  aria-label="Show rhyming words">
                  Show rhyming words
              </button>
              <button
                  onClick={showSynonymsBtn}
                  className="btn btn-secondary"
                  aria-label="Show synonyms">
                  Show synonyms
              </button>
          </div>

          <span>{isShowRhymingWordsBtn ? `Words that rhyme with ` + inputRef.current.value + `: ` : ''}</span>
          <span>{isShowSynonymsBtn ? `Words with a similar meaning to `+ inputRef.current.value + `: ` : ''}</span>


        <div className="row">
              <EventsListing events={umichEvents} setStarredEvents={setStarredEvents}
              />
          {/*)}*/}
        </div>
      </main>
  );
}

export default App;
