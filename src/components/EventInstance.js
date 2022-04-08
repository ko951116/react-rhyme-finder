// import './EventInstance.css';
import EventStarButton from "./EventStarButton";
import {useState} from "react";

const EventInstance = (props) => {
    const [isStarred, setIsStarred] = useState(false);

    return (
        <li>
        {props.children}
            <EventStarButton
                // we send the value of isStarred to the child component
                tossedOverIsStarred={isStarred}
                // we send the "update state" function to the child component
                handMeDownSetStarStateFunction={setIsStarred}
                // setStarredEvents={props.setStarredEvents}
                { ...props} //spread operator
                //one = {props.one}
                //two = {props.one}
                //and so on
            />
        </li>

    )
}

export default EventInstance;