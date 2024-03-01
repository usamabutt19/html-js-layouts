/*
 *  Implement cacheFunction
 *  This function will take "sum" function as argument.
 *  This function should return cached version of the sum function.
 *  For each unique arguments, the sum function should only run once.
 *  If we call the sum function with same arguments twice, it should return the cached result.
 *  Bonus: Sum function can take n number of arguments.
 *  Bonus: Unit test "cacheFunction".
 */

function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

const cache = [
  {
    a: 0,
    b: 0,
    result: 0,
  },
];
const cacheFunction = (fn) => {
  return (a, b) => {
    const index = cache.findIndex((item) => item.a === a && item.b === b);
    if (index !== -1) {
      console.log("memoized");
      return cache[index].result;
    }
    const result = fn(a, b);
    cache.push({
      a,
      b,
      result,
    });
    return result;
  };
};

const cachedSum = cacheFunction(sum);

console.log(cachedSum(1, 2));
console.log(cachedSum(2, 2));
console.log(cachedSum(1, 2));
console.log(cachedSum(2, 2));
