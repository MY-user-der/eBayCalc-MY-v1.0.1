const starterRates = [
    { label: "Most Categories (13.25%)", value: "13.25" },
    { label: "Books & Magazines, DVDs Movies (14.95%)", value: "14.95" },
    { label: "Coins & Paper Money (13.25%)", value: "13.25" }, 
    { label: "Musical Instruments (6.35%)", value: "6.35" },
    { label: "Jewelry & Watches (15%)", value: "15" },
    { label: "Athletic Shoes (13.25%)", value: "13.25" },
    { label: "Women's const starterRates = [
    { label: "Most Categories (13.25%)", value: "13.25" },
    { label: "Books & Magazines, DVDs Movies (14.95%)", value: "14.95" },
    { label: "Coins & Paper Money (13.25%)", value: "13.25" }, 
    { label: "Musical Instruments (6.35%)", value: "6.35" },
    { label: "Jewelry & Watches (15%)", value: "15" },
    { label: "Athletic Shoes (13.25%)", value: "13.25" },
    { label: "Women's Clothing, Shoes, Bags & HandBags (15%)", value: "15" },
];

const basicRates = [
    { label: "Most Categories (12.35%)", value: "12.35" },
    { label: "Books & Magazines, DVDs Movies, Music (14.95%)", value: "14.95" },
    { label: "Clothing, Shoes (12.35%)", value: "12.35" },
    { label: "Women's Bags & HandBags (13%)", value: "13" },
    { label: "Athletic Shoes (12.35%)", value: "12.35" },
    { label: "Coins & Paper Money (9%)", value: "9" },
    { label: "Consumer Electronics (9%)", value: "9" },
    { label: "Jewelry & Watches (13%)", value: "13" },
    { label: "eBay Motors (11.35%)", value: "11.35" },
    { label: "eBay Motors Parts - Tires, Wheels (9.35%)", value: "9.35" },
    { label: "eBay Motors Parts - Protective Gear (12.35)", value: "12.35" },
    { label: "Musical Instruments (6.35%)", value: "6.35" },
    { label: "Stamps (9.35%)", value: "9.35" },
];

// Dynamically populate the dropdown based on store subscription
document.querySelectorAll('input[name="store"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const categoryRate = document.getElementById("category-rate");
        categoryRate.innerHTML = ""; // Clear current options
        const rates = e.target.value === "starter" ? starterRates : basicRates;

        rates.forEach((rate) => {
            const option = document.createElement("option");
            option.value = rate.value;
            option.textContent = rate.label;
            categoryRate.appendChild(option);
        });
    });
});

// Initialize dropdown with Starter Store rates on page load
document.querySelector('input[name="store"][value="starter"]').dispatchEvent(new Event("change"));

