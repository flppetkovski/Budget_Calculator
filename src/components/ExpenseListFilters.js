import React from "react";
import { connect } from "react-redux";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../actions/filters";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

class ExpenseListFilters extends React.Component {
  state = {
    focusedInput: null,
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };
  onFocusChange = (focusedInput) => {
    this.setState(() => ({ focusedInput }));
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group"></div>
        <div className="input-group__item">
          <input
            type="text"
            placeholder="Search Expenses"
            className="text-input"
            value={this.props.filters.text}
            onChange={(e) => {
              this.props.dispatch(setTextFilter(e.target.value));
            }}
          />
        </div>
        <div className="input-group__item">
          <select
            className="select"
            value={this.props.filters.sortBy}
            onChange={(e) => {
              if (e.target.value === "date") {
                this.props.dispatch(sortByDate());
              } else if (e.target.value === "amount") {
                this.props.dispatch(sortByAmount());
              }
            }}
          >
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="input-group__item">
          <DateRangePicker
            startDateId={"StartDayID"}
            endDateId={"EndDayID"}
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => this.setState({ focusedInput })}
            isOutsideRange={() => false}
            numberOfMonths={1}
            showClearDates={true}
          />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStatetoProps)(ExpenseListFilters);
