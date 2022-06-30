import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js';
// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const preproductionVariables = {
  baseUrl: 'https://api.preproduction.smartsari.com'
}

const productionVariables = {
  baseUrl: 'https://api.smartsari.com',
  phoneNumber: '+639690399737',
  otpNumber: '37118'
}

export const variables = __ENV.environment == 'production' ? productionVariables : preproductionVariables

export const session = new Httpx({
  baseURL: variables.baseUrl
});

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
