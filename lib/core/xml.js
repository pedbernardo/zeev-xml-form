const { XMLBuilder } = require('fast-xml-parser')

/**
 * 🔑 Public API
 */

exports.build = function build (props, formFields) {
  const XmlFormField = new XMLBuilder({
    arrayNodeName: 'WFFORM_FIELD',
    attributesGroupName: 'props',
    suppressEmptyNode: true,
    format: true
  })

  const formFieldsNodes = XmlFormField.build(formFields)

  return createXml(props, formFieldsNodes)
}

/**
 * 🔒 Private Methods
 */

function createXml (props, formFieldsNodes) {
  return `<?xml version="1.0" encoding="utf-8"?>
<WFFLOW
  xmlns="http://www.cryo.com.br"
  DSMINVERSION="3.9.7272.26599"
  CODFLOW="${props.CODFLOW}"
  DSFLOWNAME="${props.DSFLOWNAME}"
  DSFLOWDESCRIPTION=""
  CODDATA="74222"
  CODPARENTFLOW=""
  CODFORM="${props.CODFORM}"
  NBFLOWVERSION="${props.VERSION}"
  STDEPLOY=""
  CODAREA=""
  STFLOWMESSAGE="S"
  STFLOWFILE="S"
  STFLOWHISTORY="S"
  STFLOWFORM=""
  DSLINK=""
  DSINBOXLAYOUT=""
  DSCUSTOMMESSAGE=""
  DSFLOWEMAIL=""
  CODFLOWUID="68488f31-a5db-41ac-ad32-4756886bac7a"
  NBDAYSHISTORY=""
  DTLASTDEPLOY=""
  DTLASTUNDEPLOY=""
  CODFORMDOCUMENTATION=""
  CODFLOWCATEGORY=""
  STSHOWCORESPONSABILE="S"
  STSHOWASKOPINION="S"
  STSHOWTAKEBACK="S"
  STPORTALSTART=""
  STPORTALDOCUMENTATION=""
  STDEPLOYMOBILE=""
  STPORTALREPORT=""
>
  <WFPOSITIONS />
  <WFFORM
    CODFORM="${props.CODFORM}"
    DSFORMNAME="${props.DSFORMNAME}"
    NBFORMVERSION="1"
    CODSTYLE="1"
    CODDATA="74215"
    DSXML="" CODPARENTFORM="" CODHEADER="" CODFOOTER="" DSFORMDESCRIPTION=""
    CODFORMCATEGORY="" CODFORMTYPE="" DSLAYOUT="" DSLAYOUTHEAD="" DSLAYOUTHEADREPORT="" DSTABLENAME="" DSJAVASCRIPT="" DSCSS=""
  >
    ${formFieldsNodes}
  </WFFORM>
  <WFFLOW_ELEMENTS />
  <WFFLOW_CONNECTIONS_ELEMENTS />
</WFFLOW>
`
}
