# Choosing the Right Back-End Language: TypeScript, Go, or Rust for Your Greenfield Project

## Go

### Project init

```sh
go version
go mod init github.com/mariolazzari/choosing-backend/go/hello
go run main.go
go run .
go build main.go
```

### Pros

- Powerful concurreny
- Simple
- Rich standard library
- Performant

### Cons

- No OOP
- Verbose error handling
- Garbage collector
- No gui libraries

## Rust

### Project init

```sh
cargo init
cargo build --release 
```

### Pros

- Speed
- Memory

### Cons

- Ownership
- Concurrency
- Refactoring

## TypeScript

### Project init

```sh
bun index.ts
```

### Pros

- Collaboration
- Types
- Refactoring

### Cons
