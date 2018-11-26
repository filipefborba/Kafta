import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import axios from 'axios';

const initialValues = {
  temperatura: 'Sem dados',
  volume: 'Sem dados',
  salinidade: 'Sem dados'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablePacificValues:null,
      tableAtlanticValues:null,
      graphicPacificValues: null,
      graphicAtlatincValues: null,
      "pacific": {
        "pacific-1": initialValues,
        "pacific-2": initialValues,
        "pacific-3": initialValues,
        "pacific-4": initialValues,
        "pacific-5": initialValues
      },
      "atlantic": {
        "atlantic-1": initialValues,
        "atlantic-2": initialValues,
        "atlantic-3": initialValues,
        "atlantic-4": initialValues,
        "atlantic-5": initialValues
      }
    };
    this.getAtlanticValues =  this.getAtlanticValues.bind(this);
    this.getPacificValues =  this.getPacificValues.bind(this);
  }

  getAtlanticValues() {
    axios.get("http://localhost:8888/atlantic_topic")
      .then(res => {        
        try {
          var data = JSON.parse(res.data);
          this.updateValues(data, "atlantic");
        }
        catch (e) {
          console.log(e);
        }
      })
      .then(res => {
        setTimeout(function () {
          this.getAtlanticValues();
        }.bind(this), 200);
      }).catch(e => {
        setTimeout(function () {
          this.getAtlanticValues();
        }.bind(this), 200);
      });
  }

  getPacificValues() {
    axios.get("http://localhost:8888/pacific_topic")
      .then(res => {
        try {
          var data = JSON.parse(res.data);
          this.updateValues(data, "pacific");
        }
        catch (e) {
          console.log(e);
        }  
      })
      .then(res => {
        setTimeout(function() {
          this.getPacificValues();
        }.bind(this), 200);
      }).catch(e => {
        setTimeout(function () {
          this.getPacificValues();
        }.bind(this), 200);
      });
  }

  updateValues(data, ocean) {
    let id = data.id;
    
    const state = this.state;
    state[ocean][id] = data;
    this.setState(state);
  }

  //Objeto inteiro
  // updateValues(data, ocean) {
    
  //   const state = this.state;
  //   state[ocean] = data;
  //   this.setState(state);
  // }

  render() {   
    this.getAtlanticValues();
    this.getPacificValues();    
    return <div className="App" >
        <h1 className='tittle'> Centro de Controle Oceânico (CCO)</h1>
        <div className='table-wrappers'>
          <div>
            <h2>Dados Oceano Pacífico</h2>
            <Table 
              values = {this.state.pacific}
              whichTopic='pacific'
            />
          </div>
          <div>
            <h2>Dados Oceano Atlântico</h2>
            <Table 
              values = {this.state.atlantic}
              whichTopic='atlantic'
            />
          </div>
        </div>
      </div>;
  }
}

export default App;
