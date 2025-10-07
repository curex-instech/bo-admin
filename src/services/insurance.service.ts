import { request } from 'src/_shared/request';
import type { InsuranceCompany } from 'src/models/insurance-company';

export async function getInsuranceCompanies() {
  const res = await request.get<InsuranceCompany[]>('/api/insurance/company/');

  return res.data;
}
