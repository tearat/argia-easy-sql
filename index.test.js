const argia = require("./index")

const testCases = {
  selects: [
    {
      argia: "users(*)",
      raw: "SELECT * FROM users",
    },
    {
      argia: "users(id,title,age)",
      raw: "SELECT id, title, age FROM users",
    },
    {
      argia: "users(id,title,age){3}",
      raw: "SELECT id, title, age FROM users LIMIT 3",
    },
    {
      argia: "users(id,title,age){3,1}<title>",
      raw: "SELECT id, title, age FROM users ORDER BY title LIMIT 3 OFFSET 1",
    },
    {
      argia: "users(id,title,age){3,1}<-age>",
      raw: "SELECT id, title, age FROM users ORDER BY age DESC LIMIT 3 OFFSET 1",
    },
  ],
  inserts: [
    {
      argia: "('John Doe'|33)>users(name,age)",
      raw: "INSERT INTO users (name, age) VALUES ('John Doe', 33)",
    },
  ],
}

for (const [type, tests] of Object.entries(testCases)) {
  describe(`${type} cases`, () => {
    tests.map((testCase) =>
      test(`${testCase.argia} === ${testCase.raw}`, () => {
        expect(argia(testCase.argia)).toBe(testCase.raw)
      })
    )
  })
}
