/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} numsAsStrings array of strings
 * @returns {Array|Error} an array or an error object
 */

function convertAndValidateNumsArray(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let convertToNum = Number(numsAsStrings[i]);
    if (Number.isNaN(convertToNum)) {
      return new Error(`The value ${numsAsStrings[i]} is not a valid number`);
    }
    result.push(convertToNum);
  }
  return result;
}

function findMean(nums) {
  if (nums.length === 0) return 0;
  let total = 0;
  nums.forEach((e) => {
    total += e;
  });
  return total / nums.length;
}

function findMedian(nums) {
  // sort and get the middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median;
}

/**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 */

function createFrequencyCounter(arr) {
  const freqCounter = {};

  arr.forEach((num) => {
    // accessing and creating a new key-value pair in an object using square bracket notation
    if (freqCounter[num]) {
      freqCounter[num]++; // equal freqCounter[num] = freqCounter[num] + 1
    } else {
      freqCounter[num] = 1;
    }
  });

  return freqCounter;
}

/**
 * Find the most common element in the array
 * @param {Array} arr any array
 */
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
      debugger;
    }
  }

  return +mostFrequent;
}

module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray,
};
