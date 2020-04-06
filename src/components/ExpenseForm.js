import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? props.expense.amount.toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please Provide Valid Description And Amount",
      }));
    } else {
      this.setState(() => ({
        error: "",
      }));

      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };
  render() {
    return (
      <div className="content-container">
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className="form__error">{this.state.error}</p>
          )}
          <input
            className="text-input"
            type="text"
            autoFocus
            placeholder="Add Description"
            value={this.state.description}
            onChange={(e) => {
              const description = e.target.value;
              this.setState(() => ({ description }));
            }}
          />
          <input
            type="number"
            className="text-input"
            step=".01"
            placeholder="Set Amount"
            value={this.state.amount}
            onChange={(e) => {
              const amount = e.target.value;
              this.setState(() => ({ amount }));
            }}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            className="text-area"
            placeholder="Add A Note About Your Expense"
            value={this.state.note}
            onChange={(e) => {
              const note = e.target.value;
              this.setState(() => ({ note }));
            }}
          />
          <div>
            <button className="button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
