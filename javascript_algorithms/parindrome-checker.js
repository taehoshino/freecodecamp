function palindrome(str) {
    str = str.trim().replace(/[^a-zA-Z0-9]/gi, '').toLowerCase();
    var arr = str.split('')
    console.log(arr)
    for (var i=0; i< Math.floor(arr.length/2); i++) {
      if (arr[i] !== arr[arr.length-1-i]) {
        return false
      }
    }
    return true;
  }
  
  console.log(palindrome("E##- ye"))