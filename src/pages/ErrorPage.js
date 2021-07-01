import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

/* diaply an error page
 * @props
 *  errorCode: error code string
 *  errorMessage: error massage to display
 *  linkRoot: root for the return button
 *  rootName: name for the return button
 */
const ErrorPage = ({errorCode, errorMessage, linkRoot, rootName}) => {
    return (
        <>
        <Container className="jumbotron vertical-center">
            <Row>
                <Col></Col>
                <Col lg={8} xs={12} md={12} sm={12}>
                    <h1>{errorCode}!</h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col lg={8} xs={12} md={12} sm={12}>
                    {errorMessage}<br/>
                    Please click the button below to go back.
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col lg={8} xs={12} md={12} sm={12} className="my-3">
                    <Link to={linkRoot} className="btn btn-primary">
                        {rootName}
                    </Link>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
    );
}
  
  export default ErrorPage;