body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
    margin: 0;
    padding: 0;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.header-title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

.malaysia-flag {
    width: 40px;
    height: auto;
}

.container {
    max-width: 800px;
    margin: 30px auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form label {
    display: block;
    margin: 10px 0 5px;
    font-weight: bold;
}

form input,
form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

/* Highlight fields for user key-in */
#item-cost,
#shipping-cost,
#selling-price,
#shipping-charged,
#withdrawal-rate {
    background-color: #fffae6;
    border: 1px solid #ffd966;
}

#item-cost:focus,
#shipping-cost:focus,
#selling-price:focus,
#shipping-charged:focus,
#withdrawal-rate:focus {
    background-color: #fff5cc;
    border-color: #ffa500;
    outline: none;
}

.buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.calculate-btn,
.reset-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

.reset-btn {
    background-color: #dc3545;
}

.calculate-btn:hover,
.reset-btn:hover {
    opacity: 0.9;
}

/* Adjusted margin for results label */
.results-label {
    background-color: black;
    color: white;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0; /* Reduced margin to bring it closer to the title */
}

.section-label {
    color: blue;
    font-weight: bold;
}

/* Aligning Results Section Vertically */
#results p {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}

#results p span {
    text-align: right;
    min-width: 150px; /* Adjust the width as necessary */
    font-weight: bold;
    color: #555;
}

#notes ul {
    padding-left: 20px;
    list-style: disc;
    color: #666;
}
