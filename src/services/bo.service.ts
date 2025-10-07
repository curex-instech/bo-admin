import { ITEMS_PER_PAGE } from 'src/_shared/constants';
import { request } from 'src/_shared/request';
import { SaleAchievementStatus } from 'src/constants/enums';
import type { Permission } from 'src/models';

export async function getPermissions() {
  const res = await request.get<Permission[]>('/api/bo/permission/');
  return res.data;
}

export async function getSales(filterParams?: {
  companyId?: number;
  email?: string;
  fullName?: string;
  status?: SaleAchievementStatus;
  pageSize?: number;
  pageNumber?: number;
}) {
  const params: Record<string, string | number> = {};
  if (filterParams?.companyId) params.company_id = filterParams.companyId;
  if (filterParams?.email) params.email = filterParams.email;
  if (filterParams?.fullName) params.full_name = filterParams.fullName;
  if (filterParams?.status) params.status = filterParams.status;
  params.page_number = filterParams?.pageNumber || 1;
  params.page_size = filterParams?.pageSize || ITEMS_PER_PAGE;

  const { data } = await request.get('/api/bo/sales/', { params });

  return {
    data: data.results || [],
    totalRecords: data.count || 0,
  };
}

export async function approveSaleAchievement(id: number) {
  const params = {
    status: SaleAchievementStatus.Verified,
  };
  const res = await request.put(`/api/bo/sale-achievement/${id}/verify/`, {
    ...params,
  });
  return res.data;
}

export async function rejectSaleAchievement(id: number, rejectReason: string) {
  const params = {
    status: SaleAchievementStatus.Rejected,
    rejected_reason: rejectReason,
  };
  const res = await request.put(`/api/bo/sale-achievement/${id}/verify/`, {
    ...params,
  });
  return res.data;
}
