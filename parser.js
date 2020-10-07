const EXP_PREG = /^\d\d\d\s/gm;

exports.procesar = (entrada, cb) => {

  const i = entrada.indexOf('000');
  let splits = {
    encabezado: entrada.slice(0, i),
    macros_planas: entrada.slice(i + 4)
  }

  splits.macros_arr = splits.macros_planas.split(EXP_PREG)
  cb(splits)
}

console.log("PARSER: modulo cargado");
