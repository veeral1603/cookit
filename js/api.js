"use script";

const APP_ID = "eb09ab20";
const APP_KEY = "c5da883d253b0f8eae7d5a7dbe179139";
const TYPE = "public";
const BASE_URL = "https://api.edamam.com/api/recipes/v2?";

/**
 *
 * @param {Array} queries An array of queries
 * @param {Function} callback Function
 */

export const fetchData = async function (queries, callback) {
  let queryString = queries.join("");
  let URL = `${BASE_URL}type=${TYPE}${queryString}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    callback(data);
  } catch (err) {
    console.error(err);
  }
};
