/**
 * Interview-ready solutions for the Java coding question grid.
 *
 * Each explanation is phrased as an approach a candidate can describe aloud.
 * Code fields contain Java method snippets, except where a supporting type is
 * explicitly included in the explanation.
 */
export const javaInterviewAnswers = [
  {
    id: 1,
    approach:
      "I would avoid relying only on StringBuilder.reverse() because the interviewer usually wants to see the algorithm. Since strings are immutable, I copy the characters into an array and swap from both ends until the pointers meet. This uses constant extra space beyond the returned character array and takes linear time.",
    complexity: "Time: O(n). Extra space: O(n) for the result.",
    code: `public static String reverseString(String input) {
    if (input == null) {
        throw new IllegalArgumentException("Input must not be null");
    }

    char[] characters = input.toCharArray();
    int left = 0;
    int right = characters.length - 1;

    while (left < right) {
        char temporary = characters[left];
        characters[left] = characters[right];
        characters[right] = temporary;
        left++;
        right--;
    }

    return new String(characters);
}`,
    alternative: {
      label: "Concise library-based version",
      complexity: "Time: O(n). Extra space: O(n).",
      code: `public static String reverseStringWithBuilder(String input) {
    if (input == null) {
        throw new IllegalArgumentException("Input must not be null");
    }

    return new StringBuilder(input).reverse().toString();
}`,
    },
  },
  {
    id: 2,
    approach:
      "I will compare characters from the two ends and stop as soon as a mismatch is found. Before comparing, I normalize the input by removing non-alphanumeric characters and ignoring case, so phrases such as \"A man, a plan, a canal: Panama\" work as well. The two-pointer scan avoids constructing a second reversed string.",
    complexity: "Time: O(n). Extra space: O(n) for the normalized string.",
    code: `public static boolean isPalindrome(String input) {
    if (input == null) {
        return false;
    }

    String normalized = input.replaceAll("[^a-zA-Z0-9]", "")
            .toLowerCase(java.util.Locale.ROOT);
    int left = 0;
    int right = normalized.length() - 1;

    while (left < right) {
        if (normalized.charAt(left) != normalized.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}`,
  },
  {
    id: 3,
    approach:
      "A prime number has no positive divisors other than one and itself. I handle values below two and even numbers first, then test only odd divisors up to the square root; if a larger factor existed, its matching factor would already have been checked. I use divisor <= n / divisor rather than divisor * divisor to avoid integer overflow.",
    complexity: "Time: O(sqrt(n)). Extra space: O(1).",
    code: `public static boolean isPrime(int number) {
    if (number < 2) {
        return false;
    }
    if (number == 2) {
        return true;
    }
    if (number % 2 == 0) {
        return false;
    }

    for (int divisor = 3; divisor <= number / divisor; divisor += 2) {
        if (number % divisor == 0) {
            return false;
        }
    }

    return true;
}`,
  },
  {
    id: 4,
    approach:
      "I generate the series iteratively using the two previous values, which avoids the repeated work of the recursive definition. At each step I append the current value and advance the pair. This returns the first n terms, starting with zero; long values are used to extend the safe range compared with int.",
    complexity: "Time: O(n). Extra space: O(n) for the returned list.",
    code: `public static List<Long> fibonacci(int n) {
    if (n < 0) {
        throw new IllegalArgumentException("n must not be negative");
    }

    List<Long> series = new ArrayList<>(n);
    long previous = 0;
    long current = 1;

    for (int i = 0; i < n; i++) {
        series.add(previous);
        if (i < n - 1) {
            long next = Math.addExact(previous, current);
            previous = current;
            current = next;
        }
    }

    return series;
}`,
  },
  {
    id: 5,
    approach:
      "I track the largest and second-largest distinct values in one pass. When a new maximum appears, the old maximum becomes the runner-up; otherwise I update the runner-up only for a distinct value between the two. I return OptionalInt so the method clearly represents arrays with fewer than two distinct values.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static OptionalInt secondLargestDistinct(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    boolean hasLargest = false;
    boolean hasSecondLargest = false;
    int largest = 0;
    int secondLargest = 0;

    for (int number : numbers) {
        if (!hasLargest || number > largest) {
            if (hasLargest) {
                secondLargest = largest;
                hasSecondLargest = true;
            }
            largest = number;
            hasLargest = true;
        } else if (number < largest
                && (!hasSecondLargest || number > secondLargest)) {
            secondLargest = number;
            hasSecondLargest = true;
        }
    }

    return hasSecondLargest
            ? OptionalInt.of(secondLargest)
            : OptionalInt.empty();
}`,
  },
  {
    id: 6,
    approach:
      "I use one set to remember values already seen and another insertion-ordered set to collect duplicates. A value is added to the result only the first time a repeat is detected, so the output contains each duplicated value once and keeps the order in which duplicates are discovered.",
    complexity: "Time: O(n) average. Extra space: O(n).",
    code: `public static List<Integer> findDuplicates(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    Set<Integer> seen = new HashSet<>();
    Set<Integer> duplicates = new LinkedHashSet<>();

    for (int number : numbers) {
        if (!seen.add(number)) {
            duplicates.add(number);
        }
    }

    return new ArrayList<>(duplicates);
}`,
  },
  {
    id: 7,
    approach:
      "I scan the string once and increment a count for every character in a map. getOrDefault keeps the update straightforward, and the map naturally supports any UTF-16 char value rather than assuming an ASCII-sized frequency array. This counts Java char values; for full Unicode code points, I would iterate with codePoints() instead.",
    complexity: "Time: O(n) average. Extra space: O(k), where k is the number of distinct chars.",
    code: `public static Map<Character, Integer> countCharacterFrequency(String input) {
    if (input == null) {
        throw new IllegalArgumentException("Input must not be null");
    }

    Map<Character, Integer> frequencies = new HashMap<>();
    for (char character : input.toCharArray()) {
        frequencies.put(
                character,
                frequencies.getOrDefault(character, 0) + 1);
    }

    return frequencies;
}`,
  },
  {
    id: 8,
    approach:
      "For this version, anagrams are compared case-insensitively and spaces or punctuation are ignored. I normalize both strings, reject different normalized lengths, and use a 26-element counter: each character from the first string increments a bucket and each from the second decrements it. A final all-zero counter means the character multisets match. This assumes English letters after normalization.",
    complexity: "Time: O(n + m). Extra space: O(1) for the fixed alphabet.",
    code: `public static boolean areAnagrams(String first, String second) {
    if (first == null || second == null) {
        return false;
    }

    String left = first.replaceAll("[^a-zA-Z]", "")
            .toLowerCase(java.util.Locale.ROOT);
    String right = second.replaceAll("[^a-zA-Z]", "")
            .toLowerCase(java.util.Locale.ROOT);

    if (left.length() != right.length()) {
        return false;
    }

    int[] counts = new int[26];
    for (int i = 0; i < left.length(); i++) {
        counts[left.charAt(i) - 'a']++;
        counts[right.charAt(i) - 'a']--;
    }

    for (int count : counts) {
        if (count != 0) {
            return false;
        }
    }

    return true;
}`,
  },
  {
    id: 9,
    approach:
      "The array contains distinct values from 1 through n with exactly one missing, where n is array.length + 1. I compute the expected range sum using long arithmetic and subtract the actual sum. Using long prevents overflow in the intermediate arithmetic that can occur with int.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static long findMissingNumber(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    long n = (long) numbers.length + 1;
    long expectedSum = n * (n + 1) / 2;
    long actualSum = 0;

    for (int number : numbers) {
        actualSum += number;
    }

    return expectedSum - actualSum;
}`,
  },
  {
    id: 10,
    approach:
      "I use a write index for the next non-zero position. Scanning left to right, I copy each non-zero value forward; this preserves the relative order of non-zero elements. I then fill the remaining suffix with zeros. The array is modified in place.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static void moveZerosToEnd(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    int writeIndex = 0;
    for (int number : numbers) {
        if (number != 0) {
            numbers[writeIndex++] = number;
        }
    }

    while (writeIndex < numbers.length) {
        numbers[writeIndex++] = 0;
    }
}`,
  },
  {
    id: 11,
    approach:
      "I scan the array once and store each value's index in a hash map. Before storing the current value, I check whether its complement has already appeared; checking first prevents using the same element twice. The method returns indices, not values, and throws when the input has no valid pair.",
    complexity: "Time: O(n) average. Extra space: O(n).",
    code: `public static int[] twoSum(int[] numbers, int target) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    Map<Integer, Integer> indexByValue = new HashMap<>();
    for (int i = 0; i < numbers.length; i++) {
        long complement = (long) target - numbers[i];
        if (complement >= Integer.MIN_VALUE
                && complement <= Integer.MAX_VALUE
                && indexByValue.containsKey((int) complement)) {
            return new int[] { indexByValue.get((int) complement), i };
        }
        indexByValue.put(numbers[i], i);
    }

    throw new IllegalArgumentException("No pair adds up to the target");
}`,
  },
  {
    id: 12,
    approach:
      "I count each character in a first pass, then scan the original string again and return the first character whose frequency is one. The second scan preserves the original order, which is essential because the question asks for the first unique character. Optional.empty() represents the case where none exists.",
    complexity: "Time: O(n) average. Extra space: O(k), where k is the number of distinct chars.",
    code: `public static Optional<Character> firstNonRepeatingCharacter(String input) {
    if (input == null) {
        throw new IllegalArgumentException("Input must not be null");
    }

    Map<Character, Integer> frequencies = new HashMap<>();
    for (char character : input.toCharArray()) {
        frequencies.put(
                character,
                frequencies.getOrDefault(character, 0) + 1);
    }

    for (char character : input.toCharArray()) {
        if (frequencies.get(character) == 1) {
            return Optional.of(character);
        }
    }

    return Optional.empty();
}`,
  },
  {
    id: 13,
    approach:
      "I split the sentence into whitespace-delimited words and keep the longest one seen so far. Comparing lengths gives a linear scan; if two words tie, this version keeps the first. Punctuation is considered part of a word, which I would clarify with the interviewer if the requirement says otherwise.",
    complexity: "Time: O(n). Extra space: O(n) for the split words.",
    code: `public static String longestWord(String sentence) {
    if (sentence == null || sentence.trim().isEmpty()) {
        return "";
    }

    String longest = "";
    for (String word : sentence.trim().split("\\\\s+")) {
        if (word.length() > longest.length()) {
            longest = word;
        }
    }

    return longest;
}`,
  },
  {
    id: 14,
    approach:
      "I scan the input and build a number while I see digits. When a non-digit ends a number, I add that number to the running total and reset the accumulator; after the loop I also add a number that reaches the end of the string. This version treats digit groups as non-negative integers and uses exact arithmetic so overflow is reported instead of silently wrapping.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static long sumNumbersInString(String input) {
    if (input == null) {
        throw new IllegalArgumentException("Input must not be null");
    }

    long sum = 0;
    long currentNumber = 0;
    boolean readingNumber = false;

    for (char character : input.toCharArray()) {
        if (character >= '0' && character <= '9') {
            currentNumber = Math.addExact(
                    Math.multiplyExact(currentNumber, 10),
                    character - '0');
            readingNumber = true;
        } else if (readingNumber) {
            sum = Math.addExact(sum, currentNumber);
            currentNumber = 0;
            readingNumber = false;
        }
    }

    if (readingNumber) {
        sum = Math.addExact(sum, currentNumber);
    }

    return sum;
}`,
  },
  {
    id: 15,
    approach:
      "For a right rotation, I normalize k by the array length and use the reversal trick: reverse the whole array, then reverse the first k elements and the rest. Each element is moved a constant number of times, so this is linear time and constant extra space. An empty array is handled before modulo.",
    complexity: "Time: O(n). Extra space: O(1); the input array is modified.",
    code: `public static void rotateRight(int[] numbers, int k) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }
    if (numbers.length == 0) {
        return;
    }

    int shift = Math.floorMod(k, numbers.length);
    reverse(numbers, 0, numbers.length - 1);
    reverse(numbers, 0, shift - 1);
    reverse(numbers, shift, numbers.length - 1);
}

private static void reverse(int[] numbers, int left, int right) {
    while (left < right) {
        int temporary = numbers[left];
        numbers[left] = numbers[right];
        numbers[right] = temporary;
        left++;
        right--;
    }
}`,
  },
  {
    id: 16,
    approach:
      "Because both inputs are already sorted, I can merge them with two pointers instead of sorting all elements again. At each step I copy the smaller current value and advance that input's pointer, then append whichever input still has values. Choosing from the first array on equality makes the merge stable.",
    complexity: "Time: O(n + m). Extra space: O(n + m) for the result.",
    code: `public static int[] mergeSortedArrays(int[] first, int[] second) {
    if (first == null || second == null) {
        throw new IllegalArgumentException("Arrays must not be null");
    }

    int[] merged = new int[first.length + second.length];
    int i = 0;
    int j = 0;
    int writeIndex = 0;

    while (i < first.length && j < second.length) {
        if (first[i] <= second[j]) {
            merged[writeIndex++] = first[i++];
        } else {
            merged[writeIndex++] = second[j++];
        }
    }

    while (i < first.length) {
        merged[writeIndex++] = first[i++];
    }
    while (j < second.length) {
        merged[writeIndex++] = second[j++];
    }

    return merged;
}`,
  },
  {
    id: 17,
    approach:
      "Since the input is sorted, equal values are adjacent. I keep a write index for the last unique value and copy a value only when it differs from that one. The method returns the length of the unique prefix; values beyond that length are intentionally unspecified.",
    complexity: "Time: O(n). Extra space: O(1); the input array is modified.",
    code: `public static int removeDuplicatesFromSortedArray(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }
    if (numbers.length == 0) {
        return 0;
    }

    int writeIndex = 1;
    for (int readIndex = 1; readIndex < numbers.length; readIndex++) {
        if (numbers[readIndex] != numbers[writeIndex - 1]) {
            numbers[writeIndex++] = numbers[readIndex];
        }
    }

    return writeIndex;
}`,
  },
  {
    id: 18,
    approach:
      "I use Kadane's algorithm. At each element, the best subarray ending here is either the element by itself or the previous best ending here plus this element; I then update the global best. Initializing from the first value correctly handles arrays containing only negative numbers.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static long maximumSubarraySum(int[] numbers) {
    if (numbers == null || numbers.length == 0) {
        throw new IllegalArgumentException("Array must not be empty");
    }

    long bestEndingHere = numbers[0];
    long bestOverall = numbers[0];

    for (int i = 1; i < numbers.length; i++) {
        bestEndingHere = Math.max(
                numbers[i],
                bestEndingHere + numbers[i]);
        bestOverall = Math.max(bestOverall, bestEndingHere);
    }

    return bestOverall;
}`,
  },
  {
    id: 19,
    approach:
      "Binary search requires the input to be sorted. I maintain an inclusive search interval and discard the half that cannot contain the target after each comparison. The midpoint formula avoids overflowing left + right, and -1 indicates the target was not found.",
    complexity: "Time: O(log n). Extra space: O(1).",
    code: `public static int binarySearch(int[] sortedNumbers, int target) {
    if (sortedNumbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    int left = 0;
    int right = sortedNumbers.length - 1;

    while (left <= right) {
        int middle = left + (right - left) / 2;
        if (sortedNumbers[middle] == target) {
            return middle;
        }
        if (sortedNumbers[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}`,
  },
  {
    id: 20,
    approach:
      "I use the Dutch National Flag algorithm with three regions: zeros before low, ones between low and mid, and twos after high. The value at mid determines which pointer moves. When a two is swapped with high, mid stays in place because the incoming value has not been examined yet.",
    complexity: "Time: O(n). Extra space: O(1); the input array is modified.",
    code: `public static void sortZeroOneTwo(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    int low = 0;
    int middle = 0;
    int high = numbers.length - 1;

    while (middle <= high) {
        if (numbers[middle] == 0) {
            swap(numbers, low, middle);
            low++;
            middle++;
        } else if (numbers[middle] == 1) {
            middle++;
        } else if (numbers[middle] == 2) {
            swap(numbers, middle, high);
            high--;
        } else {
            throw new IllegalArgumentException("Values must be 0, 1, or 2");
        }
    }
}

private static void swap(int[] numbers, int first, int second) {
    int temporary = numbers[first];
    numbers[first] = numbers[second];
    numbers[second] = temporary;
}`,
  },
  {
    id: 21,
    approach:
      "I maintain a sliding window that contains no repeated characters and a map from each character to its most recent index. When a duplicate falls inside the current window, I move the left boundary just past its previous position. This avoids repeatedly removing characters one by one.",
    complexity: "Time: O(n) average. Extra space: O(k), where k is the number of distinct chars.",
    code: `public static int lengthOfLongestSubstring(String input) {
    if (input == null) {
        throw new IllegalArgumentException("Input must not be null");
    }

    Map<Character, Integer> lastSeenIndex = new HashMap<>();
    int left = 0;
    int longest = 0;

    for (int right = 0; right < input.length(); right++) {
        char current = input.charAt(right);
        Integer previousIndex = lastSeenIndex.get(current);
        if (previousIndex != null && previousIndex >= left) {
            left = previousIndex + 1;
        }

        lastSeenIndex.put(current, right);
        longest = Math.max(longest, right - left + 1);
    }

    return longest;
}`,
  },
  {
    id: 22,
    approach:
      "I start with the first string as the candidate prefix. For each remaining string, I shorten that candidate until the string starts with it; if it becomes empty, there is no common prefix. This is easy to explain and does not require sorting the input.",
    complexity: "Time: O(total characters examined). Extra space: O(1), excluding the returned prefix.",
    code: `public static String longestCommonPrefix(String[] words) {
    if (words == null || words.length == 0) {
        return "";
    }

    String prefix = words[0];
    for (int i = 1; i < words.length; i++) {
        while (!words[i].startsWith(prefix)) {
            if (prefix.isEmpty()) {
                return "";
            }
            prefix = prefix.substring(0, prefix.length() - 1);
        }
    }

    return prefix;
}`,
  },
  {
    id: 23,
    approach:
      "Balanced delimiters require last-in, first-out matching, so I use a stack. Opening brackets are pushed; for each closing bracket I verify that the stack is non-empty and that its top is the matching opener. Other characters are ignored, and the input is balanced only if the stack is empty at the end.",
    complexity: "Time: O(n). Extra space: O(n) in the worst case.",
    code: `public static boolean hasBalancedBrackets(String input) {
    if (input == null) {
        return false;
    }

    Deque<Character> openings = new ArrayDeque<>();
    for (char character : input.toCharArray()) {
        if (character == '(' || character == '[' || character == '{') {
            openings.push(character);
        } else if (character == ')' || character == ']' || character == '}') {
            if (openings.isEmpty()) {
                return false;
            }

            char opening = openings.pop();
            boolean matches = (character == ')' && opening == '(')
                    || (character == ']' && opening == '[')
                    || (character == '}' && opening == '{');
            if (!matches) {
                return false;
            }
        }
    }

    return openings.isEmpty();
}`,
  },
  {
    id: 24,
    approach:
      "Assuming ListNode has a next field, I reverse one pointer at a time. Before changing current.next, I save the next node so the rest of the list remains reachable. The prev pointer becomes the new head after the traversal; this also works for an empty list.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static ListNode reverseList(ListNode head) {
    ListNode previous = null;
    ListNode current = head;

    while (current != null) {
        ListNode next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }

    return previous;
}`,
  },
  {
    id: 25,
    approach:
      "I use Floyd's tortoise-and-hare algorithm. The slow pointer advances one node and the fast pointer advances two; if there is a cycle, they must eventually meet inside it. If the fast pointer reaches the end, the list is acyclic. No extra set of visited nodes is needed.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }

    return false;
}`,
  },
  {
    id: 26,
    approach:
      "I count inversions during merge sort. Each half is sorted recursively; when a right-half value is smaller than the current left-half value, it is smaller than every remaining value in the left half, so I add mid - leftIndex + 1 inversions at once. The merge step also sorts the input array.",
    complexity: "Time: O(n log n). Extra space: O(n) plus recursion stack.",
    code: `public static long countInversions(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    int[] temporary = new int[numbers.length];
    return sortAndCount(numbers, temporary, 0, numbers.length);
}

private static long sortAndCount(
        int[] numbers, int[] temporary, int start, int end) {
    if (end - start < 2) {
        return 0;
    }

    int middle = start + (end - start) / 2;
    long inversions = sortAndCount(numbers, temporary, start, middle);
    inversions += sortAndCount(numbers, temporary, middle, end);
    inversions += mergeAndCount(numbers, temporary, start, middle, end);
    return inversions;
}

private static long mergeAndCount(
        int[] numbers, int[] temporary, int start, int middle, int end) {
    int left = start;
    int right = middle;
    int writeIndex = start;
    long inversions = 0;

    while (left < middle && right < end) {
        if (numbers[left] <= numbers[right]) {
            temporary[writeIndex++] = numbers[left++];
        } else {
            temporary[writeIndex++] = numbers[right++];
            inversions += middle - left;
        }
    }

    while (left < middle) {
        temporary[writeIndex++] = numbers[left++];
    }
    while (right < end) {
        temporary[writeIndex++] = numbers[right++];
    }
    System.arraycopy(temporary, start, numbers, start, end - start);
    return inversions;
}`,
  },
  {
    id: 27,
    approach:
      "I keep a min-heap containing at most k elements. Whenever it grows beyond k, I remove its smallest value; after processing all numbers, the heap's root is the kth largest. This is a good choice when k is much smaller than n; quickselect is another option when average linear time is preferred.",
    complexity: "Time: O(n log k). Extra space: O(k).",
    code: `public static int findKthLargest(int[] numbers, int k) {
    if (numbers == null || k < 1 || k > numbers.length) {
        throw new IllegalArgumentException("k must be between 1 and array length");
    }

    PriorityQueue<Integer> smallestFirst = new PriorityQueue<>();
    for (int number : numbers) {
        smallestFirst.offer(number);
        if (smallestFirst.size() > k) {
            smallestFirst.poll();
        }
    }

    return smallestFirst.peek();
}`,
  },
  {
    id: 28,
    approach:
      "I use the patience-sorting idea. tails[length - 1] stores the smallest possible ending value for an increasing subsequence of that length. For each number, binary search finds the first tail greater than or equal to it and replaces that value; the final size is the LIS length. The tails array is not itself necessarily the subsequence.",
    complexity: "Time: O(n log n). Extra space: O(n).",
    code: `public static int lengthOfLongestIncreasingSubsequence(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    int[] tails = new int[numbers.length];
    int size = 0;

    for (int number : numbers) {
        int left = 0;
        int right = size;
        while (left < right) {
            int middle = left + (right - left) / 2;
            if (tails[middle] < number) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }

        tails[left] = number;
        if (left == size) {
            size++;
        }
    }

    return size;
}`,
  },
  {
    id: 29,
    approach:
      "At each position, the best result either skips the current value or takes it and adds the best result from two positions back. I keep only those two rolling states instead of a full dynamic-programming array. This version allows choosing no elements, so an all-negative input returns zero; I would confirm that rule with the interviewer.",
    complexity: "Time: O(n). Extra space: O(1).",
    code: `public static long maximumNonAdjacentSum(int[] numbers) {
    if (numbers == null) {
        throw new IllegalArgumentException("Array must not be null");
    }

    long bestTwoBack = 0;
    long bestOneBack = 0;

    for (int number : numbers) {
        long takeCurrent = bestTwoBack + number;
        long skipCurrent = bestOneBack;
        long bestCurrent = Math.max(takeCurrent, skipCurrent);
        bestTwoBack = bestOneBack;
        bestOneBack = bestCurrent;
    }

    return bestOneBack;
}`,
  },
  {
    id: 30,
    approach:
      "I binary-search how many elements to take from the shorter array for the left partition. The partition is valid when the largest value on each left side is no greater than the smallest value on the opposite right side; then the kth smallest is the larger left-side value. This avoids merging the arrays and uses k as a 1-based position.",
    complexity: "Time: O(log(min(n, m))). Extra space: O(1).",
    code: `public static int kthSmallest(int[] first, int[] second, int k) {
    if (first == null || second == null) {
        throw new IllegalArgumentException("Arrays must not be null");
    }
    if (first.length > second.length) {
        return kthSmallest(second, first, k);
    }
    if (k < 1 || (long) k > (long) first.length + second.length) {
        throw new IllegalArgumentException("k is outside the combined array range");
    }

    int left = Math.max(0, k - second.length);
    int right = Math.min(k, first.length);

    while (left <= right) {
        int takeFirst = left + (right - left) / 2;
        int takeSecond = k - takeFirst;

        int firstLeft = takeFirst == 0
                ? Integer.MIN_VALUE
                : first[takeFirst - 1];
        int firstRight = takeFirst == first.length
                ? Integer.MAX_VALUE
                : first[takeFirst];
        int secondLeft = takeSecond == 0
                ? Integer.MIN_VALUE
                : second[takeSecond - 1];
        int secondRight = takeSecond == second.length
                ? Integer.MAX_VALUE
                : second[takeSecond];

        if (firstLeft <= secondRight && secondLeft <= firstRight) {
            return Math.max(firstLeft, secondLeft);
        }
        if (firstLeft > secondRight) {
            right = takeFirst - 1;
        } else {
            left = takeFirst + 1;
        }
    }

    throw new IllegalArgumentException("Input arrays must be sorted");
  }`,
  },
];
