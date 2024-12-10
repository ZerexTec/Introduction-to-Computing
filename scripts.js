function navigateToPrograms() {
    document.querySelector('.homepage').classList.add('hidden');
    document.querySelector('#programs').classList.remove('hidden');
}

function returnToHome() {
    document.querySelector('#programs').classList.add('hidden');
    document.querySelector('.homepage').classList.remove('hidden');
}

function returnToPrograms() {
    hideAllSections();
    document.querySelector('#programs').classList.remove('hidden');
}

function hideAllSections() {
    document.querySelectorAll('.program-section').forEach(section => section.classList.add('hidden'));
}

function showTemperatureConversion() {
    hideAllSections();
    document.querySelector('#temperatureConversion').classList.remove('hidden');
}

function showNthFactorial() {
    hideAllSections();
    document.querySelector('#nthFactorial').classList.remove('hidden');
}

function showIncomeTaxCalculator() {
    hideAllSections();
    document.querySelector('#incomeTax').classList.remove('hidden');
}

function showEmployeePayroll() {
    hideAllSections();
    document.querySelector('#employeePayrollSection').classList.remove('hidden');
}

function performConversion() {
    const value = parseFloat(document.getElementById("value").value);
    const type = document.getElementById("conversionType").value;
    let result;

    switch (type) {
        case "celsiusToFahrenheit":
            result = (value * 9) / 5 + 32;
            break;
        case "fahrenheitToCelsius":
            result = ((value - 32) * 5) / 9;
            break;
        case "metersToFeet":
            result = value * 3.28084;
            break;
        case "feetToMeters":
            result = value / 3.28084;
            break;
        default:
            result = "Invalid Conversion Type";
    }

    document.getElementById("conversionResult").textContent = `Result: ${result}`;
}

function calculateFactorial() {
    const number = parseInt(document.getElementById("numberInput").value);
    if (isNaN(number) || number <= 0) {
        document.getElementById("factorialResult").textContent = "Invalid input.";
        return;
    }

    let factorial = 1, sum = 0;
    for (let i = 1; i <= number; i++) {
        factorial *= i;
        sum += i;
    }

    const average = sum / number;
    document.getElementById("factorialResult").textContent = `Factorial: ${factorial}, Sum: ${sum}, Average: ${average.toFixed(2)}`;
}

function calculateTax() {
    const income = parseFloat(document.getElementById("incomeInput").value);
    let tax = 0;

    if (income <= 250000) tax = 0;
    else if (income <= 400000) tax = (income - 250000) * 0.2;
    else if (income <= 800000) tax = (income - 400000) * 0.25 + 30000;
    else if (income <= 2000000) tax = (income - 800000) * 0.3 + 130000;
    else if (income <= 8000000) tax = (income - 2000000) * 0.32 + 490000;
    else tax = (income - 8000000) * 0.35 + 2410000;

    document.getElementById("taxResult").textContent = `Your tax is: ₱${tax.toFixed(2)}`;
}

let employees = [];

function updateTable() {
    const tbody = document.getElementById("tablebody");
    tbody.innerHTML = '';
    employees.forEach((employee, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.daysWorked}</td>
                <td>${employee.dailyRate}</td>
                <td>${employee.grossPay}</td>
                <td>${employee.deductions}</td>
                <td>${employee.netPay}</td>
            </tr>`;
            tbody.innerHTML += row;
    });
     

    document.getElementById("totalgrosspay").innerText = ConvertDecimal(totalGross, 2);
    document.getElementById("totalnetpay").innerText = ConvertDecimal(totalNet, 2);
}

document.getElementById("addEmployee").addEventListener("click", () => {
    const name = document.getElementById("inputName").value.trim();
    const daysWorked = parseFloat(document.getElementById("daysworked").value);
    const dailyRate = parseFloat(document.getElementById("dailyrate").value);
    const deductions = parseFloat(document.getElementById("deductionamount").value);

    if (!name || isNaN(daysWorked) || isNaN(dailyRate) || isNaN(deductions)) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    const grossPay = computeGrossPay(daysWorked, dailyRate);
    const netPay = computeNetPay(grossPay, deductions);

    employees.push({ name, daysWorked, dailyRate, deductions, grossPay, netPay });
    updateTable();
});

document.getElementById("deleteEmployee").addEventListener("click", () => {
    const index = parseInt(document.getElementById("delitem").value, 10) - 1;

    if (isNaN(index) || index < 0 || index >= employees.length) {
        alert("Invalid employee number.");
        return;
    }

    employees.splice(index, 1);
    updateTable();
});

document.getElementById("clearEmployee").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all employees?")) {
        employees = [];
        updateTable();
    }
});