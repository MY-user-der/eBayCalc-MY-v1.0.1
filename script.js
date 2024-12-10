document.getElementById('calculate-btn').addEventListener('click', () => {
    try {
        const itemCost = parseFloat(document.getElementById('item-cost').value) || 0;
        const shippingCost = parseFloat(document.getElementById('shipping-cost').value) || 0;
        const sellingPrice = parseFloat(document.getElementById('selling-price').value) || 0;
        const shippingCharge = parseFloat(document.getElementById('shipping-charged').value) || 0;
        const withdrawalRate = parseFloat(document.getElementById('withdrawal-rate').value) || 4.15;

        const salesTaxRate = parseFloat(document.getElementById('sales-tax').value) / 100 || 0.06;
        const categoryRate = parseFloat(document.getElementById('category-rate').value) / 100 || 0.1235;
        const internationalRate = parseFloat(document.getElementById('international-rate').value) / 100 || 0.013;
        const volumeDiscountRate = parseFloat(document.getElementById('volume-discount').value) / 100 || 0.002;
        const perOrderFee = parseFloat(document.getElementById('per-order-fee').value) || 0.4;
        const sstRate = parseFloat(document.getElementById('sst').value) / 100 || 0.08;
        const adFeeRate = parseFloat(document.getElementById('ad-fee').value) / 100 || 0.05;

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

        // Updated logic for Earnings (MYR)
        let earningsMYR;
        if (earningsUSD < 100) {
            earningsMYR = (earningsUSD - 1) * withdrawalRate; // Deduct $1 for earnings < $100
        } else {
            earningsMYR = earningsUSD * withdrawalRate;
        }

        const totalCostMYR = itemCost + shippingCost;
        const profitsMYR = earningsMYR - totalCostMYR;

        // Update Fees Section
        document.getElementById('final-value-fees-usd').textContent = `-${finalValueFees.toFixed(2)}`;
        document.getElementById('international-fee-usd').textContent = `-${internationalFee.toFixed(2)}`;
        document.getElementById('volume-discount-usd').textContent = volumeDiscount.toFixed(2);
        document.getElementById('per-order-fee-usd').textContent = `-${perOrderFee.toFixed(2)}`;
        document.getElementById('total-fee-usd').textContent = `-${totalFee.toFixed(2)}`;
        document.getElementById('sst-usd').textContent = `-${sst.toFixed(2)}`;
        document.getElementById('total-fees-includes-sst-usd').textContent = `-${totalFeesWithSST.toFixed(2)}`;

        // Update Earnings and Profits Section
        document.getElementById('total-price-usd').textContent = basePrice.toFixed(2);
        document.getElementById('order-total-usd').textContent = orderTotal.toFixed(2);
        document.getElementById('sales-tax-usd').textContent = `-${salesTax.toFixed(2)}`;
        document.getElementById('total-fees-includes-sst-earnings-usd').textContent = `-${totalFeesWithSST.toFixed(2)}`;
        document.getElementById('ad-fee-standard-usd').textContent = `-${adFeeWithSST.toFixed(2)}`;
        document.getElementById('earnings-usd').textContent = earningsUSD.toFixed(2);
        document.getElementById('earnings-myr').textContent = earningsMYR.toFixed(2);
        document.getElementById('total-cost-myr').textContent = totalCostMYR.toFixed(2);
        document.getElementById('profits-myr').textContent = profitsMYR.toFixed(2);
    } catch (error) {
        console.error('Calculation error:', error);
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('calculator-form').reset();
    document.querySelectorAll('#results p span').forEach(span => {
        span.textContent = '-';
    });
});