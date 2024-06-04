import { Container, Row, Col } from "react-bootstrap";

function FavList(props) {
    if (props.favList == null || props.favList.length === 0) {
        return null;
    }
    return (
        <section id="favList">
            <Container>
                <Row>
                    <div className="col-12 text-left">
                        <ul className="arrow-styled">
                            {
                                props.favList.map((fact, index) => {
                                    return (<Row key={index} style={{marginTop:"2px"}}>
                                        <Col lg={2}>
                                            <h3>El fact</h3>
                                        </Col>
                                        <Col lg={5}>
                                            <p>{fact.value}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <p>Fecha de creación : {fact.created_at}</p>
                                        </Col>
                                        <Col lg={2}>
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

export default FavList;