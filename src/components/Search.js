import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import SpinnerLoader from "./SpinnerLoader"
import FactsList from "./FactsList";
import FavList from "./FavList";

function Search() {
    const [searching, setSearching] = useState(false);
    const [factsList, setFactsList] = useState([]);
    const [queryInput, setQueryInput] = useState("");

    const getSearch = () => {
        const fetchData = async () => {
            const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${queryInput}`);
            if (result.data) {
                setFactsList(result.data.result)
                setQueryInput("");
                // Set response status to correct code 200
            }
            else {
                alert(result.request.statusText)
                // Set response status to error code 404
            }
        }

        if (queryInput.length === 0) {
            alert("Ingresa un input a buscar");
        } 
        else {
            setSearching(true);
            fetchData();
        }
    }

    useEffect( () => {
        if (factsList.length > 0) {
            console.log("factsList actualizada !")
            setSearching(false)
        }
    }, [factsList.length])


    let favorits = []

    const updateFavorit = (id) => {
        const index = favorits.find((old_id) => old_id === id)
        if (index) {
            favorits = favorits.filter((old_id) => old_id !== id)
        }
        else {
            favorits.push(id)
        }
        console.log(favorits)
    }

    const [favList, setFavList] = useState([]);
    const [favLoading, setFavLoading] = useState(false);

    const getFavorits = () => {
        const fetchDataFav = async (id) => {
            const result = await axios.get(`https://api.chucknorris.io/jokes/${id}`);
            if (result.data) {
                let newList = favList
                newList.push(result.data)
                setFavList(newList)
                // Set response status to correct code 200
            }
            else {
                alert(result.request.statusText)
                // Set response status to error code 404
            }
        }
        if (favorits.length > 0) {
            setFavLoading(true)
            for (let index = 0; index < favorits.length; index++) {
                const element = favorits[index];
                fetchDataFav(element)
            }
        }
    }

    useEffect( () => {
        if (favList.length > 0) {
            console.log("FavList actualizada !")
            setFavLoading(false)
        }
    },[favList.length])

    return (
        <section id="search">
            <Container>
                <Row style={{marginTop:"5%"}}>
                    <h2>Ingresa un tema para buscar facts relacionados :</h2>
                </Row>
                <Row style={{marginTop:"1%"}}>
                    <Form>
                        <Form.Group controlId="searchInput">
                            <Form.Control type="text" placeholder="Escribe lo que buscas" onChange={(component) => setQueryInput(component.target.value)}/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row style={{marginTop:"1%", justifyContent:"space-between"}}>
                    <Col lg={3}>
                        <Button variant="primary" onClick={getSearch}>Buscar</Button>
                    </Col>    
                    <Col lg={3}>
                        <Button variant="danger" onClick={getFavorits}>Ver a mis facts favoritos</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"5%"}}>
                    <h2>Resultados :</h2>
                </Row>
                <Row style={{marginTop:"2%"}}>
                    <div className="d-flex justify-content-center">
                        <SpinnerLoader loading={searching}/>
                    </div>
                    <FactsList factsList={factsList} updateFavorit={updateFavorit}/>
                </Row>
                <Row style={{marginTop:"5%"}}>
                    <h2>Favoritos :</h2>
                </Row>
                <Row>
                    <div className="d-flex justify-content-center">
                        <SpinnerLoader loading={favLoading}/>
                    </div>
                    <FavList favList={favList}/>
                </Row>
            </Container>
        </section>
    );
}

export default Search;