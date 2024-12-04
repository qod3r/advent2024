package main

import (
	"advent2024/utils"
	"fmt"
	"regexp"
	"strconv"
)

const INPUTFILE string = "input.txt"

func solve(s string) int {
	res := 0

	// r, _ := regexp.Compile(`mul\((\d{1,3}),(\d{1,3})\)`)
	r, _ := regexp.Compile(`mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)`)
	matches := r.FindAllStringSubmatch(s, -1)

	do := true
	for _, match := range matches {
		// fmt.Printf("%v %T \n", match[0], match[0])
		if match[0] == "don't()" {
			do = false
			continue
		} else if match[0] == "do()" {
			do = true
		}

		if !do {
			// fmt.Println("skipping")
			continue
		}

		n1, _ := strconv.Atoi(match[1])
		n2, _ := strconv.Atoi(match[2])

		res += n1 * n2
	}

	return res
}

func main() {
	s, err := utils.ReadString(INPUTFILE)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(solve(s))
}
