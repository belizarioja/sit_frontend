import { getDataFacturas } from '../services/FacturasNum.service.js'

export const loteMap = {
  ABREV: 'abrev',
  CEDULACLIENTE: 'cedulacliente',
  NOMBRECLIENTE: 'nombrecliente',
  TIPODOCUMENTO: 'tipodocumento',
  NUMERODOCUMENTO: 'numerodocumento',
  NUMEROINTERNO: 'numerointerno',
  FECHA: 'fecha'
}
export async function getDataFacturasNumAdapter (body) {
  const res = await getDataFacturas(body)
  const dataLote = res.data.data
  const loteAdapted = dataLote.map((item) => ({
    [loteMap.ABREV]: item.abrev,
    [loteMap.CEDULACLIENTE]: item.cedulacliente,
    [loteMap.NOMBRECLIENTE]: item.nombrecliente,
    [loteMap.TIPODOCUMENTO]: item.tipodocumento,
    [loteMap.NUMERODOCUMENTO]: item.numerodocumento,
    [loteMap.NUMEROINTERNO]: item.numerointerno,
    [loteMap.FECHA]: item.fecha
  }))
  return loteAdapted
}
