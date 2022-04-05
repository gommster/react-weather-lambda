import React, {Component} from 'react';
import axios from 'axios';
import './CityIO.css';

export class CityIO extends Component {
    constructor() {
        super();

        this.state = {
            city: '',
            results: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.get('https://dc627tab9g.execute-api.us-east-1.amazonaws.com/default/getCurrentWeather', { params: { city: this.state.city } });
        this.setState({results: JSON.stringify(res, null, 4)})
    }

    render() {
        console.log('tHIS IS THE STATE', this.state)
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>City</div>
                <input className={'city-input'} type={'text'} onChange={(event) => this.setState({city: event.target.value})}/>
                <input className={'submitButton'} type={'submit'} value={'Submit'}/>
            </form>
            <textarea disabled value={this.state.results} className={'result'}/>
      </div>
    }
}