/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var minimumSumSubarray = function(nums, l, r) {
    const n = nums.length;
    let minSum = Infinity;

    // Build prefix sums for O(1) subarray sum queries
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // Check every valid subarray length from l to r
    for (let len = l; len <= r; len++) {
        for (let i = 0; i + len <= n; i++) {
            const currentSum = prefix[i + len] - prefix[i];
            if (currentSum > 0 && currentSum < minSum) {
                minSum = currentSum;
            }
        }
    }

    return minSum === Infinity ? -1 : minSum;
};
