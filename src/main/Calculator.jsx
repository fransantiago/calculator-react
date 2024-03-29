import React, { Component } from 'react';
import './Calculator.css';

import Display from '../Components/Display';
import Button from '../Components/Button';

const initialState = {
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = {...initialState}
    
    applyCalculationOverTwoNumbers (operation, [n1, n2]) {
        switch (operation) {
            case '+':
                return n1 + n2;
            case '-':
                return n1 - n2;
            case '*':
                return n1 * n2;
            default:
                return !n2 ?  0 : n1 / n2;
        }
    }

    clearMemory = () => {
        this.setState({...initialState});
    }

    setOperation = operation => {
        if(this.state.current === 0){
            if( operation === '=') return ;
            
            this.setState({
                operation,
                current: 1,
                clearDisplay: true
            })
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            values[0] = this.applyCalculationOverTwoNumbers(currentOperation, values);
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit = n => {
        if (n === '.'
                && typeof this.state.displayValue !== 'number'
                && this.state.displayValue.includes('.')
            )
            return ;

        const clearDisplay = (this.state.displayValue === 0 && n !== '.') || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({displayValue, clearDisplay : false});

        if (n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
        }
    }

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        );
    }
}