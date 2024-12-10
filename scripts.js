
function returnToHomePage() {
    window.location.href = 'index.html'; 
}

function performConversion() {
    const valueInput = document.getElementById("value");
    const conversionResult = document.getElementById("conversionResult");
    const value = parseFloat(valueInput.value);
    const type = document.getElementById("conversionType").value;

    conversionResult.textContent = "";

    if (isNaN(value)) {
        conversionResult.textContent = "Please enter a valid number.";
        conversionResult.style.color = "red";
        return;
    }

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

    conversionResult.textContent = `Result: ${result}`;
    conversionResult.style.color = "white";
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
    const incomeInput = document.getElementById("incomeInput").value.trim();
    
    if (incomeInput === "" || isNaN(incomeInput)) {
        document.getElementById("taxResult").textContent = "Please enter a valid income.";
        return;
    }

    const income = parseFloat(incomeInput);
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

function ConvertDecimal(value, decimals) {
    return isNaN(value) ? '' : value.toFixed(decimals);
}

function computeGrossPay(daysWorked, dailyRate) {
    return ConvertDecimal(daysWorked * dailyRate, 2);
}

function computeNetPay(grossPay, deductions) {
    return ConvertDecimal(grossPay - deductions, 2);
}

function updateTable() {
    const tbody = document.getElementById("tablebody");
    tbody.innerHTML = '';
    let totalGross = 0;
    let totalNet = 0;

    employees.forEach((employee, index) => {
        totalGross += parseFloat(employee.grossPay);
        totalNet += parseFloat(employee.netPay);

        const row = `
            <tr style = "color: black;">
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

window.onload = updateTable;


