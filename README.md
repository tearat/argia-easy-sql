# Argia easy SQL converter

Alternative query syntax that converts to raw SQL

## Usage

```js
const argia = require("argia")

const sql = argia("users(id,title,age)") // SELECT id, title, age FROM users
const rows = await adapter.query(sql)
```

## Examples

### Select

| Argia SQL | SQL |
| ------ | ------ |
| users(*) | SELECT * FROM users |
| users(id,title,age) | SELECT id, title, age FROM users |
| users(id,title,age){3} | SELECT id, title, age FROM users LIMIT 3 |
| users(id,title,age){3,1}<title> | SELECT id, title, age FROM users ORDER BY title LIMIT 3 OFFSET 1 |
| users(id,title,age){3,1}<-age> | SELECT id, title, age FROM users ORDER BY age DESC LIMIT 3 OFFSET 1 |

### Insert

| Argia SQL | SQL |
| ------ | ------ |
| ('John Doe'\|33)>users(name, age) | INSERT INTO users (name, age) VALUES ('John Doe', 33) |
