import { Container, Row, Col } from "react-bootstrap";


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
                                        <Col lg={1}>
                                            <h3>El fact</h3>
                                        </Col>
                                        <Col lg={6}>
                                            <p>{fact.value}</p>
                                        </Col>
                                        <Col lg={2}>
                                            <p>Fecha de creación : {fact.created_at}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <p>Categories : {fact.categories.join(', ')}</p>
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