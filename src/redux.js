import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: { id: uuidv4(), description, note, amount, createdAt }
});

const removeExpense = ({ id } = {}) => ({ type: "REMOVE_EXPENSE", id });

const exitExpense = (id, updates) => ({ type: "EDIT_EXPENSE", id, updates });

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});
const setEndDate = endDate => ({ type: "SET_END_DATE", endDate });

const sortByDate = () => ({ type: "SORT_BY_DATE" });
const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" });

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return [...state, action.expense];
    }
    case "REMOVE_EXPENSE": {
      return state.filter(({ id }) => id !== action.id);
    }
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        } else {
          return expense;
        }
      });

    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER": {
      return { ...state, text: action.text };
    }
    case "SORT_BY_DATE": {
      return { ...state, sortBy: "date" };
    }
    case "SORT_BY_AMOUNT": {
      return { ...state, sortBy: "amount" };
    }
    case "SET_START_DATE": {
      return { ...state, startDate: action.startDate };
    }
    case "SET_END_DATE": {
      return { ...state, endDate: action.endDate };
    }
    default:
      return state;
  }
};
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toString().toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

const store = createStore(
  combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(
//   exitExpense(expenseTwo.expense.id, { note: "I will look good" })
// );
// store.dispatch(setTextFilter({ text: "nike" }));
store.dispatch(setTextFilter({ text: "e" }));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(123));
// store.dispatch(setEndDate(4354));

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
  console.log(state);
});

const expenseOne = store.dispatch(
  addExpense({ description: "shoes", amount: 6000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "nike tracksuit", amount: 7000 })
);

export default store;
