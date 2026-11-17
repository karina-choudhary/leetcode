/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function(s, k) {
    const n = s.length;

    // 1. Precompute proper divisors for every length from 2 to n
    const divisors = Array.from({ length: n + 1 }, () => []);
    for (let len = 2; len <= n; len++) {
        for (let d = 1; d < len; d++) {
            if (len % d === 0) {
                divisors[len].push(d);
            }
        }
    }

    // 2. Precompute minimum changes to make s[i...j] a semi-palindrome
    const cost = Array.from({ length: n }, () => new Int32Array(n).fill(Infinity));

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const len = j - i + 1;
            let minChanges = Infinity;

            for (const d of divisors[len]) {
                let changes = 0;
                const groupLen = len / d;

                // Check each of the d interleaved groups for palindrome mismatches
                for (let rem = 0; rem < d; rem++) {
                    let left = i + rem;
                    let right = i + rem + (groupLen - 1) * d;
                    while (left < right) {
                        if (s[left] !== s[right]) {
                            changes++;
                        }
                        left += d;
                        right -= d;
                    }
                }

                if (changes < minChanges) {
                    minChanges = changes;
                }
            }

            cost[i][j] = minChanges;
        }
    }

    // 3. DP to partition prefix of length 'end' into 'p' semi-palindromes
    const dp = Array.from({ length: k + 1 }, () => new Int32Array(n + 1).fill(1e9));
    dp[0][0] = 0;

    for (let p = 1; p <= k; p++) {
        // Each partition needs at least 2 characters
        for (let end = p * 2; end <= n; end++) {
            for (let prev = (p - 1) * 2; prev <= end - 2; prev++) {
                const candidate = dp[p - 1][prev] + cost[prev][end - 1];
                if (candidate < dp[p][end]) {
                    dp[p][end] = candidate;
                }
            }
        }
    }

    return dp[k][n];
};