// Calculation Logic
document.getElementById("calculate-btn").addEventListener("click", () => {
    try {
        const itemCost = parseFloat(document.getElementById("item-cost").value) || 0;
        const shippingCost = parseFloat(document.getElementById("shipping-cost").value) || 0;
        const sellingPrice = parseFloat(document.getElementById("selling-price").value) || 0;
        const shippingCharge = parseFloat(document.getElementById("shipping-charged").value) || 0;
        const withdrawalRate = parseFloat(document.getElementById("withdrawal-rate").value) || 4.15;

        const salesTaxRate = parseFloat(document.getElementById("sales-tax").value) / 100 || 0.06;
        const categoryRate = parseFloat(document.getElementById("category-rate").value) / 100 || 0.1235;
        const internationalRate = parseFloat(document.getElementById("international-rate").value) / 100 || 0.013;
        const volumeDiscountRate = parseFloat(document.getElementById("volume-discount").value) / 100 || 0.002;
        const perOrderFee = parseFloat(document.getElementById("per-order-fee").value) || 0.4;
        const sstRate = parseFloat(document.getElementById("sst").value) / 100 || 0.08;
        const adFeeRate = parseFloat(document.getElementById("ad-fee").value) / 100 || 0.05;

        const basePrice = sellingPrice + shippingCharge;
        const salesTax = basePrice * salesTaxRate;
        const orderTotal = basePrice + salesTax;

        const finalValueFees = orderTotal * categoryRate;
        const internationalFee = orderTotal * internationalRate;
        const volumeDiscount = orderTotal * volumeDiscountRate;
        const totalFee = finalValueFees + internationalFee - volumeDiscount + perOrderFee;
        const sst = totalFee * sstRate;
        const totalFeesWithSST = totalFee + sst;

        const adFee = orderTotal * adFeeRate;
        const adFeeWithSST = adFee + (adFee * sstRate);

        const earningsUSD = orderTotal - salesTax - totalFeesWithSST - adFeeWithSST;

        let earningsMYR;
        if (earningsUSD < 100) {
            earningsMYR = (earningsUSD - 1) * withdrawalRate; // Deduct $1 for earnings < $100
        } else {
            earningsMYR = earningsUSD * withdrawalRate;
        }

        const totalCostMYR = itemCost + shippingCost;
        const profitsMYR = earningsMYR - totalCostMYR;

        // Update Fees Section
        document.getElementById("final-value-fees-usd").textContent = `-${finalValueFees.toFixed(2)}`;
        document.getElementById("international-fee-usd").textContent = `-${internationalFee.toFixed(2)}`;
        document.getElementById("volume-discount-usd").textContent = volumeDiscount.toFixed(2);
        document.getElementById("per-order-fee-usd").textContent = `-${perOrderFee.toFixed(2)}`;
        document.getElementById("total-fee-usd").textContent = `-${totalFee.toFixed(2)}`;
        document.getElementById("sst-usd").textContent = `-${sst.toFixed(2)}`;
        document.getElementById("total-fees-includes-sst-usd").textContent = `-${totalFeesWithSST.toFixed(2)}`;

        // Update Earnings and Profits Section
        document.getElementById("total-price-usd").textContent = basePrice.toFixed(2);
        document.getElementById("order-total-usd").textContent = orderTotal.toFixed(2);
        document.getElementById("sales-tax-usd").textContent = `-${salesTax.toFixed(2)}`;
        document.getElementById("total-fees-includes-sst-earnings-usd").textContent = `-${totalFeesWithSST.toFixed(2)}`;
        document.getElementById("ad-fee-standard-usd").textContent = `-${adFeeWithSST.toFixed(2)}`;
        document.getElementById("earnings-usd").textContent = earningsUSD.toFixed(2);
        document.getElementById("earnings-myr").textContent = earningsMYR.toFixed(2);
        document.getElementById("total-cost-myr").textContent = totalCostMYR.toFixed(2);
        document.getElementById("profits-myr").textContent = profitsMYR.toFixed(2);
    } catch (error) {
        console.error("Calculation error:", error);
    }
});

// Reset the form and clear results
document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("calculator-form").reset();
    document.querySelectorAll("#results p span").forEach((span) => {
        span.textContent = "-";
    });
});Clothing, Shoes, Bags & HandBags (15%)", value: "15" },
];

const basicRates = [
    { label: "Most Categories (12.35%)", value: "12.35" },
    { label: "Books & Magazines, DVDs Movies, Music (14.95%)", value: "14.95" },
    { label: "Clothing, Shoes (12.35%)", value: "12.35" },
    { label: "Women's Bags & HandBags (13%)", value: "13" },
    { label: "Athletic Shoes (12.35%)", value: "12.35" },
    { label: "Coins & Paper Money (9%)", value: "9" },
    { label: "Consumer Electronics (9%)", value: "9" },
    { label: "Jewelry & Watches (13%)", value: "13" },
    { label: "eBay Motors (11.35%)", value: "11.35" },
    { label: "eBay Motors Parts - Tires, Wheels (9.35%)", value: "9.35" },
    { label: "eBay Motors Parts - Protective Gear (12.35)", value: "12.35" },
    { label: "Musical Instruments (6.35%)", value: "6.35" },
    { label: "Stamps (9.35%)", value: "9.35" },
];

// Dynamically populate the dropdown based on store subscription
document.querySelectorAll('input[name="store"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const categoryRate = document.getElementById("category-rate");
        categoryRate.innerHTML = ""; // Clear current options
        const rates = e.target.value === "starter" ? starterRates : basicRates;

        rates.forEach((rate) => {
            const option = document.createElement("option");
            option.value = rate.value;
            option.textContent = rate.label;
            categoryRate.appendChild(option);
        });
    });
});

// Initialize dropdown with Starter Store rates on page load
document.querySelector('input[name="store"][value="starter"]').dispatchEvent(new Event("change"));

