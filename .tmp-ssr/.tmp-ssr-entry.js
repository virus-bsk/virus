import { renderToString } from "react-dom/server";
import { Link, MemoryRouter } from "react-router-dom";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/VideoPlayerModal.jsx
/**
* VideoPlayerModal — Global reusable YouTube video player modal.
*
* Plays a YouTube video inside the app (embedded iframe) instead of
* redirecting to youtube.com. Reusable across all pages.
*
* Props:
*  - isOpen    : boolean  — whether the modal is visible
*  - onClose   : function — called when the user closes the modal
*  - videoUrl  : string   — any YouTube URL form:
*      https://www.youtube.com/watch?v=VIDEO_ID
*      https://youtu.be/VIDEO_ID
*      https://www.youtube.com/embed/VIDEO_ID
*      https://www.youtube.com/playlist?list=LIST_ID   (channel/playlist embed)
*  - title     : string   — optional heading shown above the player
*  - description: string  — optional problem description shown below the player
*  - example   : string   — optional example input/output shown below the player
*  - explanation: string  — optional detailed explanation shown below the player
*/
function VideoPlayerModal({ isOpen, onClose, videoUrl, title, description, example, explanation }) {
	const extractVideoId = (url) => {
		if (!url) return null;
		for (const p of [
			/(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
			/(?:youtu\.be\/)([\w-]{11})/,
			/(?:youtube\.com\/embed\/)([\w-]{11})/,
			/(?:youtube\.com\/shorts\/)([\w-]{11})/
		]) {
			const m = url.match(p);
			if (m) return m[1];
		}
		return null;
	};
	const extractListId = (url) => {
		if (!url) return null;
		const m = url.match(/[?&]list=([\w-]+)/);
		return m ? m[1] : null;
	};
	const videoId = extractVideoId(videoUrl);
	const listId = videoId ? null : extractListId(videoUrl);
	const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : listId ? `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}&rel=0&modestbranding=1` : null;
	const handleKeyDown = useCallback((e) => {
		if (e.key === "Escape") onClose();
	}, [onClose]);
	useEffect(() => {
		if (!isOpen) return void 0;
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen, handleKeyDown]);
	if (!isOpen) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "vpm-overlay",
		onClick: onClose,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title || "Video player",
		children: /* @__PURE__ */ jsxs("div", {
			className: "vpm-modal",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "vpm-close",
					onClick: onClose,
					"aria-label": "Close video",
					children: "✕"
				}),
				title && /* @__PURE__ */ jsx("h2", {
					className: "vpm-title",
					children: title
				}),
				/* @__PURE__ */ jsx("div", {
					className: "vpm-player-wrap",
					children: embedUrl ? /* @__PURE__ */ jsx("iframe", {
						className: "vpm-iframe",
						src: embedUrl,
						title: title || "YouTube video player",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
						allowFullScreen: true,
						referrerPolicy: "strict-origin-when-cross-origin"
					}) : /* @__PURE__ */ jsx("div", {
						className: "vpm-error",
						children: "⚠️ Unable to load this video. Invalid or missing video link."
					})
				}),
				description && /* @__PURE__ */ jsxs("div", {
					className: "vpm-section",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "vpm-section-title",
						children: "Problem"
					}), /* @__PURE__ */ jsx("p", {
						className: "vpm-text",
						children: description
					})]
				}),
				example && /* @__PURE__ */ jsxs("div", {
					className: "vpm-section vpm-example",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "vpm-section-title",
						children: "Example"
					}), /* @__PURE__ */ jsx("pre", {
						className: "vpm-example-text",
						children: example
					})]
				}),
				explanation && /* @__PURE__ */ jsxs("div", {
					className: "vpm-section",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "vpm-section-title",
						children: "Explanation"
					}), /* @__PURE__ */ jsx("p", {
						className: "vpm-text",
						children: explanation
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/maang/basic-dsa/dsaBasicProblems.js
var dsaBasicProblems = [
	{
		id: 1,
		title: "Trapping Rain Water",
		topic: "Arrays",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/trapping-rain-water/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=6z9hrVpUm6s"
	},
	{
		id: 2,
		title: "Maximum of Absolute Value Expression",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/maximum-of-absolute-value-expression/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 3,
		title: "Range Sum Query",
		topic: "Arrays",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/range-sum-query-immutable/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=EGpZNRtvj2U"
	},
	{
		id: 4,
		title: "Range Sum Query 2D",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=xB7WBIc-LHQ"
	},
	{
		id: 5,
		title: "Search a 2D Matrix",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/search-a-2d-matrix/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=dAWKp8_GtUc"
	},
	{
		id: 6,
		title: "Max Chunks To Make Sorted",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/max-chunks-to-make-sorted/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=Ekc84QC4oFQ"
	},
	{
		id: 7,
		title: "Spiral Matrix",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/spiral-matrix/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 8,
		title: "Matrix Diagonal Sum",
		topic: "Arrays",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/matrix-diagonal-sum/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 9,
		title: "Sum of all Submatrices",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/sum-of-all-submatrices-of-a-given-matrix/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 10,
		title: "Next Permutation",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/next-permutation/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=SEMS-0d4X6Q"
	},
	{
		id: 11,
		title: "Set Matrix Zeroes",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/set-matrix-zeroes/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 12,
		title: "Maximum Subarray",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/maximum-subarray/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 13,
		title: "Maximum Gap",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/maximum-gap/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 14,
		title: "Array Zero Split and Merge",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/check-whether-an-array-can-be-made-0-by-splitting-and-merging-repeatedly/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 15,
		title: "Concatenation of Array",
		topic: "Arrays",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/concatenation-of-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 16,
		title: "Partition Array According to Given Pivot",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/partition-array-according-to-given-pivot/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 17,
		title: "Find Pairs in Array Whose Sums Already Exist",
		topic: "Arrays",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/find-pairs-in-array-whose-sums-already-exist-in-array/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 18,
		title: "Palindrome Pairs",
		topic: "Strings",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/palindrome-pairs/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 19,
		title: "Letter Case Permutation",
		topic: "Strings",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/letter-case-permutation/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 20,
		title: "Backspace String Compare",
		topic: "Strings",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/backspace-string-compare/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 21,
		title: "Longest Substring Without Repeating Characters",
		topic: "Strings",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 22,
		title: "Longest Substring with K Uniques",
		topic: "Strings",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/find-the-longest-substring-with-k-unique-characters-in-a-given-string/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 23,
		title: "Sliding Window Maximum",
		topic: "Sliding Window",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/sliding-window-maximum/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 24,
		title: "Minimum Window Substring",
		topic: "Sliding Window",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/minimum-window-substring/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 25,
		title: "Max Sum Subarray of Size K",
		topic: "Sliding Window",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/window-sliding-technique/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 26,
		title: "Container With Most Water",
		topic: "Two Pointers",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/container-with-most-water/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 27,
		title: "Valid Palindrome",
		topic: "Two Pointers",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/valid-palindrome/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 28,
		title: "Subarray Sum Equals K",
		topic: "Prefix Sum",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/subarray-sum-equals-k/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 29,
		title: "Binary Search",
		topic: "Binary Search",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/binary-search/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=JpeuTaAVBiA"
	},
	{
		id: 30,
		title: "Find First and Last Position of Element",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=6tAmm8JjyDY"
	},
	{
		id: 31,
		title: "Single Element in a Sorted Array",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=Pm-e0N2gxqc"
	},
	{
		id: 32,
		title: "Find Minimum in Rotated Sorted Array",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 33,
		title: "Search in Rotated Sorted Array",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 34,
		title: "Maximum in a Sorted and Rotated Array",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/maximum-element-in-a-sorted-and-rotated-array/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 35,
		title: "Find Peak Element",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/find-peak-element/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=xga-GTt8WBI"
	},
	{
		id: 36,
		title: "Magnetic Force Between Two Balls",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/magnetic-force-between-two-balls/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 37,
		title: "Sqrt(x)",
		topic: "Binary Search",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/sqrtx/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 38,
		title: "Smallest Good Base",
		topic: "Binary Search",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/smallest-good-base/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 39,
		title: "Find K Closest Elements",
		topic: "Binary Search",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/find-k-closest-elements/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 40,
		title: "Sort Colors",
		topic: "Sorting",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/sort-colors/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 41,
		title: "Reverse Pairs",
		topic: "Sorting",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/reverse-pairs/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 42,
		title: "Count of Smaller Numbers After Self",
		topic: "Sorting",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 43,
		title: "Sort an Array",
		topic: "Sorting",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/sort-an-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 44,
		title: "Merge Sorted Array",
		topic: "Sorting",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/merge-sorted-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 45,
		title: "Quick Sort",
		topic: "Sorting",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/quick-sort/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 46,
		title: "Count Inversions",
		topic: "Sorting",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/counting-inversions/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 47,
		title: "Sort Array By Parity",
		topic: "Sorting",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/sort-array-by-parity/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 48,
		title: "Minimum Absolute Difference",
		topic: "Sorting",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/minimum-absolute-difference/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 49,
		title: "K Closest Points to Origin",
		topic: "Sorting",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/k-closest-points-to-origin/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 50,
		title: "Print 1 to n using Recursion",
		topic: "Recursion",
		difficulty: "Easy",
		link: "https://www.geeksforgeeks.org/print-1-to-n-without-using-loops/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 51,
		title: "Print N to 1 without Loop",
		topic: "Recursion",
		difficulty: "Easy",
		link: "https://www.geeksforgeeks.org/print-n-to-1-without-using-loops/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 52,
		title: "Print N to 1 and 1 to N Using Recursion",
		topic: "Recursion",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/print-n-to-1-and-1-to-n-using-recursion/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 53,
		title: "Factorial",
		topic: "Recursion",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/factorial-of-a-number-using-recursion/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 54,
		title: "Pow(x, n)",
		topic: "Recursion",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/powx-n/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 55,
		title: "N-Queens",
		topic: "Backtracking",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/n-queens/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 56,
		title: "Rat in a Maze",
		topic: "Backtracking",
		difficulty: "Hard",
		link: "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-using-recursion/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 57,
		title: "Palindrome Partitioning",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/palindrome-partitioning/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 58,
		title: "Sudoku Solver",
		topic: "Backtracking",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/sudoku-solver/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 59,
		title: "Gray Code",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/gray-code/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 60,
		title: "Letter Combinations of a Phone Number",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 61,
		title: "Combination Sum III",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/combination-sum-iii/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 62,
		title: "Subsets",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/subsets/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 63,
		title: "Permutations",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/permutations/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 64,
		title: "Permutations II",
		topic: "Backtracking",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/permutations-ii/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 65,
		title: "Candy",
		topic: "Greedy",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/candy/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 66,
		title: "Job Sequencing Problem",
		topic: "Greedy",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/job-sequencing-problem-loss-minimization/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 67,
		title: "Gas Station",
		topic: "Greedy",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/gas-station/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 68,
		title: "N meetings in one room",
		topic: "Greedy",
		difficulty: "Easy",
		link: "https://www.geeksforgeeks.org/n-meetings-in-one-room/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 69,
		title: "Activity Selection",
		topic: "Greedy",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 70,
		title: "Minimum Platforms",
		topic: "Greedy",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 71,
		title: "Maximize Sum Of Array After K Negations",
		topic: "Greedy",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 72,
		title: "Last Stone Weight",
		topic: "Greedy",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/last-stone-weight/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 73,
		title: "Check K-th Bit",
		topic: "Bit Manipulation",
		difficulty: "Easy",
		link: "https://www.geeksforgeeks.org/check-whether-k-th-bit-set-or-not/",
		platform: "gfg",
		videoLink: "https://www.youtube.com/watch?v=lN9lj83lVK8"
	},
	{
		id: 74,
		title: "Reverse Bits",
		topic: "Bit Manipulation",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/reverse-bits/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=lyj1BpGZ8QI"
	},
	{
		id: 75,
		title: "Sum of Two Integers",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/sum-of-two-integers/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 76,
		title: "Swap Two Numbers Using Bitwise",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/swap-two-numbers-without-using-third-variable/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 77,
		title: "Single Number",
		topic: "Bit Manipulation",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/single-number/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=hJIlLxGc424"
	},
	{
		id: 78,
		title: "Single Number II",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/single-number-ii/",
		platform: "leetcode",
		videoLink: "https://www.youtube.com/watch?v=2sGMA4LR8pg"
	},
	{
		id: 79,
		title: "Maximum XOR of Two Numbers in an Array",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 80,
		title: "Position of Rightmost Set Bit",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/position-of-rightmost-set-bit/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 81,
		title: "Subarray with XOR less than k",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/count-subarrays-xor-less-k/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 82,
		title: "Total Hamming Distance",
		topic: "Bit Manipulation",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/total-hamming-distance/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 83,
		title: "Permutation Sequence",
		topic: "Math",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/permutation-sequence/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 84,
		title: "Max Points on a Line",
		topic: "Math",
		difficulty: "Hard",
		link: "https://leetcode.com/problems/max-points-on-a-line/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 85,
		title: "Divide Two Integers",
		topic: "Math",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/divide-two-integers/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 86,
		title: "Fizz Buzz",
		topic: "Math",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/fizz-buzz/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 87,
		title: "Find Greatest Common Divisor of Array",
		topic: "Math",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 88,
		title: "Number of Common Factors",
		topic: "Math",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/number-of-common-factors/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 89,
		title: "Four Divisors",
		topic: "Math",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/four-divisors/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 90,
		title: "Largest Number That Divides X and is Co-prime with Y",
		topic: "Math",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/largest-number-that-divides-x-and-is-co-prime-with-y/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 91,
		title: "Number of Open Doors",
		topic: "Math",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/number-of-open-doors/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 92,
		title: "Factorial Trailing Zeroes",
		topic: "Math",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/factorial-trailing-zeroes/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 93,
		title: "Count Trailing Zeros",
		topic: "Math",
		difficulty: "Medium",
		link: "https://www.geeksforgeeks.org/count-trailing-zeroes-factorial-number/",
		platform: "gfg",
		videoLink: null
	},
	{
		id: 94,
		title: "Rectangle Area",
		topic: "Math",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/rectangle-area/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 95,
		title: "Check If Array Pairs Are Divisible by k",
		topic: "Math",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/",
		platform: "leetcode",
		videoLink: null
	},
	{
		id: 96,
		title: "Distribute Candies",
		topic: "Math",
		difficulty: "Easy",
		link: "https://leetcode.com/problems/distribute-candies/",
		platform: "leetcode",
		videoLink: null
	}
];
var googleSeriesIntro = {
	title: "Google Crack Coding Series in Telugu — Introduction",
	videoLink: "https://www.youtube.com/watch?v=5Qqly4rxqDU"
};
//#endregion
//#region src/maang/basic-dsa/weeklyPlan.js
/** FNV-1a string hash → unsigned 32-bit integer. */
function fnv1a(str) {
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h >>> 0;
}
/** mulberry32 PRNG — tiny, fast and fully deterministic for a given seed. */
function mulberry32(seed) {
	let t = seed >>> 0;
	return function() {
		t = t + 1831565813 >>> 0;
		let r = Math.imul(t ^ t >>> 15, 1 | t);
		r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r;
		return ((r ^ r >>> 14) >>> 0) / 4294967296;
	};
}
/**
* Shallow-copy `items`, deterministically shuffle them (Fisher–Yates driven
* by the hashed seed) and return the first `count` entries.
*/
function seededPick(items, count, seedStr) {
	const rand = mulberry32(fnv1a(String(seedStr)));
	const arr = items.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.slice(0, Math.max(0, count));
}
/** Monday 00:00 (local) of the week containing `date`. */
function mondayOf(date) {
	const d = new Date(date);
	d.setDate(d.getDate() - (d.getDay() + 6) % 7);
	d.setHours(0, 0, 0, 0);
	return d;
}
var START_WEEK_KEY = "maang-wp-start-monday";
var DAY_MS_LOCAL = 1440 * 60 * 1e3;
function startMonday() {
	try {
		const stored = window.localStorage.getItem(START_WEEK_KEY);
		if (stored && !Number.isNaN(Number(stored))) return mondayOf(new Date(Number(stored)));
		const first = mondayOf(/* @__PURE__ */ new Date());
		window.localStorage.setItem(START_WEEK_KEY, String(first.getTime()));
		return first;
	} catch {
		return mondayOf(/* @__PURE__ */ new Date());
	}
}
/**
* The 10 problem slots assigned to the given course week index. Slots are
* carved straight out of `order` (the track's natural sequence), so practice
* advances sequentially through the course and wraps around at the end.
*/
function slotsForWeek(order, weekIdx) {
	const out = [];
	const len = order.length;
	for (let i = 0; i < 10; i++) {
		const idx = ((weekIdx * 10 + i) % len + len) % len;
		out.push(order[idx]);
	}
	return out;
}
/**
* Saturday assessment — 2 problems drawn from THIS week's 10 practice slots.
* Rules: both problems belong to the current week, and they are distinct.
*/
function saturdayAssessment(bank, weekIdx, nonce = 0) {
	const current = slotsForWeek(bank, weekIdx);
	const seedTail = nonce ? `-${nonce}` : "";
	return seededPick(current, 2, `sat-${weekIdx}-${bank.length}${seedTail}`);
}
/**
* Sunday assessment — 1 problem from LAST week + 1 from THIS week.
* On Week 1 (no previous week) both come from THIS week instead of wrapping to
* the far end of the bank. Rule: the two problems are always different.
*/
function sundayAssessment(bank, weekIdx, nonce = 0) {
	const current = slotsForWeek(bank, weekIdx);
	const previous = slotsForWeek(bank, weekIdx - 1);
	const hasPrevWeek = weekIdx > 0;
	const prevPool = hasPrevWeek ? previous : current;
	const seedTail = nonce ? `-${nonce}` : "";
	const prevPick = seededPick(prevPool, 1, `sun-prev-${weekIdx}-${bank.length}${seedTail}`)[0];
	const curPool = current.filter((p) => p !== prevPick);
	return {
		hasPrevWeek,
		problems: [prevPick, seededPick(curPool.length ? curPool : current, 1, `sun-cur-${weekIdx}-${bank.length}${seedTail}`)[0]]
	};
}
var SWIPE_FLICK_VELOCITY = .45;
var SWIPE_TRAVEL_RATIO = .18;
function resolveSwipeTarget(index, dx, velocity, width, paneCount) {
	if (!(paneCount > 1)) return 0;
	const flicked = Math.abs(velocity) > SWIPE_FLICK_VELOCITY;
	const dragged = Math.abs(dx) > Math.max(48, width * SWIPE_TRAVEL_RATIO);
	let step = 0;
	if (flicked) step = velocity < 0 ? 1 : -1;
	else if (dragged) step = dx < 0 ? 1 : -1;
	return Math.min(Math.max(index + step, 0), paneCount - 1);
}
/** Course week number ("Week N") for a plan offset. */
function weekNoForOffset(offset, minOffset) {
	return offset - minOffset + 1;
}
/** The plan offset that shows course week number `weekNo`. */
function offsetForWeekNo(weekNo, minOffset) {
	return minOffset + weekNo - 1;
}
/**
* How many distinct course weeks the bank can fill. After this many weeks the
* 10 slots per week start repeating earlier problems (see slotsForWeek), so
* this is also the last week worth offering in the picker.
*/
function courseWeekCount(bank) {
	if (!bank || bank.length === 0) return 1;
	return Math.max(1, Math.ceil(bank.length / 10));
}
/**
* The weeks the picker offers, ascending: [{ weekNo, offset }, …].
*
* Lists every distinct course week (Week 1 → the bank's last week) and ALWAYS
* includes the week currently on screen, even if the learner has browsed past
* the end of the bank: the plan wraps around there, and a <select> whose value
* has no matching option renders blank.
*/
function weekPickerOptions(bank, minOffset, currentOffset = 0) {
	const lastWeekNo = Math.max(courseWeekCount(bank), weekNoForOffset(currentOffset, minOffset));
	const options = [];
	for (let weekNo = 1; weekNo <= lastWeekNo; weekNo += 1) options.push({
		weekNo,
		offset: offsetForWeekNo(weekNo, minOffset)
	});
	return options;
}
/**
* Build the plan for `offset` weeks relative to the user's CURRENT course
* week (0 = this week, -1 = last week, +1 = next week …).
*
* Returns { weekNo, weekIdx, minOffset, canGoPrev, days[] } where each day is
* { key, name, jsDay, type, problems[2] } and type is one of:
* "practice" | "test-week" (Sat) | "test-mixed" (Sun).
*/
function buildWeeklyPlan(bank, offset = 0, nonce = 0) {
	if (!bank || bank.length === 0) return null;
	const order = bank;
	const base = startMonday();
	const thisMonday = mondayOf(/* @__PURE__ */ new Date());
	const currentIdx = Math.round((thisMonday.getTime() - base.getTime()) / (7 * DAY_MS_LOCAL));
	const targetIdx = currentIdx + offset;
	const minOffset = -Math.max(currentIdx, 0);
	const current = slotsForWeek(order, targetIdx);
	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday"
	].map((name, i) => ({
		key: `p-${i}`,
		name,
		jsDay: i + 1,
		type: "practice",
		problems: [current[i * 2], current[i * 2 + 1]]
	}));
	days.push({
		key: "sat",
		name: "Saturday",
		jsDay: 6,
		type: "test-week",
		problems: saturdayAssessment(order, targetIdx, nonce)
	});
	const { hasPrevWeek, problems: sunProblems } = sundayAssessment(order, targetIdx, nonce);
	days.push({
		key: "sun",
		name: "Sunday",
		jsDay: 0,
		type: "test-mixed",
		hasPrevWeek,
		problems: sunProblems
	});
	return {
		weekNo: Math.max(1, targetIdx + 1),
		weekIdx: targetIdx,
		minOffset,
		canGoPrev: offset > minOffset,
		days
	};
}
//#endregion
//#region src/assets/leetcode-logo.png
var leetcode_logo_default = "/assets/leetcode-logo-BuNhsHPL.png";
//#endregion
//#region src/assets/gfg-logo.png
var gfg_logo_default = "/assets/gfg-logo-BV90dSOk.png";
//#endregion
//#region src/assets/youtube-logo.svg
var youtube_logo_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2040'%20width='40'%20height='40'%3e%3crect%20x='0.5'%20y='0.5'%20width='39'%20height='39'%20rx='8'%20fill='%23FF0000'/%3e%3cpath%20d='M11.5%208.5%20L28.5%2020%20L11.5%2031.5%20Z'%20fill='white'/%3e%3c/svg%3e";
//#endregion
//#region src/maang/basic-dsa/MaangDSABasic.jsx
var difficulties = [
	"All",
	"Easy",
	"Medium",
	"Hard"
];
var HIDDEN_DAY = {
	shown: false,
	nonce: 0
};
var HIDDEN_WEEK = {
	sat: HIDDEN_DAY,
	sun: HIDDEN_DAY
};
var DRAG_START_PX = 8;
var OVERDRAG_DAMPING = .32;
var SNAP_MS = 280;
var prefersReducedMotion = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/**
* Shared problem card — used by the Problem Library grid.
*
* Props:
*   problem : the DSA problem object
*   onOpen  : opens the video modal for this problem
*   chip    : optional small label shown in the card top row
*/
var ProblemCard = memo(function ProblemCard({ problem, onOpen }) {
	const hasVideo = !!problem.videoLink;
	const description = problem.description || "Practice this problem and build stronger algorithmic thinking with a focused DSA approach.";
	const difficultyLong = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1);
	const difficultyLabel = difficultyLong === "Hard" ? "HARD" : difficultyLong;
	const platformColors = problem.platform === "leetcode" ? {
		bg: "linear-gradient(135deg,#f59e0b,#d97706)",
		text: "#ffffff"
	} : problem.platform === "gfg" ? {
		bg: "linear-gradient(135deg,#22c55e,#16a34a)",
		text: "#ffffff"
	} : {
		bg: "linear-gradient(135deg,#ef4444,#dc2626)",
		text: "#ffffff"
	};
	const platformLabel = problem.platform === "leetcode" ? "LeetCode" : problem.platform === "gfg" ? "GFG" : "YouTube";
	const platformLogo = problem.platform === "leetcode" ? leetcode_logo_default : problem.platform === "gfg" ? gfg_logo_default : youtube_logo_default;
	return /* @__PURE__ */ jsxs("div", {
		className: "mdsa-problem-card",
		style: {
			"--topic-color": topicColors[problem.topic] || "#60a5fa",
			"--platform-bg": platformColors.bg,
			"--platform-text": platformColors.text
		},
		role: "button",
		tabIndex: 0,
		"aria-label": `${problem.title} - ${problem.difficulty} ${problem.topic}`,
		onClick: () => onOpen(problem),
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onOpen(problem);
			}
		},
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mdsa-problem-top",
				children: /* @__PURE__ */ jsxs("span", {
					className: "mdsa-problem-id",
					children: ["#", problem.id]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mdsa-problem-body",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "mdsa-problem-title",
						children: problem.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mdsa-problem-description",
						children: description
					}),
					/* @__PURE__ */ jsx("span", {
						className: `mdsa-difficulty-badge mdsa-${problem.difficulty.toLowerCase()}`,
						children: difficultyLabel
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mdsa-problem-footer",
				children: [/* @__PURE__ */ jsxs("div", {
					className: `mdsa-video-btn ${hasVideo ? "available" : "soon"}`,
					title: hasVideo ? "Watch video solution" : "Video coming soon",
					children: [/* @__PURE__ */ jsx("img", {
						className: "mdsa-video-logo",
						src: youtube_logo_default,
						alt: "YouTube"
					}), /* @__PURE__ */ jsx("span", {
						className: "mdsa-solve-text",
						children: hasVideo ? "YouTube" : "Soon"
					})]
				}), /* @__PURE__ */ jsxs("a", {
					href: problem.link,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mdsa-solve-btn",
					onClick: (e) => e.stopPropagation(),
					title: "Solve this problem",
					"data-platform": problem.platform,
					style: {
						background: platformColors.bg,
						color: platformColors.text
					},
					children: [/* @__PURE__ */ jsx("img", {
						className: "mdsa-solve-logo",
						src: platformLogo,
						alt: platformLabel
					}), /* @__PURE__ */ jsx("span", {
						className: "mdsa-solve-text",
						children: platformLabel
					})]
				})]
			})
		]
	});
});
/**
* One week of the weekly plan — its seven day rows (Mon → Sun).
*
* These panes are rendered side by side inside the swipe carousel below, so
* each one is exactly one viewport wide and the neighbouring week slides into
* view while the viewer is still dragging. The neighbours are decoration until
* they land in the middle: `inert` keeps their cards/buttons out of the click
* path and the tab order, so only the week on screen is really interactive.
*
* Props:
*   plan        : buildWeeklyPlan() result for THIS pane's week
*   problems    : the problem bank (used to re-roll the assessments)
*   reveal      : { sat, sun } reveal state for this week (keyed by weekIdx)
*   onOpenVideo : opens the video modal for a problem
*   onReveal    : (weekIdx, dayKey) → fresh random assessment questions
*   isCurrent   : true for the week actually on screen (shows the "Today" chip)
*/
var WeekPane = memo(function WeekPane({ plan, problems, reveal, onOpenVideo, onReveal, isCurrent }) {
	const todayJsDay = (/* @__PURE__ */ new Date()).getDay();
	return /* @__PURE__ */ jsx("div", {
		className: "mdsa-wp-pane",
		inert: isCurrent ? void 0 : true,
		children: plan.days.map((day, i) => {
			const isToday = isCurrent && day.jsDay === todayJsDay;
			const isAssessment = day.type === "test-week" || day.type === "test-mixed";
			const revealInfo = isAssessment ? reveal[day.key] : null;
			const shown = revealInfo ? revealInfo.shown : true;
			let dayProblems;
			if (!isAssessment) dayProblems = day.problems;
			else if (!shown) dayProblems = [];
			else if (day.key === "sat") dayProblems = saturdayAssessment(problems, plan.weekIdx, revealInfo.nonce);
			else dayProblems = sundayAssessment(problems, plan.weekIdx, revealInfo.nonce).problems;
			return /* @__PURE__ */ jsxs("article", {
				className: `mdsa-wp-day ${day.type}${isToday ? " today" : ""}${isAssessment ? " mdsa-wp-day-assess" : ""}`,
				children: [/* @__PURE__ */ jsxs("header", {
					className: "mdsa-wp-day-head",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mdsa-wp-day-no",
							children: i + 1
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mdsa-wp-day-name",
							children: day.name
						}),
						/* @__PURE__ */ jsx("span", {
							className: `mdsa-wp-tag ${day.type}`,
							children: day.type === "practice" ? "Learn · 2 new" : day.type === "test-week" ? "Assessment · this week" : "Assessment · prev + this"
						}),
						isToday && /* @__PURE__ */ jsx("span", {
							className: "mdsa-wp-today-chip",
							children: "Today"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mdsa-wp-day-problems",
					children: [isAssessment && !shown && /* @__PURE__ */ jsx("p", {
						className: "mdsa-wp-random-note",
						children: "Questions are chosen at random — your set appears below when you tap reveal."
					}), isAssessment && !shown ? /* @__PURE__ */ jsx("button", {
						type: "button",
						className: `mdsa-wp-reveal-btn ${day.type}`,
						onClick: () => onReveal(plan.weekIdx, day.key),
						children: "🔒 Reveal assessment questions"
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [dayProblems.filter(Boolean).map((p) => /* @__PURE__ */ jsx(ProblemCard, {
						problem: p,
						onOpen: onOpenVideo,
						chip: p.sourceSheet === "Basic DSA" ? "Basic" : p.sourceSheet === "Advanced DSA" ? "Advanced" : p.sourceSheet === "Dynamic Programming" ? "DP" : "Graphs"
					}, p.uid)), isAssessment && shown && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: `mdsa-wp-reveal-btn ${day.type}`,
						onClick: () => onReveal(plan.weekIdx, day.key),
						children: "🔀 Get new questions"
					})] })]
				})]
			}, day.key);
		})
	});
});
var topicColors = {
	Arrays: "#38bdf8",
	Strings: "#34d399",
	"Sliding Window": "#22d3ee",
	"Two Pointers": "#2dd4bf",
	"Prefix Sum": "#14b8a6",
	"Binary Search": "#f472b6",
	Sorting: "#60a5fa",
	Recursion: "#fb7185",
	Backtracking: "#fba74c",
	Greedy: "#eab308",
	"Bit Manipulation": "#a78bfa",
	Math: "#f59e0b",
	Stacks: "#f97316",
	Queues: "#fb923c",
	"Linked Lists": "#4ade80",
	Trees: "#84cc16",
	Tries: "#93c5fd",
	Heaps: "#c084fc",
	"Graph Traversal": "#f87171",
	"Graph Components": "#ef4444",
	"1D DP": "#818cf8",
	"2D DP": "#a855f7",
	"String DP": "#c084fc",
	"Grid DP": "#e879f9",
	"Knapsack DP": "#f472b6",
	"Partition DP": "#facc15",
	"DP on Trees": "#4ade80"
};
function DsaSheetPage({ sheetTitle = "Basic DSA", titleAccent = "A → Z", problems = dsaBasicProblems, introLink = googleSeriesIntro.videoLink, showWeeklyPlan = false, pageTheme = "basic" }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProblem, setSelectedProblem] = useState(null);
	const [selectedTopic, setSelectedTopic] = useState("All");
	const [selectedDifficulty, setSelectedDifficulty] = useState("All");
	const [weekOffset, setWeekOffset] = useState(0);
	const [assessmentReveal, setAssessmentReveal] = useState({});
	const carouselRef = useRef(null);
	const trackRef = useRef(null);
	const dragRef = useRef(null);
	const suppressClickRef = useRef(false);
	const settleRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [paneWidth, setPaneWidth] = useState(0);
	const topics = useMemo(() => ["All", ...Array.from(new Set(problems.map((p) => p.topic)))], [problems]);
	const easy = problems.filter((p) => p.difficulty === "Easy").length;
	const medium = problems.filter((p) => p.difficulty === "Medium").length;
	const hard = problems.filter((p) => p.difficulty === "Hard").length;
	const total = problems.length;
	const filtered = useMemo(() => {
		return problems.filter((p) => {
			const topicMatch = selectedTopic === "All" || p.topic === selectedTopic;
			const diffMatch = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
			return topicMatch && diffMatch;
		});
	}, [
		selectedTopic,
		selectedDifficulty,
		problems
	]);
	const topicOrder = useMemo(() => {
		return Array.from(new Set(problems.map((p) => p.topic)));
	}, [problems]);
	const filteredGroups = useMemo(() => {
		const groups = /* @__PURE__ */ new Map();
		for (const p of filtered) (groups.get(p.topic) || groups.set(p.topic, []).get(p.topic)).push(p);
		const ordered = [];
		for (const t of topicOrder) if (groups.has(t)) ordered.push({
			topic: t,
			color: topicColors[t] || "#60a5fa",
			problems: groups.get(t)
		});
		return ordered;
	}, [filtered, topicOrder]);
	const openVideo = useCallback((problem) => {
		setSelectedProblem(problem);
		setModalOpen(true);
	}, []);
	const closeVideo = useCallback(() => {
		setSelectedProblem(null);
		setModalOpen(false);
	}, []);
	const weeklyPlan = useMemo(() => showWeeklyPlan ? buildWeeklyPlan(problems, weekOffset) : null, [
		showWeeklyPlan,
		problems,
		weekOffset
	]);
	const rollAssessment = useCallback((weekIdx, key) => {
		const nonce = Math.floor(Math.random() * 1e9) + 1;
		setAssessmentReveal((prev) => {
			const weekAll = prev?.[weekIdx] || HIDDEN_WEEK;
			return {
				...prev,
				[weekIdx]: {
					...weekAll,
					[key]: {
						shown: true,
						nonce
					}
				}
			};
		});
	}, []);
	const planMinOffset = weeklyPlan ? weeklyPlan.minOffset : 0;
	const paneOffsets = useMemo(() => {
		if (!weeklyPlan) return [];
		const first = Math.max(planMinOffset, weekOffset - 1);
		const offsets = [];
		for (let o = first; o <= weekOffset + 1; o += 1) offsets.push(o);
		return offsets;
	}, [
		weeklyPlan,
		weekOffset,
		planMinOffset
	]);
	const panePlans = useMemo(() => {
		if (!weeklyPlan) return [];
		return paneOffsets.map((offset) => ({
			offset,
			plan: offset === weekOffset ? weeklyPlan : buildWeeklyPlan(problems, offset)
		}));
	}, [
		weeklyPlan,
		paneOffsets,
		weekOffset,
		problems
	]);
	const currentPaneIndex = Math.max(0, paneOffsets.indexOf(weekOffset));
	const weekChoices = useMemo(() => weeklyPlan ? weekPickerOptions(problems, planMinOffset, weekOffset) : [], [
		weeklyPlan,
		problems,
		planMinOffset,
		weekOffset
	]);
	const goToWeek = useCallback((offset) => setWeekOffset(Math.max(offset, planMinOffset)), [planMinOffset]);
	const onCarouselKeyDown = useCallback((e) => {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			goToWeek(weekOffset - 1);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			goToWeek(weekOffset + 1);
		} else if (e.key === "Home") {
			e.preventDefault();
			goToWeek(0);
		}
	}, [goToWeek, weekOffset]);
	useLayoutEffect(() => {
		const el = carouselRef.current;
		if (!el) return void 0;
		const measure = () => setPaneWidth(el.clientWidth);
		measure();
		if (typeof ResizeObserver === "undefined") return void 0;
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [weeklyPlan]);
	useLayoutEffect(() => {
		const track = trackRef.current;
		if (!track || paneWidth <= 0) return;
		track.style.transition = "none";
		track.style.transform = `translate3d(${-currentPaneIndex * paneWidth}px, 0, 0)`;
	}, [
		currentPaneIndex,
		paneWidth,
		panePlans
	]);
	useLayoutEffect(() => () => {
		if (settleRef.current) settleRef.current();
		if (dragRef.current && dragRef.current.teardown) dragRef.current.teardown();
		dragRef.current = null;
	}, []);
	const onCarouselPointerDown = useCallback((e) => {
		const track = trackRef.current;
		if (!track || paneWidth <= 0 || paneOffsets.length < 2) return;
		if (e.pointerType === "mouse" && e.button !== 0) return;
		if (dragRef.current) return;
		if (settleRef.current) settleRef.current();
		suppressClickRef.current = false;
		const index = currentPaneIndex;
		const gesture = {
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			lastX: e.clientX,
			lastAt: e.timeStamp || performance.now(),
			dx: 0,
			velocity: 0,
			moved: false
		};
		const place = (px) => {
			track.style.transform = `translate3d(${px}px, 0, 0)`;
		};
		const settle = (targetIndex) => {
			const commit = () => {
				const offset = paneOffsets[targetIndex];
				if (offset !== void 0 && offset !== weekOffset) setWeekOffset(offset);
			};
			if (prefersReducedMotion()) {
				settleRef.current = null;
				track.style.transition = "none";
				place(-targetIndex * paneWidth);
				commit();
				return;
			}
			let done = false;
			const finish = (ev) => {
				if (done) return;
				if (ev && (ev.target !== track || ev.propertyName !== "transform")) return;
				done = true;
				track.removeEventListener("transitionend", finish);
				window.clearTimeout(timer);
				settleRef.current = null;
				commit();
			};
			track.style.transition = `transform ${SNAP_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
			place(-targetIndex * paneWidth);
			track.addEventListener("transitionend", finish);
			const timer = window.setTimeout(finish, 430);
			settleRef.current = () => {
				if (done) return;
				done = true;
				track.removeEventListener("transitionend", finish);
				window.clearTimeout(timer);
				settleRef.current = null;
			};
		};
		const move = (ev) => {
			if (ev.pointerId !== gesture.pointerId) return;
			const dx = ev.clientX - gesture.startX;
			const dy = ev.clientY - gesture.startY;
			if (!gesture.moved) {
				if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) <= Math.abs(dy)) return;
				gesture.moved = true;
				suppressClickRef.current = true;
				setIsDragging(true);
				track.style.transition = "none";
			}
			const now = ev.timeStamp || performance.now();
			gesture.velocity = (ev.clientX - gesture.lastX) / Math.max(now - gesture.lastAt, 1);
			gesture.lastX = ev.clientX;
			gesture.lastAt = now;
			gesture.dx = dx;
			const hasNeighbour = dx < 0 ? index < paneOffsets.length - 1 : index > 0;
			place(-index * paneWidth + (hasNeighbour ? dx : dx * OVERDRAG_DAMPING));
		};
		function teardown() {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onCancel);
			window.removeEventListener("blur", onWindowBlur);
			if (dragRef.current === gesture) dragRef.current = null;
		}
		function end(ev, aborted) {
			if (ev && ev.pointerId !== gesture.pointerId) return;
			teardown();
			if (!gesture.moved) return;
			setIsDragging(false);
			settle(aborted ? index : resolveSwipeTarget(index, gesture.dx, gesture.velocity, paneWidth, paneOffsets.length));
		}
		function onUp(ev) {
			end(ev, false);
		}
		function onCancel(ev) {
			end(ev, true);
		}
		function onWindowBlur() {
			end(null, true);
		}
		gesture.teardown = teardown;
		dragRef.current = gesture;
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onCancel);
		window.addEventListener("blur", onWindowBlur);
	}, [
		currentPaneIndex,
		paneOffsets,
		paneWidth,
		weekOffset
	]);
	const onCarouselClickCapture = useCallback((e) => {
		if (!suppressClickRef.current) return;
		suppressClickRef.current = false;
		e.preventDefault();
		e.stopPropagation();
	}, []);
	const onCarouselDragStart = useCallback((e) => e.preventDefault(), []);
	return /* @__PURE__ */ jsxs("div", {
		className: `mdsa-page mdsa-page-${pageTheme}${showWeeklyPlan ? " mdsa-page-weekly" : ""}`,
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "mdsa-hero",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/maang",
						className: "mdsa-back",
						children: "← Back to MAANG Preparation"
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "mdsa-stats",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mdsa-stat-card total",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-num",
									children: total
								}), /* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-label",
									children: "Total Problems"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mdsa-stat-card easy",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-num",
									children: easy
								}), /* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-label",
									children: "Easy"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mdsa-stat-card medium",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-num",
									children: medium
								}), /* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-label",
									children: "Medium"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mdsa-stat-card hard",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-num",
									children: hard
								}), /* @__PURE__ */ jsx("span", {
									className: "mdsa-stat-label",
									children: "Hard"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mdsa-hero-inner",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mdsa-hero-text",
							children: [/* @__PURE__ */ jsxs("h1", {
								className: "mdsa-title",
								children: [
									sheetTitle,
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "mdsa-title-accent",
										children: titleAccent
									})
								]
							}), /* @__PURE__ */ jsxs("p", {
								className: "mdsa-subtitle",
								children: [problems.length, " essential DSA problems. Watch video solutions in Telugu, solve on LeetCode / GeeksforGeeks."]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mdsa-hero-video",
							children: /* @__PURE__ */ jsxs("a", {
								className: "mdsa-intro-video",
								href: introLink,
								target: "_blank",
								rel: "noopener noreferrer",
								title: "Watch Google Crack Coding Series Intro",
								children: [
									/* @__PURE__ */ jsx("img", {
										className: "mdsa-intro-logo",
										src: youtube_logo_default,
										alt: "YouTube"
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "mdsa-video-text",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mdsa-video-label",
											children: "Watch Intro"
										}), /* @__PURE__ */ jsx("span", {
											className: "mdsa-video-sub",
											children: "Start here · 2 min"
										})]
									}),
									/* @__PURE__ */ jsx("span", {
										className: "mdsa-video-arrow",
										"aria-hidden": "true",
										children: "→"
									})
								]
							})
						})]
					})
				]
			}),
			weeklyPlan && /* @__PURE__ */ jsxs("section", {
				className: "mdsa-wp",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mdsa-wp-header",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "mdsa-section-title",
							"aria-live": "polite",
							children: ["Week ", weeklyPlan.weekNo]
						}), weekChoices.length > 1 && /* @__PURE__ */ jsxs("div", {
							className: "mdsa-wp-week-select",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mdsa-wp-week-select-label",
								"aria-hidden": "true",
								children: "Jump to week"
							}), /* @__PURE__ */ jsx("select", {
								className: "mdsa-wp-week-select-input",
								"aria-label": `Jump to week — currently week ${weeklyPlan.weekNo}`,
								value: weekOffset,
								onChange: (e) => goToWeek(Number(e.target.value)),
								children: weekChoices.map(({ weekNo, offset }) => /* @__PURE__ */ jsxs("option", {
									value: offset,
									children: [
										"Week ",
										weekNo,
										offset === 0 ? " · this week" : ""
									]
								}, weekNo))
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: `mdsa-wp-carousel${isDragging ? " is-dragging" : ""}`,
						ref: carouselRef,
						role: "group",
						"aria-roledescription": "carousel",
						"aria-label": `Weekly plan, week ${weeklyPlan.weekNo}`,
						tabIndex: 0,
						onKeyDown: onCarouselKeyDown,
						onPointerDown: onCarouselPointerDown,
						onClickCapture: onCarouselClickCapture,
						onDragStart: onCarouselDragStart,
						children: /* @__PURE__ */ jsx("div", {
							className: "mdsa-wp-track",
							ref: trackRef,
							children: panePlans.map(({ offset, plan }) => /* @__PURE__ */ jsx(WeekPane, {
								plan,
								problems,
								reveal: assessmentReveal[plan.weekIdx] || HIDDEN_WEEK,
								onOpenVideo: openVideo,
								onReveal: rollAssessment,
								isCurrent: offset === weekOffset
							}, offset))
						})
					}),
					weekOffset !== 0 && /* @__PURE__ */ jsx("p", {
						className: "mdsa-wp-note",
						children: "You're viewing a different week — pick any week from the list above, or drag the plan to the right (← / Home) to walk back to today."
					})
				]
			}),
			!showWeeklyPlan && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
				className: "mdsa-filters-section",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "mdsa-section-title",
					children: "📚 Problem Library"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mdsa-filter-bar",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mdsa-filter-group",
							children: [/* @__PURE__ */ jsx("label", { children: "Topic:" }), /* @__PURE__ */ jsx("select", {
								value: selectedTopic,
								onChange: (e) => setSelectedTopic(e.target.value),
								className: "mdsa-filter-select",
								children: topics.map((t) => /* @__PURE__ */ jsx("option", {
									value: t,
									children: t
								}, t))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mdsa-filter-group",
							children: [/* @__PURE__ */ jsx("label", { children: "Difficulty:" }), /* @__PURE__ */ jsx("div", {
								className: "mdsa-difficulty-chips",
								children: difficulties.map((d) => /* @__PURE__ */ jsx("button", {
									className: `mdsa-diff-chip ${selectedDifficulty === d ? "active" : ""} ${d.toLowerCase() === "easy" ? "easy" : d.toLowerCase() === "medium" ? "medium" : d.toLowerCase() === "hard" ? "hard" : ""}`,
									onClick: () => setSelectedDifficulty(d),
									children: d
								}, d))
							})]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "mdsa-filter-count",
							children: [filtered.length, " problems"]
						})
					]
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ jsx("section", {
				className: "mdsa-topics-grid",
				style: { "--topic-color": topicColors[selectedTopic] || "#60a5fa" },
				children: /* @__PURE__ */ jsx("div", {
					className: "mdsa-empty",
					children: "No problems match your filters. Try changing the topic or difficulty."
				})
			}) : selectedTopic === "All" ? /* @__PURE__ */ jsx("div", {
				className: "mdsa-category-groups",
				children: filteredGroups.map((grp) => /* @__PURE__ */ jsxs("section", {
					className: "mdsa-category-group",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mdsa-category-heading",
						style: { "--cat-color": grp.color },
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mdsa-category-tile",
								style: {
									background: `linear-gradient(135deg, ${grp.color}, color-mix(in srgb, ${grp.color} 60%, #000000))`,
									boxShadow: `0 6px 18px color-mix(in srgb, ${grp.color} 50%, transparent), inset 0 1px 0 rgba(255,255,255,0.35)`
								},
								"aria-hidden": "true",
								children: grp.topic.charAt(0).toUpperCase()
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mdsa-category-title",
								children: grp.topic
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "mdsa-category-count",
								children: [
									grp.problems.length,
									" problem",
									grp.problems.length === 1 ? "" : "s"
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "mdsa-topics-grid",
						style: { "--topic-color": grp.color },
						children: grp.problems.map((p) => /* @__PURE__ */ jsx(ProblemCard, {
							problem: p,
							onOpen: openVideo
						}, p.id))
					})]
				}, grp.topic))
			}) : /* @__PURE__ */ jsx("section", {
				className: "mdsa-topics-grid",
				style: { "--topic-color": topicColors[selectedTopic] || "#60a5fa" },
				children: filtered.map((p) => /* @__PURE__ */ jsx(ProblemCard, {
					problem: p,
					onOpen: openVideo
				}, p.id))
			})] }),
			/* @__PURE__ */ jsx(VideoPlayerModal, {
				isOpen: modalOpen,
				onClose: closeVideo,
				videoUrl: selectedProblem?.videoLink || "",
				title: selectedProblem?.title || "",
				description: selectedProblem?.description || ""
			})
		]
	});
}
//#endregion
//#region src/maang/weekly/MaangWeeklyPreparation.jsx
var ALL_PROBLEMS = [
	{
		name: "Basic DSA",
		prefix: "b",
		problems: dsaBasicProblems
	},
	{
		name: "Advanced DSA",
		prefix: "a",
		problems: [
			{
				id: 97,
				title: "Largest Rectangle in Histogram",
				topic: "Stacks",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 98,
				title: "Longest Valid Parentheses",
				topic: "Stacks",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/longest-valid-parentheses/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 99,
				title: "Insert an Element at the Bottom of a Stack",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/insert-an-element-at-the-bottom-of-a-stack/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 100,
				title: "Reverse a Stack",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/reverse-a-stack-using-recursion/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 101,
				title: "Next Greater Element",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/next-greater-element/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 102,
				title: "Previous Greater Element",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/previous-greater-element/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 103,
				title: "Smaller on Left",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/smaller-on-left/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 104,
				title: "Next Smaller Element",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/next-smaller-element/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 105,
				title: "Stock Span Problem",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/the-stock-span-problem/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 106,
				title: "Min Stack",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/min-stack/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 107,
				title: "Evaluate Reverse Polish Notation",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 108,
				title: "Daily Temperatures",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/daily-temperatures/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 109,
				title: "Expression Contains Redundant Bracket",
				topic: "Stacks",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/expression-contains-redundant-bracket-or-not/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 110,
				title: "Merge k Sorted Lists",
				topic: "Linked Lists",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/merge-k-sorted-lists/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 111,
				title: "Middle of the Linked List",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/middle-of-the-linked-list/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 112,
				title: "Linked List Cycle",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/linked-list-cycle/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 113,
				title: "Reverse Linked List",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/reverse-linked-list/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 114,
				title: "Remove Nth Node From End of List",
				topic: "Linked Lists",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 115,
				title: "Palindrome Linked List",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/palindrome-linked-list/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 116,
				title: "Linked List Cycle II",
				topic: "Linked Lists",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/linked-list-cycle-ii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 117,
				title: "Intersection of Two Linked Lists",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 118,
				title: "Reverse Linked List II",
				topic: "Linked Lists",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/reverse-linked-list-ii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 119,
				title: "Sort List",
				topic: "Linked Lists",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/sort-list/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 120,
				title: "Convert Binary Number in a Linked List to Integer",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 121,
				title: "Remove Linked List Elements",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/remove-linked-list-elements/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 122,
				title: "Delete Node in a Linked List",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 123,
				title: "Merge Two Sorted Lists",
				topic: "Linked Lists",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/merge-two-sorted-lists/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 124,
				title: "Binary Tree Preorder Traversal",
				topic: "Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 125,
				title: "Binary Tree Inorder Traversal",
				topic: "Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 126,
				title: "Binary Tree Postorder Traversal",
				topic: "Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 127,
				title: "Maximum Depth of Binary Tree",
				topic: "Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 128,
				title: "Binary Tree Right Side View",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/binary-tree-right-side-view/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 129,
				title: "Insert into a Binary Search Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 130,
				title: "Validate Binary Search Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/validate-binary-search-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 131,
				title: "Lowest Common Ancestor of a Binary Search Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 132,
				title: "Search in a Binary Search Tree",
				topic: "Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 133,
				title: "Top View of Binary Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/top-view-of-a-binary-tree/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 134,
				title: "Bottom View of Binary Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/bottom-view-of-a-binary-tree/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 135,
				title: "Left View of Binary Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/left-view-of-a-binary-tree/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 136,
				title: "Right View of Binary Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/right-view-of-a-binary-tree/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 137,
				title: "Tree Boundary Traversal",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 138,
				title: "Binary Tree Zigzag Level Order Traversal",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 139,
				title: "Diameter of a Binary Tree",
				topic: "Trees",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/diameter-of-a-binary-tree/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 140,
				title: "Invert Binary Tree",
				topic: "Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/invert-binary-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 141,
				title: "Implement Trie (Prefix Tree)",
				topic: "Tries",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 142,
				title: "Implement Trie II",
				topic: "Tries",
				difficulty: "Medium",
				link: "https://www.naukri.com/code360/problems/implement-trie-ll_8230840?challengeSlug=coding-interview-prep",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 143,
				title: "Design Add and Search Words Data Structure",
				topic: "Tries",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 144,
				title: "Prefix and Suffix Search",
				topic: "Tries",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/prefix-and-suffix-search/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 145,
				title: "Number of Distinct Substrings in a String",
				topic: "Tries",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 146,
				title: "Count Distinct Substrings",
				topic: "Tries",
				difficulty: "Medium",
				link: "https://www.naukri.com/code360/problems/count-distinct-substrings_985286",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 147,
				title: "Find Shortest Unique Prefix for Every Word",
				topic: "Tries",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/find-shortest-unique-prefix-for-every-word-in-a-given-list/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 148,
				title: "Find Median from Data Stream",
				topic: "Heaps",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/find-median-from-data-stream/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 149,
				title: "Find K Pairs with Smallest Sums",
				topic: "Heaps",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 150,
				title: "Find the Kth Smallest Sum of a Matrix With Sorted Rows",
				topic: "Heaps",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 151,
				title: "Kth Largest Element in an Array",
				topic: "Heaps",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 152,
				title: "Kth Largest Element in a Stream",
				topic: "Heaps",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 153,
				title: "Minimum Cost of Ropes",
				topic: "Heaps",
				difficulty: "Easy",
				link: "https://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/",
				platform: "gfg",
				videoLink: null
			}
		]
	},
	{
		name: "Dynamic Programming",
		prefix: "dp",
		problems: [
			{
				id: 1,
				title: "Climbing Stairs",
				topic: "1D DP",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/climbing-stairs/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 2,
				title: "House Robber",
				topic: "1D DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/house-robber/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 3,
				title: "House Robber II",
				topic: "1D DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/house-robber-ii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 4,
				title: "Friends Pairing Problem",
				topic: "1D DP",
				difficulty: "Medium",
				link: "https://www.geeksforgeeks.org/friends-pairing-problem/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 5,
				title: "Fibonacci Number",
				topic: "1D DP",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/fibonacci-number/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 6,
				title: "Unique Paths",
				topic: "Grid DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/unique-paths/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 7,
				title: "Unique Paths II",
				topic: "Grid DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/unique-paths-ii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 8,
				title: "Minimum Path Sum",
				topic: "Grid DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/minimum-path-sum/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 9,
				title: "Dungeon Game",
				topic: "Grid DP",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/dungeon-game/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 10,
				title: "01 Matrix",
				topic: "Grid DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/01-matrix/",
				platform: "leetcode",
				videoLink: "https://www.youtube.com/watch?v=ZTAseawuRpc"
			},
			{
				id: 11,
				title: "Decode Ways",
				topic: "String DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/decode-ways/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 12,
				title: "Distinct Subsequences",
				topic: "String DP",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/distinct-subsequences/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 13,
				title: "Coin Change",
				topic: "Knapsack DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/coin-change/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 14,
				title: "Coin Change II",
				topic: "Knapsack DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/coin-change-ii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 15,
				title: "Target Sum",
				topic: "Knapsack DP",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/target-sum/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 16,
				title: "Burst Balloons",
				topic: "Partition DP",
				difficulty: "Hard",
				link: "https://leetcode.com/problems/burst-balloons/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 17,
				title: "Sum Root to Leaf Numbers",
				topic: "DP on Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 18,
				title: "Path Sum",
				topic: "DP on Trees",
				difficulty: "Easy",
				link: "https://leetcode.com/problems/path-sum/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 19,
				title: "Path Sum II",
				topic: "DP on Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/path-sum-ii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 20,
				title: "Path Sum III",
				topic: "DP on Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/path-sum-iii/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 21,
				title: "Lowest Common Ancestor of a Binary Tree",
				topic: "DP on Trees",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
				platform: "leetcode",
				videoLink: null
			}
		]
	},
	{
		name: "Graphs",
		prefix: "g",
		problems: [
			{
				id: 1,
				title: "BFS of Graph",
				topic: "Graph Traversal",
				difficulty: "Easy",
				link: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 2,
				title: "DFS of Graph",
				topic: "Graph Traversal",
				difficulty: "Easy",
				link: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
				platform: "gfg",
				videoLink: null
			},
			{
				id: 3,
				title: "Count the Number of Complete Components",
				topic: "Graph Components",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/count-the-number-of-complete-components/",
				platform: "leetcode",
				videoLink: null
			},
			{
				id: 4,
				title: "Number of Provinces",
				topic: "Graph Components",
				difficulty: "Medium",
				link: "https://leetcode.com/problems/number-of-provinces/",
				platform: "leetcode",
				videoLink: null
			}
		]
	}
].flatMap(({ name, prefix, problems }) => problems.map((p) => ({
	...p,
	uid: `${prefix}-${p.id}`,
	sourceSheet: name
})));
function MaangWeeklyPreparation() {
	return /* @__PURE__ */ jsx(DsaSheetPage, {
		sheetTitle: "Weekly Preparation",
		titleAccent: "Complete DSA Track",
		problems: ALL_PROBLEMS,
		introLink: googleSeriesIntro.videoLink,
		showWeeklyPlan: true,
		pageTheme: "weekly"
	});
}
//#endregion
//#region scripts/.tmp-ssr-entry.jsx
var render = () => renderToString(/* @__PURE__ */ jsx(MemoryRouter, {
	initialEntries: ["/maang/weekly-preparation"],
	children: /* @__PURE__ */ jsx(MaangWeeklyPreparation, {})
}));
var bad = 0;
var check = (n, ok, d = "") => {
	if (ok) console.log(`  ✅ ${n}`);
	else {
		bad += 1;
		console.error(`  ❌ ${n} ${d}`);
	}
};
var strip = (s) => s.replace(/<!--[\s\S]*?-->/g, "");
function picker(html) {
	const wrap = html.match(/<div class="mdsa-wp-week-select">[\s\S]*?<\/div>/);
	const sel = html.match(/<select[^>]*class="mdsa-wp-week-select-input"[^>]*>/);
	const opts = html.match(/<option[\s\S]*?<\/option>/g) || [];
	const text = (o) => strip(o.replace(/<option[^>]*>|<\/option>/g, "")).trim();
	const chosen = opts.find((o) => /\sselected(=|>|\s)/.test(o));
	return {
		wrap: wrap ? strip(wrap[0]) : "(no picker)",
		selectTag: sel ? sel[0] : "(no select)",
		count: opts.length,
		first: opts.length ? text(opts[0]) : "",
		last: opts.length ? text(opts[opts.length - 1]) : "",
		selected: chosen ? text(chosen) : "(none)"
	};
}
function startWeeksAgo(weeks) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - (d.getDay() + 6) % 7 - weeks * 7);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}
console.log("\nA) fresh learner (Week 1)");
var a = picker(render());
check("no <label> wrapper (the click dead zone)", !a.wrap.includes("<label"));
check("pill is a plain div with the decorative text", a.wrap.includes("Jump to week"));
check("control is the invisible select", /class="mdsa-wp-week-select-input"/.test(a.selectTag));
check("select carries an aria-label naming the week", /aria-label="Jump to week — currently week 1"/.test(a.selectTag), a.selectTag);
check("decorative text is aria-hidden", /class="mdsa-wp-week-select-label" aria-hidden="true"|aria-hidden="true" class="mdsa-wp-week-select-label"/.test(a.wrap));
check("18 weeks offered", a.count === 18, `got ${a.count}`);
check("lists Week 1 → Week 18", a.first === "Week 1 · this week" && a.last === "Week 18", `${a.first} .. ${a.last}`);
check("Week 1 selected", a.selected === "Week 1 · this week", a.selected);
check("no stale hint classes", !/mdsa-wp-drag|mdsa-wp-weekbar/.test(a.wrap));
console.log(`     ${a.wrap.replace(/\s+/g, " ").trim().slice(0, 240)}`);
console.log("\nB) learner on Week 5 (started 4 weeks ago)");
var store = /* @__PURE__ */ new Map();
globalThis.window = {
	localStorage: {
		getItem: (k) => store.has(k) ? store.get(k) : null,
		setItem: (k, v) => store.set(k, String(v))
	},
	matchMedia: () => ({ matches: false })
};
store.set("maang-wp-start-monday", String(startWeeksAgo(4)));
var b = picker(render());
check("aria-label says week 5", /currently week 5/.test(b.selectTag), b.selectTag);
check("Week 5 selected in the list", b.selected === "Week 5 · this week", b.selected);
check("Week 1 still one pick away", b.first === "Week 1", b.first);
console.log(bad === 0 ? "\n🎉 SSR CHECK PASSED" : `\n💥 ${bad} SSR CHECK(S) FAILED`);
process.exit(bad === 0 ? 0 : 1);
//#endregion
export {};
