const assertEqual = function(actual, expected) {
  if (actual === expected) {
    console.log(`✅✅✅ Assertion Passed: ${actual} === ${expected}`);
  } else {
    console.log(`🛑🛑🛑 Assertion Failed: ${actual} !== ${expected}`);
  }
}
const eqArrays = function(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const eqObjects = function (object1, object2) {
  const objectKey1 = Object.keys(object1)
  const objectKey2 = Object.keys(object2)
   if (Object.keys(object1).length !== Object.keys(object2).length) {
      return false;
   }
   for (let x of objectKey1) {
     if (Array.isArray(objectKey1[x]) && Array.isArray(objectKey2[values])) {
       if (!eqArrays(objectKey1, objectKey2)) {
         return false;
       } else {
         if (objectKey1 !== objectKey2) {
           return false;
          }
        }
      }
    }
    return true;
  }
