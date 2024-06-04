import { Container, Row, Col, Button } from "react-bootstrap";

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


function FactsList(props) {
    if (props.factsList == null || props.factsList.length === 0) {
        return null;
    }
    return (
        <section id="factsList">
            <Container>
                <Row>
                    <div className="col-12 text-left">
                        <ul className="arrow-styled">
                            {
                                props.factsList.map((fact, index) => {
                                    return (<Row key={index} style={{marginTop:"2px"}}>
                                        <Col lg={2}>
                                            <h3>El fact</h3>
                                        </Col>
                                        <Col lg={3}>
                                            <p>{fact.value}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <p>Fecha de creación : {fact.created_at}</p>
                                        </Col>
                                        <Col lg={2}>
                                            <p>Categories : {fact.categories.join(', ')}</p>
                                        </Col>
                                        <Col lg={2}>
                                            <Button onClick={(component) => {updateFavorit(fact.id)}}>Me gusta</Button>
                                        </Col>
                                    </Row>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Row>
            </Container>
        </section>
    )
};

export default FactsList;