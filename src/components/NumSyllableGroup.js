// import './EventsListing.css';
// import EventDateTime from "./EventDateTime";
import EventInfo from "./EventInfo";
import EventInstance from "./EventInstance";
import StarredEvents from "./StarredEvents";
import {useState} from "react";
import NumSyllableGroup from "./NumSyllableGroup";

const EventsListing = (props) => {
    const [starredEvents, setStarredEvents] = useState([])
    const [numSyllable, SetNumSyllable] = useState([])

    function groupBy(objects, property) {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for(const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    const generateEvents = () => {
        // Initialize an empty array that will get each event

        const groupby = groupBy(props.umichEvents, 'numSyllables')
        const length = Object.keys(groupby).length;

        // for (let m = 0 ; m<length; m++) {
        //     console.log('Syllable: ', Object.keys(groupby)[m])
        //     // console.log(Object.keys(groupBy(props.events, 'numSyllables')))
        //     for (let item in groupby[Object.keys(groupby)[m]]) {
        //         console.log(groupby[Object.keys(groupby)[m]][item])
        //     }
        // }

        const eventsToShow = [];

        for (let n=0; n<length; n++) {
            // for (let item in groupby[Object.keys(groupby)[n]]) {
            //     console.log(groupby[Object.keys(groupby)[n]][item])
            // }
            groupby[Object.keys(groupby)[n]].forEach((eventInstance, index) =>

                eventsToShow.push(
                    <EventInstance
                        setStarredEvents = {setStarredEvents} //will be passing down to EventInstance
                        key={eventInstance.word}
                        title={eventInstance.word}
                    >
                        <EventInfo
                            title={eventInstance.word}
                            // description={eventInstance.description}
                        />
                    </EventInstance>
                )
            )
        }

        // Loop through the event list. Add each event as new array item.
        // If React sees an array of JSX "markup", it will render each one.
        // props.events.forEach((eventInstance, index) =>
        //     eventsToShow.push(
        //         <EventInstance
        //             setStarredEvents = {setStarredEvents} //will be passing down to EventInstance
        //             key={index}
        //             title={eventInstance.word}
        //         >
        //             <EventInfo
        //                 title={eventInstance.word}
        //                 // description={eventInstance.description}
        //             />
        //         </EventInstance>
        //     )
        // );

        // for (let i=0; i<length; i++) {
        //     return eventsToShow[i]
        // }
        return eventsToShow;
    }


    /**
     * Creates an array where each item is the JSX "markup" for an event.
     *
     * @returns {*[]}
     */



    //API 다운로딩할때 로딩화면

    // for (let count=1; count<Object.keys(groupBy(props.events, 'numSyllables')).length; count++) {
    //     return (
    //         <>
    //             <h2>Syllables: {j}</h2>
    //             {generateEvents()}
    //         </>
    //     )
    // }



    return (
        <>
            <StarredEvents starredList={starredEvents} />

            <div className='events'>
                {/*<h2>Syllables:  </h2>*/}
                {generateEvents()}
                <ul className='row'>
                    hi
                    {numSyllable.map((item) =>
                        <EventsListing />
                    )}
                </ul>

                {/*<EventsListing events={numSyllable}/>*/}
                {/*    {props.events.map((eventInstance, index) => (*/}
                {/*        <li>*/}
                {/*            {eventInstance.word}*/}
                {/*            <button*/}
                {/*                className="btn btn-sm btn-outline-success done"*/}
                {/*                type="button"*/}
                {/*                // onClick={remove}*/}
                {/*            >*/}
                {/*                (save)*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*        )*/}
                {/*    )}*/}
            </div>
        </>
    );


}

export default EventsListing;