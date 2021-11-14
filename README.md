# EasySQL converter

Alternative query syntax that converts to raw SQL

## Examples

| easySQL | SQL |
| ------ | ------ |
| users(id,title,age) | SELECT id,title,age FROM users |
| users(id,title,age){3} | SELECT id,title,age FROM users LIMIT 3 |
| users(id,title,age){3,1}<title> | SELECT id,title,age FROM users ORDER BY title LIMIT 3 OFFSET 1 |
| users(id,title,age){3,1}<-age> | SELECT id,title,age FROM users ORDER BY age DESC LIMIT 3 OFFSET 1 |