// Calculation Logic
document.getElementById("calculate-btn").addEventListener("click", () => {
    try {
        const itemCost = parseFloat(document.getElementById("item-cost").value) || 0;
        const shippingCost = parseFloat(document.getElementById("shipping-cost").value) || 0;
        const sellingPrice = parseFloat(document.getElementById("selling-price").value) || 0;
        const shippingCharge = parseFloat(document.getElementById("shipping-charged").value) || 0;
        const withdrawalRate = parseFloat(document.getElementById("withdrawal-rate").value) || 4.15;

        const salesTaxRate = parseFloat(document.getElementById("sales-tax").value) / 100 || 0.06;
        const categoryRate = parseFloat(document.getElementById("category-rate").value) / 100 || 0.1235;
        const internationalRate = parseFloat(document.getElementById("international-rate").value) / 100 || 0.013;
        const volumeDiscountRate = parseFloat(document.getElementById("volume-discount").value) / 100 || 0.002;
        const perOrderFee = parseFloat(document.getElementById("per-order-fee").value) || 0.4;
        const sstRate = parseFloat(document.getElementById("sst").value) / 100 || 0.08;
        const adFeeRate = parseFloat(document.getElementById("ad-fee").value) / 100 || 0.05;

        const basePrice = sellingPrice + shippingCharge;
        const salesTax = basePrice * salesTaxRate;
        const orderTotal = basePrice + salesTax;

        const finalValueFees = orderTotal * categoryRate;
        const internationalFee = orderTotal * internationalRate;
        const volumeDiscount = orderTotal * volumeDiscountRate;
        const totalFee = finalValueFees + internationalFee - volumeDiscount + perOrderFee;
        const sst = totalFee * sstRate;
        const totalFeesWithSST = totalFee + sst;

        const adFee = orderTotal * adFeeRate;
        const adFeeWithSST = adFee + (adFee * sstRate);

        const earningsUSD = orderTotal - salesTax - totalFeesWithSST - adFeeWithSST;

        let earningsMYR;
        if (earningsUSD < 100) {
            earningsMYR = (earningsUSD - 1) * withdrawalRate; // Deduct $1 for earnings < $100
        } else {
            earningsMYR = earningsUSD * withdrawalRate;
        }

        const totalCostMYR = itemCost + shippingCost;
        const profitsMYR = earningsMYR - totalCostMYR;

        // Update Fees Section
        document.getElementById("final-value-fees-usd").textContent = `-${finalValueFees.toFixed(2)}`;
        document.getElementById("international-fee-usd").textContent = `-${internationalFee.toFixed(2)}`;
        document.getElementById("volume-discount-usd").textContent = volumeDiscount.toFixed(2);
        document.getElementById("per-order-fee-usd").textContent = `-${perOrderFee.toFixed(2)}`;
        document.getElementById("total-fee-usd").textContent = `-${totalFee.toFixed(2)}`;
        document.getElementById("sst-usd").textContent = `-${sst.toFixed(2)}`;
        document.getElementById("total-fees-includes-sst-usd").textContent = `-${totalFeesWithSST.toFixed(2)}`;

        // Update Earnings and Profits Section
        document.getElementById("total-price-usd").textContent = basePrice.toFixed(2);
        document.getElementById("order-total-usd").textContent = orderTotal.toFixed(2);
        document.getElementById("sales-tax-usd").textContent = `-${salesTax.toFixed(2)}`;
        document.getElementById("total-fees-includes-sst-earnings-usd").textContent = `-${totalFeesWithSST.toFixed(2)}`;
        document.getElementById("ad-fee-standard-usd").textContent = `-${adFeeWithSST.toFixed(2)}`;
        document.getElementById("earnings-usd").textContent = earningsUSD.toFixed(2);
        document.getElementById("earnings-myr").textContent = earningsMYR.toFixed(2);
        document.getElementById("total-cost-myr").textContent = totalCostMYR.toFixed(2);
        document.getElementById("profits-myr").textContent = profitsMYR.toFixed(2);
    } catch (error) {
        console.error("Calculation error:", error);
    }
});

// Reset the form and clear results
document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("calculator-form").reset();
    document.querySelectorAll("#results p span").forEach((span) => {
        span.textContent = "-";
    });
});
