import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import img1 from './assets/logo_1.png'
import img2 from './assets/logo_2.png'
import img3 from './assets/logo_3.png'
import img4 from './assets/logo_4.png'
import img5 from './assets/logo_5.png'
import img6 from './assets/logo_6.png'
import img7 from './assets/logo_7.png'
import img8 from './assets/logo_8.png'

const images = [img1, img2, img3, img4, img5, img6, img7, img8]

// const element = <h1>HELLO FROM JSX </h1>
 console.log("update")

class PlayGround extends React.Component {
	constructor(props) {
		super(props)
		//initial state
		this.state = {
			//names changed to number for easy call 
			allBrands: ['1','2','3','4','5','6','7','8'],
			duplicatedCarsBrans: [],
		  BrandsRandom: [],
		  finalizedCarsBrands: [],
			openedCarsBrands: []
		}
		this.start()
	  }
	  // on click name of the card, and index in de array
	  handleClick(name, index){
		  console.log("number ", name, "index ", index)
		// if 2 cards clicked, call check function also shows the cards for 750ms
		if(this.state.openedCarsBrands.length == 2){
		  setTimeout(() => {
				this.check()
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
					},750)
		  		}
				}
				console.log(this.state.openedCarsBrands.length)
	  	} 
	  // check if the pair of cards its ok or not
	  check(){
		// the finalized pairs 
			let finalizedCarsBrands_local = this.state.finalizedCarsBrands
		// check the name is the same but the inmdex is diferent
			if((this.state.openedCarsBrands[0].name == this.state.openedCarsBrands[1].name) && (this.state.openedCarsBrands[0].index != this.state.openedCarsBrands[1].index)){
				// set complete to true
				finalizedCarsBrands_local[this.state.openedCarsBrands[0].index].complete = true
				finalizedCarsBrands_local[this.state.openedCarsBrands[1].index].complete = true
				console.log("match!")
			}
			else {
			// filp the cards again
			finalizedCarsBrands_local[this.state.openedCarsBrands[0].index].close = true
			finalizedCarsBrands_local[this.state.openedCarsBrands[1].index].close = true
			}
		// update state
			this.setState({
				// updates the arrays of the state
		  	finalizedCarsBrands : finalizedCarsBrands_local,
				openedCarsBrands : []	
		})
	  }
	  start(){
		  //sets empty the array
			let finalizedCarsBrands = [];
			// fill the array with two time the cars brands
			this.state.duplicatedCarsBrans = this.state.allBrands.concat(this.state.allBrands)
			this.state.BrandsRandom = this.shuffle(this.state.duplicatedCarsBrans)
			this.state.BrandsRandom.map((name,index) => {
		 	finalizedCarsBrands.push({
				name,
				close: true,
				complete: false
		  		})
			})
		this.state.finalizedCarsBrands = finalizedCarsBrands
		}
		// shuffle cards
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
		// renders the aplication.
		render(){
		return (
		  <div className="playground">
			  {
				this.state.finalizedCarsBrands.map((brand, index) => {
					// {console.log('index', index)}
					// {console.log('bramd', brand.name)}
					// {console.log('close', brand.close)}
					// {console.log('complete', brand.complete)}
				  return <Card brand={brand.name} click={() => {this.handleClick(brand.name,index)}} close={brand.close} complete={brand.complete}/>
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
	clicked(brand){
	  this.props.click(brand)
	}
	render(){
	  return (
		<div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.brand)}>
		  <div className="front">
			Back
		  </div>
		  <div className="back">
			<img src={images[this.props.brand-1]}/>
		  </div>
		</div>
	  )
	}
}
  
  ReactDOM.render( <PlayGround/>, document.getElementById('index'))