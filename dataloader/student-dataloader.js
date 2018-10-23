/*
 *  This module is intended to show the user a generic way to use dataloader.
 */

const DataLoader = require('dataloader');
const faker = require('faker');


let timesCalled = 0;
/**
 *  This function will receive an array of "keys". They can be ANYTHING, as long
 * as the batch function is capable of understanding these keys to query the
 * objects.
 *
 *  What ends up happending in this function is that the keys come in e.g [1, 4, 10].
 * The batch function is responsible for fetching these values and make them match
 * the size and results of the incoming keys.
 *
 * EXAMPLE:
 *  ===> (dataloader-request: 1)
 *  ===> (dataloader-request: 4)
 *  ===> (dataloader-request: 10)
 *  ===> (keys-input: [1, 4, 10])
 *  ===> (load-values-returns: [{id: 10, name: 'Josh'}, {id: 1, name: 'Dod'}])
 *  ===> (must-return: [{id: 1, name: 'Dod'}, null, {id: 10, name: 'Josh'}])
 *
 * NOTE: The JSDoc comments are generic and don't actually signify the parameters the
 * batcheGetStudentsById is actually receiving.
 *
 * @param {number[] | string[] | Object[]} keys An array of keys that signals what you need from the batch function
 */
const batchGetStudentsById = async (keys) => {
  console.log(`Times called: ${++timesCalled}`);
  // Emulate a slow network connection
  await (new Promise((resolve) => setTimeout(() => resolve(), 5000)));

  return keys.map((key) => ({
    id: key,
    firstName: faker.name.firstName(),
  }));
};

module.exports.studentDataLoader = new DataLoader((keys) =>
  batchGetStudentsById(keys)
);
