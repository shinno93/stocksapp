import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Stocks from "../pages/Stocks";
import PriceHistory from "../pages/PriceHistory";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../node_modules/bootstrap-icons/icons/graph-up.svg";

/* Nav bar */
export function Header() {
  
  return (
    <div>
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} className="d-inline-block align-top" alt="Stock Market Portal logo"></img>
                        Stock Market Portal
                    </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer exact to="/">
                        <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/stocks/">
                        <Nav.Link>Stocks</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div>
                <Switch>
                    <Route path="/price_history/:id">
                        <PriceHistory />
                    </Route>
                    <Route exact path="/stocks">
                        <Stocks />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route>
                        <ErrorPage errorCode={"404 - Not Found"} errorMessage={"The page you are looking for does not exist."}
                        linkRoot="/" rootName="Go Home"/>
                    </Route>
                </Switch>      
            </div>
        </Router>
    </div>
  )}