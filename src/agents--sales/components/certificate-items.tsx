import { Avatar, Space } from 'antd';
import { API_SERVER } from 'src/environment';
import type { SaleAchievement } from 'src/models';
import { AchievementStatusTag } from './achievement-status-tag';

interface CertificateItemsProp {
  data: SaleAchievement[];
}
export default function CertificateItems({
  data,
}: CertificateItemsProp): JSX.Element {
  return (
    <Space wrap size="middle">
      {data.map((item: SaleAchievement) => (
        <Space key={Math.random()} direction="vertical" align="center">
          <Avatar
            shape="circle"
            size={48}
            src={`${API_SERVER}${item.achievement_icon_url}`}
          />
          <AchievementStatusTag status={item.status} />
        </Space>
      ))}
    </Space>
  );
}
