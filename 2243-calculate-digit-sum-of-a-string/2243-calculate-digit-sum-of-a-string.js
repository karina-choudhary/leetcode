/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function(s, k) {
 
    while (s.length > k) {
        let nextStr = "";
        let currentSum = 0;

        for (let i = 0; i < s.length; i++) {
            currentSum += Number(s[i]);

            // Jab k digits poore ho jayein ya string khatam ho jaye
            if ((i + 1) % k === 0 || i === s.length - 1) {
                nextStr += currentSum;
                currentSum = 0;
            }
        }
        s = nextStr;
    }
    return s;
};

    
