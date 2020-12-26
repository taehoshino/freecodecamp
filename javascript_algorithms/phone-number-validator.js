function telephoneCheck(str) {
    str = str[0] + str.substring(1).replaceAll(/[\-\s]/g, '')
    console.log(str)
    var isNotNum = str.match(/^-|[^0-9\(\)]/g)  !== null
    var containCountryCode = str[0] === '1'
    var containBracket = containCountryCode ? (str[1] === '(' && str[5] === ')') : (str[0] === '(' && str[4] === ')')
  
    if (isNotNum) {
      return false
    }
  
    if (containCountryCode && containBracket){
      return str.length === 13
    } else if (containCountryCode){
      return str.length === 11
    } else if (containBracket){
      return str.length === 12
    } else {
      return str.length === 10
    }
  
    
    return true;
  }
  
  telephoneCheck("555-555-5555")