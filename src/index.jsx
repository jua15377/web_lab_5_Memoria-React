import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1>HELLO FROM JSX </h1>
console.log("works!")
class App extends React.Component{
constructor(props){
	super(props)
	this.state = {
		hasWon: false,
		mat: Array(16).fill(null)
	}
}
    render() {
        const gridstyle = {
            display: 'grid',
            gridTemplateRows: '150px 150px 150px 150px',
            gridTemplateColumns: '150px 150px 150px 150px',
            gridGap: '10px',
			width: '650px',
			margin: '30px auto' 
			
		}
		const elementstyle = {
            borderRadius: '5px',
			fontSize: '60px',
			backgroundColor: "blue"
        }

        return (
			<div style={gridstyle}>
			{
				this.state.mat.map((matelement, index) => {
					return (
						<div 
							key={index} 
							style={elementstyle}
						/>
					)
				})
			}
		</div>
        )
    }
}

ReactDOM.render(
	<App/>,
	document.getElementById('index')
)