function checkCashRegister(price, cash, cid) {
    let change = {
      status: 'INSUFFICIENT_FUNDS', 
      change: []
      };

    const eps = 1.e-8
  
    let gap = cash - price
  
    const currencyUnit = {
      'PENNY': 0.01,
      'NICKEL': 0.05,
      'DIME': 0.1,
      'QUARTER': 0.25,
      'ONE': 1,
      'FIVE': 5,
      'TEN': 10,
      'TWENTY': 20,
      'ONE HUNDRED': 100
    }
  

// Derive number of each coin/bill available
  let quantity = {}
  cid.forEach((currency) => {
    quantity[currency[0]] = Math.floor(currency[1]/currencyUnit[currency[0]]+eps)
  })
  
  const currency = Object.keys(currencyUnit)

// Derive changeArr
  let changeArr = []
  for (var i=currency.length-1; i>=0; i--) {

    const num = Math.min(Math.floor(gap/currencyUnit[currency[i]] + eps), quantity[currency[i]])
    quantity[currency[i]] -= num // Update availble quantity
    const amount = num*currencyUnit[currency[i]]
    gap -= amount 
    if (amount > 0) changeArr.push([currency[i], amount])
  }

  // Update the status
  if (Object.keys(quantity).every((currency) => quantity[currency] === 0) && gap === 0) {
    change['status'] = 'CLOSED'
    change['change'] = cid
  } else if (gap > 0) {
    // pass
  } else {
    change['status'] = 'OPEN'
    change['change'] = changeArr
  }
  
  console.log(change)  
  
    return change;
  }
  
  checkCashRegister(12.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 3], ["FIVE", 5], ["TEN", 2], ["TWENTY", 0], ["ONE HUNDRED", 0]])