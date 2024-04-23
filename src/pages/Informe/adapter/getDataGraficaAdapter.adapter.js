import { getDataGrafica } from '../services/Grafica.service.js'

export const graficaMap = {
  CANTIDAD: 'cantidad',
  MES: 'mes',
  TOTALIGTF: 'totaligtf',
  TOTALIVA: 'totaliva'
}
export async function getDataGraficaAdapter () {
  const body = {
    idtipodocumento: undefined,
    idserviciosmasivo: undefined,
    idcodigocomercial: undefined,
    estatus: 1
  }
  const res = await getDataGrafica(body)
  const dataGrafica = res.data.data
  const graficaAdapted = dataGrafica.map((item) => ({
    [graficaMap.MES]: item.mes,
    [graficaMap.CANTIDAD]: item.cantidad,
    [graficaMap.TOTALIGTF]: item.totaligtf,
    [graficaMap.TOTALIVA]: item.totaliva
  }))
  return graficaAdapted
}
