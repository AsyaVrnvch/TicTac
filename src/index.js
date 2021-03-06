import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes, { func } from 'prop-types';
import reactDom from 'react-dom';
import './style.css'
import { stat } from 'fs';

class App extends Component{
    render() {
        return(
            <div className='game'>
                <div className='game-board'><Board/></div>
                <div className='game-info'>
                <ol>{}</ol>
                </div>
            </div>
        )
    }
}
class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
            xIsNext:true,
        }
    }
    handleclick(i){
        const squares=this.state.squares.slice();
        if(calculateWinner(squares)||squares[i]) {
            return;
        }
        squares[i]=this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares:squares,
            xIsNext:!this.state.xIsNext,
        })
    }
    again(){
        this.setState({
            squares:Array(9).fill(null),
        })
    }
    renderSquare(i){
        return (
            <Square 
            value={this.state.squares[i]}
            onClick={()=>this.handleclick(i)}/>
        )
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner){
            status='Win '+winner;
        }
        else {
            status='next player:'+(this.state.xIsNext ? 'X' : 'O');
        }
        return(
            <div>
                <div className='status'>{status}</div>
                <div className='row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <button className='again' onClick={()=>this.again()}>again</button>
            </div>
        )
    }
}

function Square (props){
    return(
        <button className='square' 
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
            return squares[a];
        }
    }
    return null;
}


ReactDOM.render(<App/>,document.getElementById('root'))
