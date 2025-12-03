import { Router } from "express";
import { addIncome, deleteIncome, retreiveIncome, updateIncome } from "../Controllers/incomeController.js";
import { retreiveExpense, addExpense, updateExpense, deleteExpense } from "../Controllers/expenseController.js"

const router = Router()

// INCOME
router.get("/income",retreiveIncome)
router.post("/income",addIncome)
router.put("/income/:id",updateIncome)
router.delete("/income/:id",deleteIncome)

// EXPENSE
router.get("/expense",retreiveExpense)
router.post("/expense",addExpense)
router.put("/expense/:id",updateExpense)
router.delete("/expense/:id",deleteExpense)

export default router