import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useStockInfo } from "../api/ApiDetail";
import { Chart } from "../components/Chart";
import { SearchByDate } from "../components/Search.js";
import { Table } from "../components/Table.js"
import  ErrorPage from "./ErrorPage";
  
/* price history page */
export default function PriceHistory() {
  // stock symbol
  const {id} = useParams();
  // price history from Alpha Advantage API
  const {loading, stockInfo, error, found} = useStockInfo(id);
  // search query
  const [search, setSearch] =useState ('');
  // list of dates when stock prices are available
  let dates = []
  // company name passed from the Stocks page
  const location = useLocation();
  let name = location.state

  // if stockInfo has price history, update the list of dates
  if (found) {
    dates = (stockInfo.map(row=>row.date));
  }

  // if the page is not accessed from the Stocks page, change the name to teh symbol
  if (name===undefined){
    name=id
  }
  
  // table column definition
  const columns = [
    { headerName: "Date", field: "date", sortable: true, flex:1, width: 100},
    { headerName: "Open", field: "open", sortable: true, flex:1,width: 100},
    { headerName: "High", field: "high", sortable: true, flex:1, width: 100},
    { headerName: "Low", field: "low",sortable: true, flex:1, width: 100},
    { headerName: "Close", field: "close", sortable: true, flex:1,width: 100},
    { headerName: "Volume", field: "volume", sortable: true, flex:1, width: 100},
    ];

  // display loading if loding data
  if (loading){
    return <p>Loading...</p>;
  }

  // display an error page if there is a server side error
  if (error){
    return <ErrorPage errorCode={"500 - Server Error"} 
    errorMessage={error.message}
    linkRoot="/stocks/" rootName="Go to Stocks"/>
  }

  // display an error page if stockInfo is empty
  if (!found){
    return <ErrorPage errorCode={"400 - Bad Request"} 
    errorMessage={"You have hit the API access limit of 5 times per minute. Or the requested symbol does not exist"}
    linkRoot="/stocks/" rootName="Go to Stocks"/>
  } 

  // display if stockInfo is returned successfully
  if (found){
    return (
      <Container className="jumbotron vertical-center">
        <Row className="row my-3">
          <Col>
          </Col>
          <Col lg={8} xs={12} md={12} sm={12}>
            <h2>Showing stocks for {name}</h2>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row className="row my-3">
          <Col>
          </Col>
          <Col lg={8} xs={12} md={12} sm={12}>
            <SearchByDate availableDates={dates} label={"Select dates from"} onSubmit={setSearch}/>
          </Col>
          <Col>
          </Col>         
        </Row>
        <Row className="row my-3">
          <Col></Col>
          <Col lg={8} xs={12} md={12} sm={12}>
            <Table tableStyle={{height: "350px", width: "100%"}} column={columns} data={search ? stockInfo.filter(row => row.date >= search): stockInfo} addPagination={true} paginationSize={10} />       
          </Col>
          <Col></Col>
        </Row>
        <Row className="row my-3">
          <Col></Col>
          <Col lg={8} xs={12} md={12} sm={12}>
            <Chart table={search ? stockInfo.filter(row => row.date >= search): stockInfo}/>
          </Col>
          <Col></Col>
        </Row>        
      </Container> 
    )
  }
}