import { Router } from "express";
import { addIncome, deleteIncome, incomeByDate, retreiveIncome, updateIncome } from "../Controllers/incomeController.js";
import { retreiveExpense, addExpense, updateExpense, deleteExpense, expenseByDate } from "../Controllers/expenseController.js"

const transactionRouter = Router()

// INCOME
transactionRouter.get("/income",retreiveIncome)
transactionRouter.get("/income/by-date",incomeByDate)
transactionRouter.post("/income",addIncome)
transactionRouter.put("/income/:id",updateIncome)
transactionRouter.delete("/income/:id",deleteIncome)

// EXPENSE
transactionRouter.get("/expense",retreiveExpense)
transactionRouter.get("/expense/by-date",expenseByDate)
transactionRouter.post("/expense",addExpense)
transactionRouter.put("/expense/:id",updateExpense)
transactionRouter.delete("/expense/:id",deleteExpense)

export default transactionRouter