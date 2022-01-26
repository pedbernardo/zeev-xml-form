const fs = require('fs')
const colors = require('colors')
const config = require('../zeev-form-config')
const { parse } = require('./core/parser')
const { build } = require('./core/xml')

colors.enable()

function start () {
  const form = fs.createReadStream(config.entryFile)

  parse(form, formFields => {
    const xml = build(config, formFields)
    const filename = config.DSFLOWNAME.replace(/\s/g, '')
    const resultPath = `${config.exportPath}/${filename}.xml`

    if (!fs.existsSync(config.exportPath)) {
      fs.mkdirSync(config.exportPath)
    }

    fs.writeFileSync(resultPath, xml)
    console.log(`Checkout the generated XML: ${colors.cyan(resultPath)}`)
  })
}

start()
