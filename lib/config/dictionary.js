exports.wfFormField = {
  id: 'DSFIELDNAME',
  label: 'DSFIELDLABEL',
  required: 'STREQUIRED',
  attrs: 'DSACTIONSCRIPT',
  group: 'CODFIELDGROUP'
}

exports.codFieldType = {
  Text: 1,
  Textarea: 2,
  Date: 10
}

exports.fieldTypes = {
  Text: {
    CODFIELDTYPE: 1,
    CODDATA: 45,
    CODFIELDFORMAT: 1,
    DSFIELDTYPENAME: 'Texto'
  },
  Textarea: {
    CODFIELDTYPE: 2,
    CODDATA: 110,
    CODFIELDFORMAT: 4,
    DSFIELDTYPENAME: 'Área de Texto'
  },
  Date: {
    CODFIELDTYPE: 10,
    CODDATA: 229,
    CODFIELDFORMAT: 9,
    DSFIELDTYPENAME: 'Data'
  }
}

exports.fieldFormats = {
  Text: {
    DSFIELDFORMAT: 'TEXTO',
    DSFIELDFORMATALIAS: 'TEXT',
    CODFIELDFORMAT: 1
  },
  Textarea: {
    DSFIELDFORMAT: 'ÁREA DE TEXTO',
    DSFIELDFORMATALIAS: 'TEXTAREA',
    CODFIELDFORMAT: 4
  },
  Date: {
    DSFIELDFORMAT: 'DATA',
    DSFIELDFORMATALIAS: 'DATA',
    CODFIELDFORMAT: 9
  }
}
