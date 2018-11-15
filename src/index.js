import React from 'react'
import ReactDOM from 'react-dom'

// const element = <h1>HELLO FROM JSX </h1>
 console.log("update")
// class App extends React.Component{
// constructor(props){
// 	super(props)
// 	this.state = {
// 		hasWon: false,
// 		mat: Array(16).fill(null)
// 	}
// }
//     render() {
//         const gridstyle = {
//             display: 'grid',
//             gridTemplateRows: '150px 150px 150px 150px',
//             gridTemplateColumns: '150px 150px 150px 150px',
//             gridGap: '10px',
// 			width: '650px',
// 			margin: '30px auto' 
			
// 		}
// 		const elementstyle = {
//             borderRadius: '5px',
// 			fontSize: '60px',
// 			backgroundColor: "red"
//         }

//         return (
// 			<div style={gridstyle}>
// 			{
// 				this.state.mat.map((matelement, index) => {
// 					return (
// 						<div 
// 							key={index} 
// 							style={elementstyle}
// 						/>
// 					)
// 				})
// 			}
// 		</div>
//         )
//     }
// }

// ReactDOM.render(
// 	<App/>,
// 	document.getElementById('index')
// )

class PlayGround extends React.Component {
	constructor(props) {
		super(props)
		//initial state
		this.state = {
			//arrays for control and values
		  carsBrands: ['angular2','vue','react','grunt','phantomjs','ember','babel','ionic','gulp','meteor','yeoman','yarn','nodejs','bower','browserify'],
		  duplicatedCarsBrans: [],
		  randomizedCarsBrands: [],
		  finalizedCarsBrands: [],
		  openedCarsBrands: []
		}
		this.start()
	  }
	  // on click name of the card, and index in de array
	  handleClick(name, index){
		  console.log("name ", name, "index ", index)
		// if 2 cards clicked, call check function also shows the cards for 750ms
		if(this.state.openedCarsBrands.length == 2){
		  setTimeout(() => {
			this.check()
			console.log("on click if 1")
		  },750)
		}
		else {
		  let CarBrand = {name, index}
		  // gets solved cards on the state
		  let finalizedCarsBrands = this.state.finalizedCarsBrands
		  let carsBrands = this.state.openedCarsBrands
		  finalizedCarsBrands[index].close = false
		  carsBrands.push(CarBrand)
		  // update the state
		  this.setState({
			openedCarsBrands: carsBrands,
			finalizedCarsBrands: finalizedCarsBrands
		  })
		  //checks again
		  if(this.state.openedCarsBrands.length == 2){
			setTimeout(() => {
			  this.check()
			  console.log("on click if 2")
			},750)
		  }
		}
	  } 
	  // check if the pair of cards its ok or not
	  check(){
		// the finalized pairs 
		let finalizedCarsBrands = this.state.finalizedCarsBrands
		// check the name is the same but the inmdex is diferent
		if((this.state.openedCarsBrands[0].name == this.state.openedCarsBrands[1].name) && (this.state.openedCarsBrands[0].index != this.state.openedCarsBrands[1].index)){
			// set complete to true
			finalizedCarsBrands[this.state.openedCarsBrands[0].index].complete = true
		  	finalizedCarsBrands[this.state.openedCarsBrands[1].index].complete = true
		}else {
			// filp the cards again
		  	finalizedCarsBrands[this.state.openedCarsBrands[0].index].close = true
		  	finalizedCarsBrands[this.state.openedCarsBrands[1].index].close = true
		}
		// update state
		this.setState({
			// updates the arrays of the state
		  	finalizedCarsBrands,
		  	openedFrameworks: []
		})
	  }
	  start(){
		  //sets empty the array
			let finalizedFrameworks = [];
			// fill the array with two time the cars brands
			this.state.duplicatedCarsBrans = this.state.carsBrands.concat(this.state.carsBrands)
			this.state.randomizedCarsBrands = this.shuffle(this.state.duplicatedCarsBrans)
			this.state.randomizedCarsBrands.map((name,index) => {
		 	finalizedFrameworks.push({
				name,
				close: true,
				complete: false,
				fail: false
		  		})
			})
		this.state.finalizedCarsBrands = finalizedFrameworks
	  }
	  shuffle(array){
		let currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
		return array
	  }
	  render(){
		
		return (
		  <div className="playground">
			  {
				this.state.finalizedCarsBrands.map((framework, index) => {
				  return <Card framework={framework.name} click={() => {this.handleClick(framework.name,index)}} close={framework.close} complete={framework.complete}/>
				})
			  }
		  </div>
		)
	  }
  }
  
  class Card extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		
		}
	  }
	clicked(framework){
	  this.props.click(framework)
	}
	render(){
	  return (
		<div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
		  <div className="front">
			?
		  </div>
		  <div className="back">
			<img src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + this.props.framework + ".png"}/>
		  </div>
		</div>
	  )
	}
  }
  
  ReactDOM.render( <PlayGround/>, document.getElementById('index'))