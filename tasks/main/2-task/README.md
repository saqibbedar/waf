# WAF Task 2

This project contains the implementation of Task 2 divided modularly by parts.

## Getting Started

Install the required dependencies:

```bash
npm install
```

## Running the Tasks

All parts can be evaluated using the scripts configured in `package.json`:

### Part 1: IP Classification
```bash
npm run part1
```
Starts the server on `http://localhost:3000`. Open the URL in your browser; the homepage provides links to test all IP classification routes (`/api/employees/classA` through `classE`).

### Part 2: Programmatic Data Operations
```bash
npm run part2
```
Starts the server on `http://localhost:4000`. Open the URL in your browser to view and test all four programmatic operations (delete Class E, update Class D company, insert new employees, retrieve Class C).

### Part 3: Web Server & Logging
```bash
npm run part3
```
Starts the server on `http://localhost:5000`. The homepage guides through the available routes (`/users`, `/products`, `/books`, `/display`), appends visit records to `logs/log.txt`, and parses query parameters into their respective text files.

Queries are not mentioned on Homepage, you can try following queries or modify them with your desired data.

```txt
/products?id=89&title=Samsung&price=75K
/users?id=24&name=Abdullah&age=60&city=Islamabad&uni=QAU
books?id=19&title=AlgorithmDesignAndApplications&edition=3&2019&press=Wiley
```

### Part 4: Node.js Core & Validation
Part 4 is split into three standalone CLI scripts:
- **System Information & Path**:
  ```bash
  npm run part4
  ```
- **Name Capitalization Validation**:
  ```bash
  npm run part4-prompt
  ```
- **Email & IP Authentication**:
  ```bash
  npm run part4-ip
  ```

### Part 5: Local Network Chat
Run the receiver and sender in two separate terminal windows:
- **Terminal 1 (Receiver)**:
  ```bash
  npm run part5-r
  ```
- **Terminal 2 (Sender)**:
  ```bash
  npm run part5-s
  ```
Enter the target IP and message in the sender prompt. History is preserved in `logs/chat/history.txt`.

---

## Utility Scripts

- `npm run gen7k`: Extends Mockaroo's 1,000-row free limit to 7,000 unique records. Read `dataset/about-dataset.md` for full context.
- `npm test`: Development test runner.

---

## Folder Structure

```text
├── config/       # Centralized absolute paths used across all modules
├── dataset/      # Baseline JSON datasets and dataset documentation
├── logs/         # Generated output files (log.txt, chat history, IP lists)
├── scripts/      # Development utilities (e.g., make_it_7k.js)
├── src/
│   ├── part1/    # Part 1 implementation
│   ├── part2/    # Part 2 implementation
│   ├── part3/    # Part 3 implementation
│   ├── part4/    # Part 4 scripts (CLI, validation, IP checks)
│   ├── part5/    # Part 5 peer chat (receiver.js, sender.js)
│   └── utils/    # Reusable file system helpers (read, write, append)
└── package.json
```
