const currency = require('./currency');
console.log('50 Candaian dollars equals %d US dollars', currency.canadianToUS(50))
console.log('50 US dollars equals %d Candaian dollars', currency.USToCandaian(50))

const Currency2 = require('./currency2');
const conversionRate = 0.91;
const currencyConverter = new Currency2(conversionRate)
console.log('50 Candaian dollars equals %d US dollars', currencyConverter.convertToCurrency(50))
console.log('50 US dollars equals %d Candaian dollars', currencyConverter.convertFromCurrency(50))
