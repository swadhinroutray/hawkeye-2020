package main

import (
	"fmt"

	"encoding/hex"

	"github.com/gorilla/securecookie"
)

//TODO: Makesure you understand what is going on here
func main() {
	hashKey, blockKey := securecookie.GenerateRandomKey(32), securecookie.GenerateRandomKey(32)
	fmt.Println()
	fmt.Println(fmt.Sprintf("HASH_KEY=%s", hex.EncodeToString(hashKey)))
	fmt.Println(fmt.Sprintf("BLOCK_KEY=%s", hex.EncodeToString(blockKey)))
}
