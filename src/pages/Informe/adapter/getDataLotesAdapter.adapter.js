import { getDataLote } from '../services/Lotes.service.js'

export const loteMap = {
  IDSERVICIOSMASIVO: 'idserviciosmasivo',
  RIF: 'rif',
  CLIENTE: 'razonsocial',
  INICIA: 'inicia',
  TERMINA: 'termina',
  CANTIDAD: 'cantidad',
  UTILIZADO: 'utilizado',
  SOPORTE: 'soportefactura',
  FECHA: 'fecha',
  IDENTIFICADOR: 'identificador',
  CORELATIVO: 'corelativo'
}
export async function getDataLotesAdapter () {
  const body = {
    idtipodocumento: undefined,
    idserviciosmasivo: undefined,
    idcodigocomercial: undefined,
    estatus: 1
  }
  const res = await getDataLote(body)
  const dataLote = res.data.data
  const loteAdapted = dataLote.map((item) => ({
    [loteMap.IDSERVICIOSMASIVO]: item.idserviciosmasivo,
    [loteMap.RIF]: item.rif,
    [loteMap.CLIENTE]: item.razonsocial,
    [loteMap.INICIA]: item.inicia,
    [loteMap.TERMINA]: item.termina,
    [loteMap.CANTIDAD]: item.cantidad,
    [loteMap.UTILIZADO]: item.utilizado,
    [loteMap.SOPORTE]: item.soportefactura,
    [loteMap.FECHA]: item.fecha,
    [loteMap.IDENTIFICADOR]: item.identificador,
    [loteMap.CORELATIVO]: item.corelativo
  }))
  return loteAdapted
}
