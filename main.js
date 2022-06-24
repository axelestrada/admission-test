const n = 9; // Number of days of transaction data
const d = 5; // Number of trailing days

const expenditures = [2, 3, 4, 2, 3, 6, 8, 4, 5]; // Transaction data

// If n <= 1 or n >= 2 x 10^5 show an error
if (n < 1 || n > 2 * 10 ** 5)
  throw new Error(
    "The number of days of transaction data must be a number between 1 and 200,000"
  );

// If d <= 1 || d >= n show an error
if (d < 1 || d > n)
  throw new Error(
    "The number of trailing days must be a number between 1 and the number of days of transaction data"
  );

const getMedian = (arr) => {
  // If array is empty, don't return anything
  if (!arr.length) return;

  // Sort array from smallest to greatest
  arr.sort((a, b) => a - b);

  // Get index of the middle element in array
  const middle = Math.floor(arr.length / 2);

  return arr.length % 2 === 1
    ? arr[middle] // If array has odd number of items
    : Math.max(arr[middle - 1], arr[middle]); // If array has even number of items
};

// Number of times the client will receive a notification
let receivedNotifications = 0;

for (let i = d; i < n; i++) {
  // Get day expenses
  const dayExpenses = expenditures[i];

  // Check that the transactions are in a range between 0 and 200
  if (dayExpenses < 0 || dayExpenses > 200)
    throw new Error(
      "All transactions must be in a range between 0 and 200"
    );

  // Collect spending data
  const trailingExpenditures = expenditures.slice(i - d, i);

  /* If day expenditures are greater than or equal to 2x the client's median
  spending for a trailing number of days send a notification */

  if (dayExpenses >= 2 * getMedian(trailingExpenditures))
    receivedNotifications++;
}

// Show times the client will receive a notification
console.log(receivedNotifications);
