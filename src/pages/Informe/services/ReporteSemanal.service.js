import axios from 'axios'
const config = require('../../../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export async function getReporteSemanal ({ month, year }) {
  const body = {
    mes: month,
    annio: year
  }
  const res = await axios.post(
    `${ENDPOINT_PATH_V2}reporte/totalsemanastodos`,
    body
  )
  return res
}
