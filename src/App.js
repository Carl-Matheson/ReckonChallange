import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      range: [],
      divisor: [],
      isLoaded: false
    }
  }

  componentDidMount(){
    fetch('https://join.reckon.com/test1/rangeInfo')
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        range: json,
        isLoaded: true
      })
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('https://join.reckon.com/test1/divisorInfo')
    .then(res => res.json())
    .then(json => {
      console.log(json);      
      this.setState({
        divisor: json.outputDetails,
        isLoaded: true
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){

    if(!this.state.isLoaded) {
      return <div>Loading....</div>
    }

    else {         

      var items = [];
      var upper = this.state.range.upper;
      var lower = this.state.range.lower;
          
      for(var i = 0; i < this.state.divisor.length; i++){
        for(var number = 1; upper >= number && lower <= number; number++){
          if(number % this.state.divisor[i].divisor === 0 && items[number] == null){
            items[number] = this.state.divisor[i].output;
          } else if (number % this.state.divisor[i].divisor === 0 && items[number] != null){
            items[number] += this.state.divisor[i].output;
          } else if(items[number] == null) {
            items[number] = null;
          }
        }   
      }
      
      return (
        <div className="App">
          <ol>
            {items.map((item, key)=>{
               return<li key={key}>{item}</li>
            })}
          </ol>
        </div>
      );
    }
  }
}

export default App;
