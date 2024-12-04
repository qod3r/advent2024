package utils

import (
	"bufio"
	"os"
	"strconv"
	"strings"
)

// ReadInts reads whitespace-separated ints from r. If there's an error, it
// returns the ints successfully read so far as well as the error value.
func ReadInts(name string) ([]int, error) {
	r, err := os.Open(name)
	if err != nil {
		return nil, err
	}
	defer r.Close()

	scanner := bufio.NewScanner(r)
	scanner.Split(bufio.ScanWords)
	var result []int
	for scanner.Scan() {
		x, err := strconv.Atoi(scanner.Text())
		if err != nil {
			return result, err
		}
		result = append(result, x)
	}
	return result, scanner.Err()
}

func ReadIntLines(name string) ([][]int, error) {
	r, err := os.Open(name)
	if err != nil {
		return nil, err
	}
	defer r.Close()

	scanner := bufio.NewScanner(r)
	scanner.Split(bufio.ScanLines)
	var result [][]int
	for scanner.Scan() {
		line := scanner.Text()
		chars := strings.Split(line, " ")
		arr := []int{}

		for _, s := range chars {
			x, err := strconv.Atoi(s)
			if err != nil {
				return result, err
			}
			arr = append(arr, x)
		}
		result = append(result, arr)
	}
	return result, scanner.Err()
}

func ReadString(name string) (string, error) {
	r, err := os.ReadFile(name)
	if err != nil {
		return "", err
	}

	return string(r), err
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
