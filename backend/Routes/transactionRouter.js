import { Router } from "express";
import { addIncome, deleteIncome, incomeByDate, retreiveIncome } from "../Controllers/incomeController.js";
import { retreiveExpense, addExpense, deleteExpense, expenseByDate } from "../Controllers/expenseController.js"

const transactionRouter = Router()

// INCOME
transactionRouter.get("/income/:userId",retreiveIncome)
transactionRouter.get("/income/by-date/:userId",incomeByDate)
transactionRouter.post("/income/:userId",addIncome)
transactionRouter.delete("/income/:incomeId/:userId",deleteIncome)

// EXPENSE
transactionRouter.get("/expense/:userId",retreiveExpense)
transactionRouter.get("/expense/by-date/:userId",expenseByDate)
transactionRouter.post("/expense/:userId",addExpense)
transactionRouter.delete("/expense/:expenseId/:userId",deleteExpense)

export default transactionRouter