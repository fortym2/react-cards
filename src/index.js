import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Heading extends React.Component {
    render() {
        let style = {background: this.props.background}
        return (
            <div className="heading" style={style}>
                <img src="react-logo.svg" alt="React Logo" width="100px" />
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class CardTitle extends React.Component {
    render() {
        return (
            <div className="card-title">
                {this.props.title}
            </div>
        )
    }
}

class CardBody extends React.Component {
    render() {
        return (
            <div className="card-body">
                {this.props.children}
            </div>
        )
    }
}

class CardButton extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        this.props.removeCard(this.props.index);
    }

    render() {
        return (
            <div className="card-button-container">
                <button className="card-button" onClick={this.remove}>Remove</button>
            </div>
        )
    }
}

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <CardTitle title={this.props.title}/>
                <CardBody>{this.props.children}</CardBody>
                <CardButton removeCard={this.props.removeCard} index={this.props.index} />
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            cards: [
                ['Card 1', 'With some text inside.'],
                ['Another card', 'With some more text.'],
                ['Last one', 'We are done now.']
            ],
            newCardTitle: '',
            newCardBody: ''
        }
    }

    addCard(event) {
        this.state.cards.push([this.state.newCardTitle, this.state.newCardBody]);
        this.setState({cards: this.state.cards});
        event.preventDefault();
    }

    removeCard(key) {
        this.state.cards.splice(key, 1);
        this.setState({cards: this.state.cards})
    }

    eachCard(title, body, i) {
        return <Card title={title} key={i} index={i} removeCard={this.removeCard}>{body}</Card>
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="board-container">
                <div className="form-card-adder">
                    <p className={"form-title"}>Add a new card</p>
                    <form onSubmit={this.addCard}>
                        <label>
                            Card Title:<br/>
                            <input type="text" value={this.state.newCardTitle} onChange={this.handleChange} name="newCardTitle" id="newCardTitle" placeholder="Card Title"/>
                        </label>
                        <br/>
                        <label>
                            Card Body:<br/>
                            <textarea value={this.state.newCardBody} onChange={this.handleChange} name="newCardBody" id="newCardTitle" cols="15" rows="5" placeholder="Card Body"/>
                        </label>
                        <br/>
                        <input type="submit" value="Add Card" />
                    </form>
                </div>
                <div className="board">
                    {this.state.cards.map(
                        ([title, body], i) => this.eachCard(title, body, i)
                    )}
                </div>
            </div>
        )
    }
}

class Page extends React.Component {
    render() {
        return (
            <div>
                <Heading title="First React Encounter" subtitle="doing things without meaning" background="rgb(40, 44, 52)"/>
                <Board />
            </div>
        )
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
registerServiceWorker();
