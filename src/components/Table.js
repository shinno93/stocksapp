import React from "react"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

/* search function by a date, includes a submit button 
 * @props
 *  style: style of the table (length, width ect.)
 *  column: column definition 
 *  rowData: object of data
 *  addPagination: boolean value to set whether pagination is enabled
 *  paginationSize: how many rows to show in a page
 */
export function Table(props) {
    return (
        <div
        className="ag-theme-balham"
        style={props.tableStyle}
        >
        <AgGridReact columnDefs={props.column} rowData={props.data} pagination={props.addPagination} paginationPageSize={props.paginationSize}/>
      </div>

    );
}