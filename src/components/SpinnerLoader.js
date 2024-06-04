import { Spinner } from "react-bootstrap";

function SpinnerLoader(props) {
    if (!props.loading) {
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