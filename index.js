const selectRegex =
  /^(?<table>\w+)\((?<fields>[\w,\s\*]+)\)\{?(?<limit>\d+)?,?(?<offset>\d+)?\}?\<?(?<order>[-\w]+)?\>?$/
const insertRegex = /^\((?<values>.+)\)>(?<table>\w+)\((?<fields>[\w,]+)\)$/

const convert = (text) => {
  if (selectRegex.test(text)) {
    return select(text)
  } else if (insertRegex.test(text)) {
    return insert(text)
  } else {
    throw "Argia string is not correct"
  }
}

const select = (text) => {
  const { table, fields, limit, offset, order } = selectRegex.exec(text).groups
  if (!table) throw "table not provided"
  if (!fields) throw "fields not provided"

  const fildsFormatted = fields
    .split(",")
    .map((field) => field.trim())
    .join(", ")
  let sql = `SELECT ${fildsFormatted} FROM ${table}`

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

const insert = (text) => {
  const { values, table, fields } = insertRegex.exec(text).groups
  if (!values) throw "values not provided"
  if (!table) throw "table not provided"
  if (!fields) throw "fields not provided"

  const valuesArray = values.split(" | ")
  if (valuesArray.length != fields.split(",").length)
    throw "fields count not match"

  const sql = `INSERT INTO ${table} (${fields}) VALUES (${valuesArray.join(
    ","
  )})`

  return sql
}

module.exports = convert
