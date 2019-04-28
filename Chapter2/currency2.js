class Currency {
    constructor(conversionRate){
        this.conversionRate = conversionRate;
    }

    roundTwoDecimals(amount){
        return Math.round(amount * 100)/100;
    }

    convertToCurrency(amount){
        return this.roundTwoDecimals(amount * this.conversionRate);
    }

    convertFromCurrency(amount){
        return this.roundTwoDecimals(amount / this.conversionRate);
    }
}

module.exports = Currency;