// import './EventStarButton.css';

const EventStarButton = (props) => {
    const { handMeDownSetStarStateFunction, setStarredEvents, title} = props;

    const getStarMessage = () => {
            return '(save)'
    };

    const starButtonHandler = (e) => {

        setStarredEvents((previousList) => {
            return [ ...previousList, title];
        });

        // props.handMeDownSetStarStateFunction((previousValue) => {
        //     return !previousValue;
        // });
    };

    return (
        <button onClick={starButtonHandler} className="btn btn-sm btn-outline-success done">
            <div>{getStarMessage()}</div>
        </button>
    );
}

export default EventStarButton;