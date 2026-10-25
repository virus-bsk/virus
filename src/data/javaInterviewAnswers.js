/**
 * javaInterviewAnswers
 * Source of truth for the "Top 30 Java Coding Questions" grid.
 *
 * Each entry's `id` matches the `id` field in javaInterviewQuestions.js so the
 * grid can look up the optimized Java answer for any question by id.
 *
 * NOTE: answer strings are stored in template literals. They intentionally
 * contain NO backslashes, backticks, or ${...} sequences, so the Java code is
 * preserved verbatim (no escape-sequence corruption).
 */
export const javaInterviewAnswers = [

  // 1. Reverse a String
  {
    id: 1,
    answer: `public static String reverseString(String s) {
    return new StringBuilder(s).reverse().toString();
}`,
  },

  // 2. Check Palindrome
  {
    id: 2,
    answer: `public static boolean isPalindrome(String s) {
    String cleaned = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    String rev = new StringBuilder(cleaned).reverse().toString();
    return cleaned.equals(rev);
}`,
  },

  // 3. Check Prime Number
  {
    id: 3,
    answer: `public static boolean isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; (long) i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}`,
  },

  // 4. Print Fibonacci Series
  {
    id: 4,
    answer: `public static List<Integer> fibonacci(int n) {
    List<Integer> series = new ArrayList<>();
    int a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        series.add(a);
        int next = a + b;
        a = b;
        b = next;
    }
    return series;
}`,
  },

  // 5. Find Second-Largest Distinct Element
  {
    id: 5,
    answer: `public static int secondLargest(int[] arr) {
    if (arr == null || arr.length < 2) return Integer.MIN_VALUE;
    int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE;
    for (int num : arr) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2 && num != max1) {
            max2 = num;
        }
    }
    return max2;
}`,
  },

  // 6. Find Duplicate Elements
  {
    id: 6,
    answer: `public static List<Integer> findDuplicates(int[] arr) {
    Set<Integer> seen = new HashSet<>();
    Set<Integer> duplicates = new LinkedHashSet<>();
    for (int num : arr) {
        if (!seen.add(num)) {
            duplicates.add(num);
        }
    }
    return new ArrayList<>(duplicates);
}`,
  },

  // 7. Count Character Frequency
  {
    id: 7,
    answer: `public static Map<Character, Integer> countFrequency(String s) {
    Map<Character, Integer> freq = new HashMap<>();
    for (char c : s.toCharArray()) {
        freq.put(c, freq.getOrDefault(c, 0) + 1);
    }
    return freq;
}`,
  },

  // 8. Check Anagrams
  {
    id: 8,
    answer: `public static boolean areAnagrams(String a, String b) {
    if (a.length() != b.length()) return false;
    int[] count = new int[256];
    for (int i = 0; i < a.length(); i++) {
        count[a.charAt(i)]++;
        count[b.charAt(i)]--;
    }
    for (int c : count) {
        if (c != 0) return false;
    }
    return true;
}`,
  },

  // 9. Find Missing Number
  {
    id: 9,
    answer: `public static int findMissingNumber(int[] arr) {
    int n = arr.length + 1;
    int total = n * (n + 1) / 2;
    int sum = 0;
    for (int num : arr) {
        sum += num;
    }
    return total - sum;
}`,
  },

  // 10. Move All Zeros to the End
  {
    id: 10,
    answer: `public static void moveZerosToEnd(int[] arr) {
    int insertPos = 0;
    for (int num : arr) {
        if (num != 0) {
            arr[insertPos++] = num;
        }
    }
    while (insertPos < arr.length) {
        arr[insertPos++] = 0;
    }
}`,
  },

  // 11. Two Sum
  {
    id: 11,
    answer: `public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution");
}`,
  },

  // 12. First Non-Repeating Character
  {
    id: 12,
    answer: `public static char firstNonRepeatingChar(String s) {
    int[] count = new int[256];
    for (char c : s.toCharArray()) {
        count[c]++;
    }
    for (char c : s.toCharArray()) {
        if (count[c] == 1) return c;
    }
    return Character.MIN_VALUE;
}`,
  },

  // 13. Find the Longest Word
  {
    id: 13,
    answer: `public static String longestWord(String sentence) {
    String longest = "";
    StringBuilder word = new StringBuilder();
    for (char c : sentence.toCharArray()) {
        if (c == ' ') {
            if (word.length() > longest.length()) {
                longest = word.toString();
            }
            word.setLength(0);
        } else {
            word.append(c);
        }
    }
    if (word.length() > longest.length()) {
        longest = word.toString();
    }
    return longest;
}`,
  },

  // 14. Sum Numbers in a String
  {
    id: 14,
    answer: `public static int sumNumbersInString(String s) {
    int sum = 0;
    int num = 0;
    boolean inNumber = false;
    for (char c : s.toCharArray()) {
        if (Character.isDigit(c)) {
            num = num * 10 + (c - '0');
            inNumber = true;
        } else {
            if (inNumber) {
                sum += num;
                num = 0;
                inNumber = false;
            }
        }
    }
    if (inNumber) sum += num;
    return sum;
}`,
  },

  // 15. Rotate an Array by K Positions
  {
    id: 15,
    answer: `public static int[] rotate(int[] nums, int k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
    return nums;
}

private static void reverse(int[] arr, int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}`,
  },

  // 16. Merge Two Sorted Arrays
  {
    id: 16,
    answer: `public static int[] mergeSortedArrays(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) {
            result[k++] = a[i++];
        } else {
            result[k++] = b[j++];
        }
    }
    while (i < a.length) result[k++] = a[i++];
    while (j < b.length) result[k++] = b[j++];
    return result;
}`,
  },

  // 17. Remove Duplicates from a Sorted Array
  {
    id: 17,
    answer: `public static int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int i = 0;
    for (int j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}`,
  },

  // 18. Maximum Subarray Sum
  {
    id: 18,
    answer: `public static int maxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int curMax = nums[0];
    for (int i = 1; i < nums.length; i++) {
        curMax = Math.max(nums[i], curMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, curMax);
    }
    return maxSoFar;
}`,
  },

  // 19. Binary Search
  {
    id: 19,
    answer: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
  },

  // 20. Sort 0s, 1s and 2s
  {
    id: 20,
    answer: `public static void sort012(int[] arr) {
    int low = 0, mid = 0, high = arr.length - 1;
    while (mid <= high) {
        switch (arr[mid]) {
            case 0:
                swap(arr, low, mid);
                low++;
                mid++;
                break;
            case 1:
                mid++;
                break;
            case 2:
                swap(arr, mid, high);
                high--;
                break;
        }
    }
}

private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
  },

  // 21. Longest Substring Without Repeating Characters
  {
    id: 21,
    answer: `public static int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left++));
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
  },

  // 22. Longest Common Prefix
  {
    id: 22,
    answer: `public static String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) return "";
    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length() - 1);
            if (prefix.isEmpty()) return "";
        }
    }
    return prefix;
}`,
  },

  // 23. Check Balanced Parentheses
  {
    id: 23,
    answer: `public static boolean isBalanced(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}`,
  },

  // 24. Reverse a Linked List
  {
    id: 24,
    answer: `public static ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
  },

  // 25. Detect a Cycle in a Linked List
  {
    id: 25,
    answer: `public static boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
  },

  // 26. Count Inversions in an Array (Merge Sort)
  {
    id: 26,
    answer: `public static int countInversions(int[] arr) {
    int n = arr.length;
    int[] temp = new int[n];
    return mergeSortAndCount(arr, temp, 0, n - 1);
}

private static int mergeSortAndCount(int[] arr, int[] temp, int left, int right) {
    int count = 0;
    if (left < right) {
        int mid = (left + right) / 2;
        count += mergeSortAndCount(arr, temp, left, mid);
        count += mergeSortAndCount(arr, temp, mid + 1, right);
        count += mergeAndCount(arr, temp, left, mid, right);
    }
    return count;
}

private static int mergeAndCount(int[] arr, int[] temp, int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    int count = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
            count += (mid - i + 1);
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (i = left; i <= right; i++) arr[i] = temp[i];
    return count;
}`,
  },

  // 27. Find the Kth Largest Element (Min-Heap)
  {
    id: 27,
    answer: `public static int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>(k);
    for (int num : nums) {
        heap.offer(num);
        if (heap.size() > k) {
            heap.poll();
        }
    }
    return heap.peek();
}`,
  },

  // 28. Longest Increasing Subsequence (Binary Search)
  {
    id: 28,
    answer: `public static int lengthOfLIS(int[] nums) {
    int n = nums.length;
    if (n == 0) return 0;
    int[] tails = new int[n];
    int size = 0;
    for (int num : nums) {
        int left = 0, right = size;
        while (left < right) {
            int mid = (left + right) / 2;
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        tails[left] = num;
        if (left == size) size++;
    }
    return size;
}`,
  },

  // 29. Maximum Sum of Non-Adjacent Elements
  {
    id: 29,
    answer: `public static int maxSumNonAdjacent(int[] arr) {
    if (arr.length == 0) return 0;
    int incl = 0, excl = 0;
    for (int num : arr) {
        int newExcl = Math.max(incl, excl);
        incl = excl + num;
        excl = newExcl;
    }
    return Math.max(incl, excl);
}`,
  },

  // 30. Kth Smallest Element of Two Sorted Arrays (Binary Search)
  {
    id: 30,
    answer: `public static int kthSmallest(int[] a, int[] b, int k) {
    if (a.length > b.length) return kthSmallest(b, a, k);
    int low = Math.max(0, k - b.length);
    int high = Math.min(k, a.length);
    while (low <= high) {
        int i = (low + high) / 2;
        int j = k - i;
        int aLeft = (i == 0) ? Integer.MIN_VALUE : a[i - 1];
        int aRight = (i == a.length) ? Integer.MAX_VALUE : a[i];
        int bLeft = (j == 0) ? Integer.MIN_VALUE : b[j - 1];
        int bRight = (j == b.length) ? Integer.MAX_VALUE : b[j];
        if (aLeft <= bRight && bLeft <= aRight) {
            return Math.max(aLeft, bLeft);
        } else if (aLeft > bRight) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    throw new IllegalArgumentException("Input arrays out of range");
}`,
  },
];
