import { Spinner } from "react-bootstrap";

function SpinnerLoader(props) {
    if (!props.haveToSearch) {
        return null;
    }
    if (props.searching) {
        return null;
    } else {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
}

export default SpinnerLoader;