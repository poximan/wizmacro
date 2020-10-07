exports.ordenar = (splits, cb) => {

  splits.macros_ord = splits.macros_arr.sort((a, b) => {

    if ( a.substring([2]) > b.substring([2]) ) { return 1;  }
    if ( a.substring([2]) < b.substring([2]) ) { return -1; }
    return 0;
  });

  cb(splits.macros_ord)
}

/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr : string,
  macros_ord : string
}
*/

console.log("ORDENADOR: modulo cargado");
