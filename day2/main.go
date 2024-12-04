package main

import (
	"advent2024/utils"
	"fmt"
)

const INPUTFILE string = "input.txt"

func validate(report []int) bool {
	asc, desc := false, false
	maxDiff := 0

	prevLevel := report[0]
	for _, level := range report[1:] {
		if prevLevel > level {
			asc = true
		} else {
			desc = true
		}

		diff := utils.Abs(level - prevLevel)

		if diff > maxDiff {
			maxDiff = diff
		}
		if diff == 0 {
			maxDiff = 0
			break
		}

		prevLevel = level
	}

	if (asc != desc) && (maxDiff <= 3) && (maxDiff >= 1) {
		return true
	}
	return false
}

func remove(slice []int, index int) []int {
	ret := make([]int, 0)
	ret = append(ret, slice[:index]...)
	return append(ret, slice[index+1:]...)
}

func part1(ints [][]int) (int, int) {
	sum1, sum2 := 0, 0

	for _, report := range ints {
		// fmt.Println("report", report)
		if validate(report) {
			sum1++
			sum2++
		} else {
			// fmt.Println("report failed")
			for i := 0; i < len(report); i++ {
				// fmt.Println("trying variant", remove(report, i))
				if validate(remove(report, i)) {
					sum2++
					break
				}
			}
		}
	}

	return sum1, sum2
}

func main() {
	ints, err := utils.ReadIntLines(INPUTFILE)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(part1(ints))
}
