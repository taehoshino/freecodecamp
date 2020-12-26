function rot13(str) {
    var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
    var alphabetObj = {... alphabetArray}
  
    var strArray = str.split('')
    var decodedArray = []
  
    strArray.forEach((char, index)=>{
      var ind = alphabetArray.findIndex((element) => element === char)
      if (ind !== -1) {
        ind = (ind - 13) >= 0 ? (ind - 13) : 26 + (ind - 13)
        decodedArray.push(alphabetObj[ind])
      } else {
        decodedArray.push(strArray[index])      
      }
    })
  
    str = decodedArray.join('')
    console.log(str)
  
    return str;
  }
  
  rot13("SERR PBQR PNZC");