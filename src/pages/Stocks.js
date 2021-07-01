import React, {useState} from "react";
import { useCompInfo } from "../api/Api";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { SearchByDropdown, SearchByText } from "../components/Search.js";
import { Table } from "../components/Table.js";
import  ErrorPage from "./ErrorPage";

/* stocks page */
export default function Stocks() {
  // stock list from Alpha Advantage API
  const {loading, companyInfo, error} = useCompInfo()
  // search query for symbol
  const [searchS, setSearchS] =useState ('');
  // search query for industry
  const [searchI, setSearchI] =useState ('');
  // list of industries
  let sectors = [...new Set(companyInfo.map(row=>row.sector))];
  
  // table column definition
  const columns = [
    { headerName: "Symbol", field: "symbol", sortable: true, flex: 1, maxWidth: 300, cellRendererFramework: (params) => {
      return <Link to={{pathname: `/price_history/${params.data.symbol}`, state: params.data.name}}>{params.value}</Link>}},
    { headerName: "Name", field: "name", sortable: true,flex: 2,maxWidth: 300},
    { headerName: "Industry", field: "sector", sortable: true, flex: 2, maxWidth: 300},
    ];

  // display loading if loding data
  if (loading){
    return <p>Loading...</p>;
  }

  // display an error page if there is a server side error
  if (error){
    return <ErrorPage errorCode={"500 - Server Error"} 
    errorMessage={error.message}
    linkRoot="/" rootName="Go Home"/>
  }

  // display the stocks
  return (
    <Container className="jumbotron vertical-center">
      <Row>
        <Col>
        </Col>
        <Col lg={8} xs={12} sm={12}>
          <h1>Stocks</h1>
        </Col>
        <Col>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col lg={8} xs={12} sm={12}>
          <SearchByText onSubmit={setSearchS} />
        </Col>
        <Col>
        </Col>         
      </Row>
      <Row>
        <Col></Col>
        <Col lg={8} xs={12} sm={12}>
          <SearchByDropdown dropdowns={sectors} placeholder="Search by an industry" onSubmit={setSearchI} />
        </Col>
        <Col></Col>  
      </Row>
      <Row></Row>
      <Row className="row my-3">
        <Col></Col>
        <Col lg={8} xs={12} sm={12}>
          <Table tableStyle={{
                height: "380px",
                width: "100%"
                }}
                column={columns}
                // set data by two search results
                // if searchI === "", show all results (same for searchS)  
                data={(searchI ? (searchS ? companyInfo.filter(row => row.symbol.includes(searchS)): companyInfo).filter(row => row.sector === searchI): (searchS ? companyInfo.filter(row => row.symbol.includes(searchS)): companyInfo))}
                addPagination={true}
                paginationSize = {10} />
        </Col>
        <Col></Col>
      </Row>        
    </Container> 
  )
}
