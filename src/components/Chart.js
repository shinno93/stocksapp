import React from "react";
import {Line} from "react-chartjs-2";

/* use chart.js to display a line graph
 * @props
 *  table: object of data
 */
export function Chart({table}) {
  const reversedTable = [...table].reverse();
  let dates = reversedTable.map(row=>row.date);
  let closingPrices = reversedTable.map(row=>row.close); 

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Closing price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: closingPrices
      }
    ]
  };

  const graphOptions = {
    title:{ display:true, text:"Closing Price", fontSize:20},
    scales: {yAxes: [{scaleLabel: { display: true, labelString: "Price ($)"}}]}};

    return (
        <div>
            <Line data={state} options={graphOptions}/>
        </div>
    )
}
