package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
)

var count int
var mutex = &sync.Mutex{}

func increment(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s %s", r.Method, r.URL.Path)

	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()

	count++
	fmt.Fprintf(w, "count: %d", count)
}

func main() {
	http.HandleFunc("/", increment)
	http.ListenAndServe(":8080", nil)
}
