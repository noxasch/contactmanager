function isEmpty(test){
  if (test) {
    return 'true';
  } else {
    return 'false';
  }
}

console.log(isEmpty('')); // false
console.log(isEmpty(' ')); // true
console.log(isEmpty([])); // true
console.log(isEmpty(false)); // false
console.log(isEmpty(undefined)); // false
console.log(isEmpty({})); // true
console.log(isEmpty(0)); // false