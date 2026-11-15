/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
    const MOD = 1e9 + 7;
    let oddCount = 0;
    let evenCount = 1; // Empty prefix sum 0 is even
    let prefixSum = 0;
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
        prefixSum += arr[i];

        if (prefixSum % 2 === 1) {
            result = (result + evenCount) % MOD;
            oddCount++;
        } else {
            result = (result + oddCount) % MOD;
            evenCount++;
        }
    }

    return result;
};
