// import './StarredEvents.css'

const StarredEvents = (props) => {
    // This is equivalent to:
    // const starredList = props.starredList;
    const { starredList, setStarredEvents } = props;

    const starredEventsOutput = () => {
        if (starredList.length === 0) {
            return '';
        } else {
            return starredList.join(', ')
        }
    }

    return (
        <div className="event starred-events">
            Saved words:
            {starredEventsOutput()}
        </div>)
}

export default StarredEvents;