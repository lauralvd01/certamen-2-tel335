import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import SpinnerLoader from "./SpinnerLoader"
import FactsList from "./FactsList";

const factListManual = [
    {
        "categories": [],
        "created_at": "2020-01-05 13:42:26.447675",
        "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        "id": "5WodmFzySCKkWxuy1YqYJQ",
        "updated_at": "2020-01-05 13:42:26.447675",
        "url": "https://api.chucknorris.io/jokes/5WodmFzySCKkWxuy1YqYJQ",
        "value": "Chuck Norris once rocked so hard in an AC/DC concert that it was felt even in 1906. They called it the great San Francisco earthquake."
    },
    {
        "categories": [
        "explicit"
        ],
        "created_at": "2020-01-05 13:42:29.855523",
        "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        "id": "CbAdkF8IReK9hstCWkoVug",
       "updated_at": "2020-01-05 13:42:29.855523",
        "url": "https://api.chucknorris.io/jokes/CbAdkF8IReK9hstCWkoVug",
        "value": "Chuck Norris got lost in San Francisco’s Castro District. A man asked Chuck how he’d like to try a gay experience. Chuck asked how he’d like to experience the One Finger Exploding Brain Death Touch."
    }
]

function Search() {
    const [haveToSearch, setHaveToSearch] = useState(false);
    const [searching, setSearching] = useState(false);
    //const [factsList, setFactsList] = useState([]);
    const [queryInput, setQueryInput] = useState("");

    // Por alguna razon el Hools no funciona bien... setFactcsList
    // --> Se creo la variable manualmente para actualizarla pero asi el valor transmitido a <FactsList> no cambia y se queda como undefined
    // --> Para avanzar se puso el json directamente (repuesta de la busqueda Francisco)
    
    // let factListManual = [];

    // const updateManual = (newList) => {
    //     console.log("Old list")
    //     console.log(factListManual)
    //     console.log("New list")
    //     console.log(newList)
    //     for (let index = 0; index < newList.length; index++) {
    //         factListManual[index] = newList[index]
    //     }
    //     console.log("Actual list")
    //     console.log(factListManual)
    // }

    useEffect(() => {
        const fetchData = async () => {
            if (searching) {
                const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${queryInput}`);
                if (result.data) {
                    setHaveToSearch(false);
                    setSearching(false);
                    // setFactsList(result.data.result)
                    // updateManual(result.data.result);
                    setQueryInput("");
                    // Set response status to correct code 200
                }
                else {
                    alert(result.request.statusText)
                    // Set response status to error code 404
                }
            }
        }
        if (haveToSearch)
            {
                if (queryInput.length === 0) {
                    alert("Ingresa un input a buscar");
                    setHaveToSearch(false);
                } else {
                    setSearching(true);
                    fetchData();
                }
            }
    }, [haveToSearch, searching, queryInput])


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

    const getFavorits = () => {
        const fetchDataFav = async (id) => {
            const result = await axios.get(`https://api.chucknorris.io/jokes/${id}`);
            let newList = favList
            newList.push(result.data)
            setFavList(newList)
        }
        for (let index = 0; index < favorits.length; index++) {
            const element = favorits[index];
            fetchDataFav(element)
        }
    }

    useEffect( () => {
        if (favList.length !== 0) {
            console.log("FavList not empty")
            console.log(favList)
        }
    })

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
                        <Button variant="primary" onClick={() => {setHaveToSearch(true)}}>Buscar</Button>
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
                        <SpinnerLoader haveToSearch={haveToSearch} searching={searching}/>
                    </div>
                    <FactsList factsList={factListManual} updateFavorit={updateFavorit}/>
                    <FactsList factsList={favList} updateFavorit={updateFavorit}/>
                </Row>
            </Container>
        </section>
    );
}

export default Search;