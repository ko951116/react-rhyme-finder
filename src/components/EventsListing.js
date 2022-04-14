// import './EventsListing.css';
// import EventDateTime from "./EventDateTime";
import EventInfo from "./EventInfo";
import EventInstance from "./EventInstance";
import StarredEvents from "./StarredEvents";
import {useState} from "react";
import NumSyllableGroup from "./NumSyllableGroup";


const EventsListing = (props) => {
    const {setStarredEvents} = props;


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

        const groupby = groupBy(props.events, 'numSyllables')
        const length = Object.keys(groupby).length;


        const eventsToShow = [];


        for (let n=0; n<length; n++) {
            eventsToShow.push(<h3>Syllable: {Object.keys(groupby)[n]}</h3>)

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

        console.log(eventsToShow.length)
        if (eventsToShow.length>0) {
            return eventsToShow
        } else {
            return <p>(no results)</p>
        }
        // return eventsToShow;
    }


    /**
     * Creates an array where each item is the JSX "markup" for an event.
     *
     * @returns {*[]}
     */




        return (
            <>
                <div className='events'>
                    {generateEvents()}
                </div>
            </>
        );


}

export default EventsListing;