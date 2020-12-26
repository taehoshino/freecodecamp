function convertToRoman(num) {

    var myDict = [{
        0: '',
        1: 'I',
        2: 'II',
        3: 'III', 
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII', 
        8: 'VIII', 
        9: 'IX'
    },{
        0: '',
        1: 'X',
        2: 'XX',
        3: 'XXX', 
        4: 'XL',
        5: 'L',
        6: 'LX',
        7: 'LXX', 
        8: 'LXXX', 
        9: 'XC'
    }, {
        0: '',
        1: 'C',
        2: 'CC',
        3: 'CCC', 
        4: 'CD',
        5: 'D',
        6: 'DC',
        7: 'DCC', 
        8: 'DCCC', 
        9: 'CM'
    }, {
        0: '',
        1: 'M',
        2: 'MM',
        3: 'MMM', 
        4: 'MV_bar',
        5: 'V_bar',
        6: 'V_barM',
        7: 'V_barMM', 
        8: 'V_barMMM', 
        9: 'MX_bar'
    }]
    var numVal = [];
    var numString = String(num).split('')
    numString.forEach((num)=>{
        num = Number(num)
        numVal.push(num)
    })
    console.log(numVal)

    num = ''
    for (var i = 0; i < numVal.length; i++) {
        num += myDict[numVal.length-1-i][numVal[i]]
        console.log(num)        
    }

 return num
}

convertToRoman(36)