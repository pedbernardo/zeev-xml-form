const csv = require('@fast-csv/parse')
const config = require('../../zeev-form-config')

const {
  wfFormField,
  codFieldType,
  fieldTypes,
  fieldFormats
} = require('../config/dictionary')

const {
  FORM_FIELD_DEFAULTS,
  FIELD_TYPE_DEFAULTS,
  FIELD_FORMAT_DEFAULTS
} = require('../config/props')

const formFields = []
const fieldGroups = {}

let codField = config.CODFIELD_START_AT
let codFieldGroup = config.CODFIELDGROUP_START_AT
let codData = config.CODDATA_START_AT

/**
 * 🔑 Public API
 */

exports.parse = function parse (readStream, callback) {
  readStream
    .pipe(csv.parse({ headers: true }))
    .on('error', console.error)
    .on('data', row => {
      formFields.push(
        parseField(row)
      )
    })
    .on('end', rowCount => {
      console.log('%d form fields parsed'.green, rowCount)
      callback(formFields)
    })
}

/**
 * 🔒 Private Methods
 */

function renamePropToXml (config, [key, value]) {
  const mappedKey = wfFormField[key]

  if (!mappedKey) return config

  return {
    ...config,
    [mappedKey]: value
  }
}

function parseField (field) {
  const fieldProps = Object.entries(field)
    .reduce(renamePropToXml, {})

  const xmlField = {
    props: {
      CODFIELD: codField,
      CODDATA: codData,
      CODFIELDTYPE: codFieldType[field.typeName] || 1,
      CODFORM: config.CODFORM,
      ...FORM_FIELD_DEFAULTS,
      ...fieldProps
    },
    WFFIELD_TYPE: parseFieldType(field.typeName),
    WFFIELD_GROUP: parseGroup(field.groupName)
  }

  codField++
  codData++

  return xmlField
}

function parseGroup (groupName) {
  if (!fieldGroups[groupName]) {
    fieldGroups[groupName] = {
      CODFIELDGROUP: codFieldGroup,
      DSFIELDGROUPNAME: groupName,
      CODFORM: config.CODFORM
    }
    codFieldGroup++
  }

  return {
    props: fieldGroups[groupName]
  }
}

function parseFieldType (typeName) {
  return {
    props: {
      ...FIELD_TYPE_DEFAULTS,
      ...(fieldTypes[typeName] || {})
    },
    WFFIELD_FORMAT: {
      props: {
        ...FIELD_FORMAT_DEFAULTS,
        ...(fieldFormats[typeName] || {})
      }
    }
  }
}
