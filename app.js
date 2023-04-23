const express = require("express");
const app = express();
const fs = require("fs");
const ExpressError = require("./expressError.js");

const {
  convertAndValidateNumsArray,
  findMode,
  findMean,
  findMedian,
} = require("./helpers");

// MEDIAN ROUTE
app.get("/mean", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  const nums = req.query.nums.split(",");
  const checkNums = convertAndValidateNumsArray(nums);
  if (checkNums instanceof Error) {
    throw new ExpressError(checkNums.message, 400);
  }

  let result = {
    operation: "mean",
    result: findMean(checkNums),
  };
  return res.send(result);
});

// MEDIAN ROUTE
app.get("/median", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numsAsStrings = req.query.nums.split(",");
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    result: findMedian(nums),
  };

  return res.send(result);
});

// MODE ROUTE

app.get("/mode", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numsAsStrings = req.query.nums.split(",");
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums),
  };

  return res.send(result);
});

// ALL ROUTE

app.get("/all", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numsAsStrings = req.query.nums.split(",");
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let response = {
    operation: "all",
    mean: findMean(nums),
    mode: findMode(nums),
    median: findMedian(nums),
  };

  // Check Save query
  if (req.query.save === "true") {
    // new Date() creates a new Date object with the current date and time.
    // .toISOString() converts the Date object to an ISO 8601 string format.
    // .replace(/:/g, "-") replaces all colons (represented by the regular expression /:/g) in the ISO string with hyphens ("-").
    // This is done because file names can't contain colons on some operating systems, so we need to replace them with another character.
    // The result is a string representation of the current date and time, in ISO format with colons replaced by hyphens, that can be used as a part of a file name.
    const fileName = `results.json`;
    const fileContent = JSON.stringify(response);

    fs.writeFile(fileName, fileContent, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving results to file");
      }
      console.log(`Results saved to ${fileName}`);
      return res.send(response);
    });
  } else {
    return res.send(response);
  }
});

/** general error handler */
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    // message: err.message,
  });
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
