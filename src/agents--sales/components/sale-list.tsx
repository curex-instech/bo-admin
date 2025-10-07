import { EyeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Space,
  Table,
  type TablePaginationConfig,
  type TableProps,
  Tooltip,
} from 'antd';
import { ITEMS_PER_PAGE, PAGE_SIZE_OPTIONS } from 'src/_shared/constants';
import type { SaleInfo } from 'src/models';
import CertificateItems from './certificate-items';

interface SaleListProps {
  data: SaleInfo[];
  loading: boolean;
  onViewDetail?: (value: SaleInfo) => void;
  onReviewAchievement?: (value: SaleInfo) => void;
  pagination: TablePaginationConfig;
}

export default function SaleList({
  data,
  loading,
  onViewDetail,
  onReviewAchievement,
  pagination,
}: SaleListProps): JSX.Element {
  const columns: TableProps<SaleInfo>['columns'] = [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      width: 270,
      render: (_, record) => {
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <Avatar src={record.logo} size={56} />
            <div>
              <div className="font-medium text-foreground">
                {record.full_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {record.email}
              </div>
              <div className="text-sm text-muted-foreground">
                {record.phone_number && `+${record.phone_number}`}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Customers',
      dataIndex: 'num_customers',
      key: 'num_customers',
      align: 'center',
    },
    {
      title: 'Contracts',
      dataIndex: 'num_contracts',
      key: 'num_contracts',
      align: 'center',
    },
    {
      title: 'Insurance Company',
      dataIndex: 'company.name',
      key: 'company.name',
      align: 'center',
      render: (_, record) => <p>{record.company.name}</p>,
    },
    {
      title: 'Cert/Rewards',
      dataIndex: 'sale_achievements',
      key: 'sale_achievements',
      align: 'center',
      width: 450,
      render: (_, record) => (
        <CertificateItems data={record.sale_achievements} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" wrap>
          <Tooltip placement="top" title={'View Detail'}>
            <Button
              color="primary"
              variant="outlined"
              icon={<EyeOutlined className="text-xl" />}
              onClick={() => onViewDetail?.(record)}
            ></Button>
          </Tooltip>

          {record.sale_achievements.length > 0 && (
            <Tooltip placement="top" title={'Approve Cert/Reward'}>
              <Button
                color="primary"
                variant="outlined"
                icon={<SafetyCertificateOutlined className="text-xl" />}
                onClick={() => onReviewAchievement?.(record)}
              ></Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table<SaleInfo>
      dataSource={data}
      columns={columns}
      loading={loading}
      scroll={{ x: 1000 }}
      pagination={{
        ...pagination,
        defaultPageSize: ITEMS_PER_PAGE,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        responsive: true,
      }}
    />
  );
}
