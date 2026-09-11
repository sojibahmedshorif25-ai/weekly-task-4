/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;
    
    const mapS = new Map();
    const mapT = new Map();
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        if (mapS.has(charS)) {
            if (mapS.get(charS) !== charT) return false;
        } else {
            mapS.set(charS, charT);
        }
        
        if (mapT.has(charT)) {
            if (mapT.get(charT) !== charS) return false;
        } else {
            mapT.set(charT, charS);
        }
    }
    
    return true;
};

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    
    const mapPattern = new Map();
    const mapWord = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        
        if (mapPattern.has(char)) {
            if (mapPattern.get(char) !== word) return false;
        } else {
            mapPattern.set(char, word);
        }
        
        if (mapWord.has(word)) {
            if (mapWord.get(word) !== char) return false;
        } else {
            mapWord.set(word, char);
        }
    }
    
    return true;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        result ^= s.charCodeAt(i);
    }
    
    for (let i = 0; i < t.length; i++) {
        result ^= t.charCodeAt(i);
    }
    
    return String.fromCharCode(result);
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let fast = dummy;
    let slow = dummy;
    
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    
    slow.next = slow.next.next;
    
    return dummy.next;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const findFirst = (nums, target) => {
        let left = 0;
        let right = nums.length - 1;
        let first = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                first = mid;
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return first;
    };
    
    const findLast = (nums, target) => {
        let left = 0;
        let right = nums.length - 1;
        let last = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                last = mid;
                left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return last;
    };
    
    const first = findFirst(nums, target);
    if (first === -1) return [-1, -1];
    
    const last = findLast(nums, target);
    
    return [first, last];
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const count1 = new Array(26).fill(0);
    const count2 = new Array(26).fill(0);
    
    for (let i = 0; i < s1.length; i++) {
        count1[s1.charCodeAt(i) - 97]++;
        count2[s2.charCodeAt(i) - 97]++;
    }
    
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (count1[i] === count2[i]) matches++;
    }
    
    for (let i = s1.length; i < s2.length; i++) {
        if (matches === 26) return true;
        
        const leftChar = s2.charCodeAt(i - s1.length) - 97;
        const rightChar = s2.charCodeAt(i) - 97;
        
        if (count2[leftChar] === count1[leftChar]) matches--;
        count2[leftChar]--;
        if (count2[leftChar] === count1[leftChar]) matches++;
        
        if (count2[rightChar] === count1[rightChar]) matches--;
        count2[rightChar]++;
        if (count2[rightChar] === count1[rightChar]) matches++;
    }
    
    return matches === 26;
};

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const result = [];
    if (s.length < p.length) return result;
    
    const countP = new Array(26).fill(0);
    const countWindow = new Array(26).fill(0);
    
    for (let i = 0; i < p.length; i++) {
        countP[p.charCodeAt(i) - 97]++;
        countWindow[s.charCodeAt(i) - 97]++;
    }
    
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (countP[i] === countWindow[i]) matches++;
    }
    
    if (matches === 26) result.push(0);
    
    for (let i = p.length; i < s.length; i++) {
        const leftChar = s.charCodeAt(i - p.length) - 97;
        const rightChar = s.charCodeAt(i) - 97;
        
        if (countWindow[leftChar] === countP[leftChar]) matches--;
        countWindow[leftChar]--;
        if (countWindow[leftChar] === countP[leftChar]) matches++;
        
        if (countWindow[rightChar] === countP[rightChar]) matches--;
        countWindow[rightChar]++;
        if (countWindow[rightChar] === countP[rightChar]) matches++;
        
        if (matches === 26) {
            result.push(i - p.length + 1);
        }
    }
    
    return result;
};