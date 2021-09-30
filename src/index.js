import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import './index.css';


function Square(props) {


    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}


class Board extends React.Component {

    renderSquare(i) {
        // ye props bhejrhen hain ham square class mein
        return ( 
            <Square value={this.props.squares[i]} onClick={()=> this.props.onClick(i)}/>
        )
        ;
    }

    render() {
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );

        
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history : [
                {squares : Array(9).fill(null)}
            ],
            xIsNext : true,
            total_turns : 0,
            step_number : 0,
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length -1]; // extracts the msot recent squares array OBJECT
        const winner = calcualte_winner(current.squares);
        const squares = current.squares.slice();
        var turn = this.state.xIsNext ? 'X' : 'O';

        if (squares[i] || winner) {
            return;
        }
        squares[i] = turn;
        this.setState({
            history : history.concat([{squares : squares,}]),
            xIsNext : !this.state.xIsNext,
            total_turns : this.state.total_turns + 1
        });
    }

    jumpTo(step){

        let shorted_history = this.state.history.slice(0,step + 1);
        // console.log(shorted_history);

        this.setState({
            step_number : step,
            xIsNext : (step % 2) === 0,
            history : shorted_history,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[history.length -1]; // extracts the msot recent squares array OBJECT
        const winner = calcualte_winner(current.squares);
        let status;
        
        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : `Go to game start`;
        return (
            <li key={move}>
                <button className='btn_list' onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );
        });


        // console.log(moves);

        if (winner === 'O' || winner === 'X') {
            status = 'Winner is:' + winner;
        } else {
            status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        if (this.state.total_turns === 9) {
            status = 'Match Draw!';
            console.log(status);
        }
        
        // message = 'This is my game \n please try';

        return (
        <div className="game">
            <div className='heading'>
                Tic-Tac-Toe Game<br />
            </div>

            <div className="gameinfoboard">
                <div className="game-board">
                <Board squares={current.squares} onClick={(i)=> this.handleClick(i)} />
                </div>

                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                </div>
            </div>
            
        </div>

        );
    }
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);


function calcualte_winner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    var winner;

    lines.forEach(i => {
        if (squares[i[0]] === squares[i[1]] && squares[i[1]] === squares[i[2]]){
            // console.log(squares[i[0]]);
            winner = squares[i[0]];
        }
    });

    return winner;
}

const element = React.createElement(
    'div',
    {id : 'login-btn'},
    'Login'
)