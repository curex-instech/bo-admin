import type { SaleAchievementStatus } from 'src/constants/enums';
import type { InsuranceCompany } from './insurance-company';

export interface SaleAchievement {
  id: number;
  achievement_name: string;
  achievement_icon_url: string;
  proof: string;
  status: SaleAchievementStatus;
  updated_by_id: number;
  created_at: string;
  updated_at: string;
}

export interface SaleInfo {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  logo: string;
  insurance_id: string;
  company: InsuranceCompany;
  sale_achievements: SaleAchievement[];
  num_customers: number;
  num_contracts: number;
}
