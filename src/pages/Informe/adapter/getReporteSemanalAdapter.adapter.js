import { getReporteSemanal } from '../services/ReporteSemanal.service.js'

export const mesMap = {
  SEMANA: 'semana',
  CONTROL_INICIAL: 'controlInicial',
  CONTROL_FINAL: 'controlFinal',
  TOTAL: 'total'
}
export const reporteSemanalMap = {
  ID: 'id',
  NAME: 'name',
  MES: 'mes',
  TOTAL: 'total'
}

function adaptedMes (item) {
  return item.mes?.map((mes) => ({
    [mesMap.SEMANA]: mes.semana,
    [mesMap.CONTROL_INICIAL]: mes.inicia,
    [mesMap.CONTROL_FINAL]: mes.termina,
    [mesMap.TOTAL]: mes.total
  }))
}

function getTotal (item) {
  return item?.mes?.reduce((acc, mes) => acc + Number(mes.total), 0)
}

export async function getReporteSemanalAdapter ({ month, year }) {
  const res = await getReporteSemanal({ month, year })
  const dataGrafica = res.data.data
  const graficaAdapted = dataGrafica.map((item) => ({
    [reporteSemanalMap.ID]: item.idcliente,
    [reporteSemanalMap.NAME]: item.cliente,
    [reporteSemanalMap.MES]: adaptedMes(item),
    [reporteSemanalMap.TOTAL]: getTotal(item)
  }))
  return graficaAdapted
}
