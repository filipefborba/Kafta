import React, { Component } from "react";
import "./App.css";

class Table extends Component {
  render() {
    var index = Object.keys(this.props.values)

    return <div>
        <table id="metrics" styles={{background: "white"}}>
          <thead>
          <tr>
            <th>Sensor</th>
            <th>Temperatura</th>
            <th>Luminosidade</th>
            <th>Salinidade</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td> {this.props.values[index[0]].id}</td>
              <td> {this.props.values[index[0]].temperatura} ºC</td>
              <td> {this.props.values[index[0]].luminosidade} Lumens</td>
              <td>{this.props.values[index[0]].salinidade} g/Kg </td>
            </tr>
            <tr>
              <td> {this.props.values[index[1]].id}</td>
              <td> {this.props.values[index[1]].temperatura} ºC</td>
              <td> {this.props.values[index[1]].luminosidade} Lumens</td>
              <td>{this.props.values[index[1]].salinidade} g/Kg </td>
            </tr>
            <tr>
              <td> {this.props.values[index[2]].id}</td>
              <td> {this.props.values[index[2]].temperatura} ºC</td>
              <td> {this.props.values[index[2]].luminosidade} Lumens</td>
              <td>{this.props.values[index[2]].salinidade} g/Kg </td>
            </tr>
            <tr>
              <td> {this.props.values[index[3]].id}</td>
              <td> {this.props.values[index[3]].temperatura} ºC</td>
              <td> {this.props.values[index[3]].luminosidade} Lumens</td>
              <td>{this.props.values[index[3]].salinidade} g/Kg </td>
            </tr>
            <tr>
              <td> {this.props.values[index[4]].id}</td>
              <td> {this.props.values[index[4]].temperatura} ºC</td>
              <td> {this.props.values[index[4]].luminosidade} Lumens</td>
              <td>{this.props.values[index[4]].salinidade} g/Kg </td>
            </tr>
          </tbody>
        </table>
      </div>;
  }
}

export default Table;
