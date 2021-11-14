const selectRegex =
  /(?<table>\w+)\((?<fields>[\w,]+)\)\{?(?<limit>\d+)?,?(?<offset>\d+)?\}?\<?(?<order>[-\w]+)?\>?/

const convert = (input) => {
  const text = input.replace(" ", "")
  const isCorrect = selectRegex.test(text)
  if (!isCorrect) throw "String is not correct"

  const { table, fields, limit, offset, order } = selectRegex.exec(text).groups
  if (!table) throw "Table not provided"
  if (!fields) throw "Fields not provided"

  let sql = `SELECT ${fields} FROM ${table}`

  if (order) {
    const orderDesc = order[0] == "-"
    const orderSql = `ORDER BY ${orderDesc ? order.slice(1) : order}${
      orderDesc ? " DESC" : ""
    }`
    sql += ` ${orderSql}`
  }

  if (limit) sql += ` LIMIT ${limit}`

  if (offset) sql += ` OFFSET ${offset}`

  return sql
}

module.exports = convert
