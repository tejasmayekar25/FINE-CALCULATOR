# FINE-CALCULATOR (Expense & Loan EMI Calculator)

## Overview

Fine Calculator is a simple web-based financial tool that helps users manage their daily expenses, calculate loan EMI, track monthly income, and visualize spending patterns through charts.
It provides an easy interface to add expense categories, calculate total expenses, and compare them with income.

The application also allows users to export their financial data as a CSV file for further analysis in spreadsheet software like Microsoft Excel.

---

# Features

### 1. Daily Expense Management

* Add multiple expense categories (Food, Travel, Bills, etc.)
* Automatically calculates total daily expenses
* Displays the list of entered expenses

### 2. Loan EMI Calculator

* Calculates EMI based on:

  * Loan Amount
  * Interest Rate
  * Loan Tenure (months)
* Uses the standard EMI formula used by banks

### 3. Income & Balance Calculation

* Enter monthly income
* Calculates:

  * Total expenses + EMI
  * Remaining balance

### 4. Data Visualization

Two charts help understand financial distribution:

**Expense vs EMI Pie Chart**

* Shows how expenses and EMI are distributed

**Budget Comparison Bar Chart**

* Compares income vs expenses + EMI

Charts are created using **Chart.js**.

### 5. Export to Excel (CSV)

* Generates a financial report
* Includes:

  * Expense categories
  * EMI
  * Income
  * Total expenses
  * Remaining balance
  * Timestamp of report generation
* File downloads automatically as **FineCalculator_Report.csv**

---

# Technologies Used

| Technology | Purpose                   |
| ---------- | ------------------------- |
| HTML       | Structure of the web page |
| CSS        | Styling and layout        |
| JavaScript | Application logic         |
| Chart.js   | Data visualization        |
| CSV Export | Data export for Excel     |

---

# How to Use

### Step 1: Add Expenses

1. Enter expense name.
2. Enter amount.
3. Click **Add Expense**.

### Step 2: Calculate EMI

1. Enter Loan Amount.
2. Enter Annual Interest Rate.
3. Enter Loan Tenure (months).
4. Click **Calculate EMI**.

### Step 3: Add Income

1. Enter monthly income.
2. Click **Calculate Balance**.

### Step 4: View Charts

* Pie chart shows expense distribution.
* Bar chart compares income with expenses.

### Step 5: Export Report

Click **Export to Excel (CSV)** to download the financial report.

---

# EMI Formula Used

[
EMI = \frac{P \times r \times (1+r)^n}{(1+r)^n - 1}
]

Where:

* **P** = Loan Amount
* **r** = Monthly Interest Rate (Annual Rate / 12 / 100)
* **n** = Loan Tenure in months

---

# Project Structure

```
Fine-Calculator/
│
├── index.html      # Main application file
├── README.md       # Project documentation
```

---

# Future Improvements

* Expense editing and deletion
* Monthly expense tracking
* Data storage using Local Storage or Database
* Mobile responsive design
* Download report in PDF format

---

# Author

Developed as a simple financial management web tool using HTML, CSS, and JavaScript.
