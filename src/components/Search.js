import { Button, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Search() {
    const [haveToSearch, setHaveToSearch] = useState(false);
    const [searching, setSearching] = useState(false);
    const [factsList, setFactsList] = useState([]);
    const [queryInput, setQueryInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (searching) {
                console.log("Searching")
                console.log(queryInput)
                const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${queryInput}`);
                if (result.data) {
                    setHaveToSearch(false);
                    setSearching(false);
                    setFactsList(result.data);
                    setQueryInput("");
                    console.log(factsList);
                }
            }
        }
        if (haveToSearch)
            {
                setSearching(true);
                fetchData();
            }
    }, [haveToSearch, searching, queryInput, factsList])

    const clickToSearch = () => {
        setHaveToSearch(true);
    }


    return (
        <section id="search">
            <Container>
                <Row>
                    <h2>Ingresa el objeto de tu busqueda :</h2>
                </Row>
                <Row>
                    <Form>
                        <Form.Group controlId="searchInput">
                            <Form.Control type="text" placeholder="Escribe lo que buscas" onChange={(component) => setQueryInput(component.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" onClick={clickToSearch}>Buscar</Button>
                    </Form>
                </Row>
                <Row>

                </Row>
            </Container>
        </section>
    );
}

export default Search;