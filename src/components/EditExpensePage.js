import React from "react";
import { exitExpense, removeExpense } from "../actions/expenses";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";

const EditExpensePage = (props) => {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm
          expense={props.expense}
          onSubmit={(expense) => {
            props.dispatch(exitExpense(props.expense.id, expense));
            props.history.push("/");
          }}
        />
        <button
          className="button button--secondary"
          onClick={() => {
            props.dispatch(removeExpense({ id: props.expense.id }));
            props.history.push("/");
          }}
        >
          Remove Expense
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(
    (expense) => expense.id === props.match.params.id
  ),
});

export default connect(mapStateToProps)(EditExpensePage);
