package main

import (
	"advent2024/utils"
	"fmt"
	"slices"
)

const INPUTFILE string = "input.txt"

func solve() (int, int, error) {
	ints, err := utils.ReadInts(INPUTFILE)
	if err != nil {
		return 0, 0, err
	}

	first := make([]int, 0, len(ints)/2)
	second := make([]int, 0, len(ints)/2)

	for i := 0; i < len(ints); i += 2 {
		first = append(first, ints[i])
		second = append(second, ints[i+1])
	}

	slices.Sort(first)
	slices.Sort(second)

	occurrences := map[int]int{}

	for _, v := range second {
		occurrences[v]++
	}

	sum1, sum2 := 0, 0
	for i := range first {
		sum1 += abs(first[i] - second[i])
		sum2 += first[i] * occurrences[first[i]]
	}

	return sum1, sum2, err
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	sum1, sum2, err := solve()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(sum1, sum2)
}
