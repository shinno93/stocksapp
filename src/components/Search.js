import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Form, Row, Button, Col } from "react-bootstrap";


/* search function by a text input, include a submit button and a reset buttion
 * @props
 *  onSubmit():submit the search query
 */
export function SearchByText(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const textInput = useRef();


  const clearInput = () => {
    textInput.current.value = ""
    props.onSubmit("")
  }

  return (
    <div>
        <Form>
          <Form.Row>
            <Col xs={6} sm={6} lg={6}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control ref={textInput} aria-label="search-button" placeholder="Search by a symbol" onChange={e => setInnerSearch(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Button className="mx-2" id="search-button" variant="primary" type="button" onClick = {() => props.onSubmit(innerSearch)}>
                Search
              </Button> 

              <Button id="clear-button" variant="primary" type="button" onClick = {() => clearInput()}>
                Clear
              </Button>
            </Col>
          </Form.Row>                         
        </Form>   
    </div>
  );
}

/* search function by a dropdown list, select an item and it will automatically submit the item
* @props
*  dropdowns: list of strings to show in the dropdown list
*  placeholder: placeholder text for the input field
*  onSubmit():submit the selected industry
*/
export function SearchByDropdown(props) {
  const [innerSearch, setInnerSearch] = useState("");
  let options = [];
  options.push({
    value: "",
    label: "All"
  })
  for (let i in props.dropdowns){
    options.push({
      value: props.dropdowns[i],
      label: props.dropdowns[i],
  })
  }

  useEffect(()=>{
    props.onSubmit(innerSearch);
  })

  return (
    <div>
      <Form>
        <Form.Row>
          <Col xs={8} sm={6} lg={6}>
          <Select onChange={(e)=> setInnerSearch(e.value)} options={options} placeholder={props.placeholder} />
          </Col>
        </Form.Row>
      </Form>      
    </div>
  );
} 

/* search function by a date, includes a submit button 
 * @props
 *  availableDates: list of available dates (YYYY-MM-DD format) to include in the calender
 *  label: label for the input field
 *  onSubmit(): submit the start date
 */
export function SearchByDate(props) {
  let formattedDate = []
  for (let i in props.availableDates){
    formattedDate[i] = new Date(props.availableDates[i])
  }
  const [startDate, setStartDate] = useState(new Date(formattedDate.slice(-1)));

  return (
    <div>
      <Form>
      <Row className="align-items-center">
        <Col  xs={8} sm={8} md={7} lg={7} >
          <label>{props.label}&nbsp;</label>
          <DatePicker selected={startDate} dateFormat="yyyy/MM/dd" includeDates={formattedDate} onChange={date => setStartDate(date) } isClearable  />
            
            
        </Col>
        <Col>
          <Button id="search-button" variant="primary" type="button" onClick = {() => props.onSubmit(startDate ? moment(startDate).format('YYYY-MM-DD') : "")}>
            Search
          </Button> 
        </Col>
      </Row>      
      </Form>
        
    </div>
  
  );
}