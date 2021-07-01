import React from "react";
import landing_image from "./../images/landing_image2.jpg";
import { Card, Row, Col } from "react-bootstrap";


/* landing page */
export default function Home() {
    return (
        <div>
            <Row>
                <Col></Col>
                <Col lg={9}>
                    <Card className="text-center" bg="info" text="white">
                        <Card.Body>
                            <Card.Title>Your handy stock price checker</Card.Title>
                            <Card.Text>
                            Welcome to the Stock Market Portal! <br />
                            Click on Stocks to check the latest stock prices for NASDAQ 100 companies.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col lg={9}>
                    <img src={landing_image} alt="Stock Market Portal"></img>
                </Col>
                <Col></Col>
            </Row> 
        </div>
    )
}