import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { SaleAchievementStatus } from 'src/constants/enums';

interface AchivementStatusTagProps {
  status: SaleAchievementStatus;
}

export function AchievementStatusTag({ status }: AchivementStatusTagProps) {
  switch (status) {
    case SaleAchievementStatus.Verified:
      return (
        <Tag
          icon={<CheckCircleOutlined />}
          className="!rounded-full !m-0"
          color="success"
        >
          Verified
        </Tag>
      );
    case SaleAchievementStatus.Unverified:
      return (
        <Tag className="!rounded-full !m-" color="default">
          Unverified
        </Tag>
      );
    case SaleAchievementStatus.PendingApproval:
      return (
        <Tag className="!rounded-full !m-0" color="processing">
          Pending Approval
        </Tag>
      );
    case SaleAchievementStatus.Rejected:
      return (
        <Tag
          icon={<CloseCircleOutlined />}
          className="!rounded-full !m-0"
          color="error"
        >
          Rejected
        </Tag>
      );
  }
}
