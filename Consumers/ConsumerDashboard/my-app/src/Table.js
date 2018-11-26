import React, { Component } from "react";
import "./App.css";

class Table extends Component {
  render() {
    return <div>
        <table id="metrics">
          <thead>
          <tr>
            <th>Temperatura</th>
            <th>Luminosidade</th>
            <th>Salinidade</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td> {this.props.values.temperatura} ºC</td>
              <td> {this.props.values.luminosidade} Lumens</td>
              <td>{this.props.values.salinidade} g/Kg </td>
            </tr>
          </tbody>
        </table>
      </div>;
  }
}

export default Table;
