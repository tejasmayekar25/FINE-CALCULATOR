let chart = null;
let budgetChart = null;

let expenses = [];
let emiValue = 0;
let incomeValue = 0;

document.addEventListener("DOMContentLoaded", () => {
    const incomeInput = document.getElementById("income");
    const loanInput = document.getElementById("loan");
    const rateInput = document.getElementById("rate");
    const tenureInput = document.getElementById("tenure");

    if (incomeInput) {
        incomeInput.addEventListener("input", updateIncome);
    }

    if (loanInput) loanInput.addEventListener("input", calcBalance);
    if (rateInput) rateInput.addEventListener("input", calcBalance);
    if (tenureInput) tenureInput.addEventListener("input", calcBalance);

    updateIncome();
    calcBalance();
});

function addExpense() {
    const nameInput = document.getElementById("expenseName");
    const amountInput = document.getElementById("expenseAmount");

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({
        name,
        amount
    });

    nameInput.value = "";
    amountInput.value = "";

    renderExpenseList();
    calcExpense();
}

function renderExpenseList() {
    const list = document.getElementById("expenseList");

    if (!list) return;

    list.innerHTML = expenses
        .map(
            (expense, index) => `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#f5f5f5;padding:10px;margin:6px 0;border-radius:6px;">
            <span>${expense.name} : ₹${expense.amount.toFixed(2)}</span>

            <button onclick="deleteExpense(${index})"
                style="background:#FF6384;color:white;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;">
                Delete
            </button>
        </div>
    `
        )
        .join("");
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenseList();
    calcExpense();
}

function updateIncome() {
    const input = document.getElementById("income");
    const display = document.getElementById("incomeDisplay");

    incomeValue = parseFloat(input?.value) || 0;

    if (display) {
        if (incomeValue > 0) {
            display.innerHTML = `Current Income: <b>₹${incomeValue.toLocaleString("en-IN")}</b>`;
            display.style.color = "#4BC0C0";
        } else {
            display.innerHTML = "Enter your monthly income.";
            display.style.color = "#888";
        }
    }

    calcBalance();
}

function calcExpense() {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);

    const totalElement = document.getElementById("dailyTotal");

    if (totalElement) {
        totalElement.innerHTML = `Total Expenses: ₹${total.toLocaleString("en-IN")}`;
    }

    updateChart();
    calcBalance();
}

function calcEMI() {
    const P = parseFloat(document.getElementById("loan").value);
    const annualRate = parseFloat(document.getElementById("rate").value);
    const months = parseFloat(document.getElementById("tenure").value);

    if (
        isNaN(P) ||
        isNaN(annualRate) ||
        isNaN(months) ||
        P <= 0 ||
        annualRate <= 0 ||
        months <= 0
    ) {
        alert("Please enter valid loan details.");
        return;
    }

    const r = annualRate / 12 / 100;

    emiValue =
        (P * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1);

    const emiResult = document.getElementById("emiResult");

    if (emiResult) {
        emiResult.innerHTML = `Monthly EMI: ₹${emiValue.toFixed(2)}`;
    }

    updateChart();
    calcBalance();
}

function calcBalance() {
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    const totalSpent = totalExpenses + emiValue;

    const balance = incomeValue - totalSpent;

    const balanceResult = document.getElementById("balanceResult");

    if (balanceResult) {
        if (incomeValue <= 0) {
            balanceResult.innerHTML =
                "Enter your monthly income to calculate balance.";
            balanceResult.style.color = "#888";
        } else if (balance >= 0) {
            balanceResult.innerHTML =
                `Remaining Balance: ₹${balance.toLocaleString("en-IN")} ✅`;
            balanceResult.style.color = "#4BC0C0";
        } else {
            balanceResult.innerHTML =
                `Remaining Balance: ₹${balance.toLocaleString("en-IN")} ⚠️`;
            balanceResult.style.color = "#FF6384";
        }
    }

    updateBudgetChart(totalSpent);
}

function updateChart() {
    const canvas = document.getElementById("expenseChart");

    if (!canvas) return;

    let labels = expenses.map(e => e.name);
    let values = expenses.map(e => e.amount);

    if (emiValue > 0) {
        labels.push("EMI");
        values.push(emiValue);
    }

    if (values.length === 0) {
        labels = ["No Data"];
        values = [1];
    }

    if (chart) chart.destroy();

    chart = new Chart(canvas, {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#8BC34A",
                    "#E91E63"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

function updateBudgetChart(totalSpent) {
    const canvas = document.getElementById("budgetChart");

    if (!canvas) return;

    if (budgetChart) budgetChart.destroy();

    budgetChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: ["Income", "Expenses + EMI"],
            datasets: [{
                data: [incomeValue, totalSpent],
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function exportToExcel() {
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    const balance = incomeValue - (totalExpenses + emiValue);

    const rows = [
        ["Fine Calculator Report"],
        ["Generated", new Date().toLocaleString()],
        [],
        ["Expense", "Amount"]
    ];

    expenses.forEach(expense => {
        rows.push([expense.name, expense.amount]);
    });

    rows.push(["EMI", emiValue.toFixed(2)]);
    rows.push(["Income", incomeValue.toFixed(2)]);
    rows.push(["Total Expenses", totalExpenses.toFixed(2)]);
    rows.push(["Remaining Balance", balance.toFixed(2)]);

    const csv = rows
        .map(row => row.map(item => `"${item}"`).join(","))
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "FineCalculator_Report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}