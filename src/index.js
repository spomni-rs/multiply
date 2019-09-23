module.exports = function multiply(first, second) {

  // 123 * 0 = 0
  if (first === '0' || second === '0'){
    return '0';
  }

  if (second.length === 1){
    return multiplyByOneDigit(first, second)
  }
  
  let secondArr = second.split('');
  let secondLast = secondArr.pop();
  
  // 1234 * 120 = 12340 * 12
  if (secondLast === '0'){
    return multiply(
      first + '0',
      secondArr.join('')
    );

  // 1234 * 123 = 1234 * 3 + 1234 * 120
  } else { 
  
    secondArr.push('0');

    return plus(
      multiplyByOneDigit(first, secondLast),
      multiply(first, secondArr.join(''))
    )
  }

}

function multiplyByOneDigit(first, second){

  first = '0' + first;

  res = first
    .split('')
    .reverse()
    .reduce((accum, digit) => {
      let mult = (+digit * +second + accum.buff).toString();
    
      if (mult.length > 1){
        return {
          res: mult[1] + accum.res,
          buff: +mult[0]
        }
      } else {
        return {
          res: mult + accum.res,
          buff: 0
       }
      }
    
    }, {res: '', buff: 0})
    .res;
    
  return trimStartZeros(res);
}

function plus(first, second){

  if (first.length < second.length){
    let temp = first;
    first = second;
    second = temp;
  }
  
  firstArr = first.split('').reverse();
  secondArr = second.split('').reverse();
  
  firstArr.push('0');
  let delta = firstArr.length - secondArr.length;

  for (let i=0; i<delta; i++){
    secondArr.push('0');
  }

  let res = '';
  let buff = 0;
  
  for (let i=0; i<firstArr.length; i++){
  
    let sum = (Number(firstArr[i]) + Number(secondArr[i]) + buff).toString();

    if (sum.length > 1){
      res = sum[1] + res;
      buff = Number(sum[0]);
    } else {
      res = sum + res;
      buff = 0;
    }
  
  }
  
  return trimStartZeros(res);

}

function trimStartZeros(str){
  let i = 0;
  
  while (str[i] === '0'){
    i++;
  }
  
  return str.substring(i);
}