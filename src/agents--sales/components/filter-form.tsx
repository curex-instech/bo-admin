import { Button, Input, Select, Space } from 'antd';
import { useState } from 'react';
import { ITEMS_PER_PAGE } from 'src/_shared/constants';

interface FilterParamsProps {
  companyId?: number;
  email?: string;
  fullName?: string;
  status?: number;
  pageSize?: number;
  pageNumber?: number;
}

interface FilterFormProps {
  loading?: boolean;
  companyOptions?: Record<string, string | number>[];
  onSubmit: (params?: FilterParamsProps) => void;
}

export default function FilterForm({
  loading,
  onSubmit,
  companyOptions,
}: FilterFormProps): JSX.Element {
  const [filterParams, setFilterParams] = useState<FilterParamsProps>({
    companyId: undefined as number | undefined,
    email: '',
    fullName: '',
    status: undefined as number | undefined,
    pageSize: ITEMS_PER_PAGE,
    pageNumber: 1,
  });

  const handleSearch = () => {
    onSubmit(filterParams);
  };

  const handleReset = () => {
    setFilterParams({
      companyId: undefined,
      email: '',
      fullName: '',
      status: undefined,
      pageSize: ITEMS_PER_PAGE,
      pageNumber: 1,
    });
    onSubmit(filterParams);
  };

  return (
    <Space className="flex-wrap" size="large" align="end">
      <div className="flex flex-col gap-2">
        <label htmlFor="full_name">Full Name</label>
        <Input
          placeholder="Full Name"
          value={filterParams?.fullName}
          onChange={(e) =>
            setFilterParams?.((prev: FilterParamsProps) => ({
              ...prev,
              fullName: e.target.value,
            }))
          }
          size="large"
          className="min-w-[200px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input
          autoComplete="disbled"
          placeholder="email@sample.com"
          value={filterParams?.email}
          onChange={(e) =>
            setFilterParams?.((prev: FilterParamsProps) => ({
              ...prev,
              email: e.target.value.trim(),
            }))
          }
          size="large"
          className="min-w-[200px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="insurance-company">Insurance Company</label>
        <Select
          placeholder="Insurance Company"
          value={filterParams?.companyId}
          onChange={(value) =>
            setFilterParams?.((prev: FilterParamsProps) => ({
              ...prev,
              companyId: value,
            }))
          }
          options={companyOptions}
          allowClear
          className="min-w-[200px]"
          size="large"
        />
      </div>
      <div className="flex gap-3">
        <Button
          type="primary"
          onClick={handleSearch}
          size="large"
          disabled={loading}
        >
          Search
        </Button>
        <Button onClick={handleReset} size="large" disabled={loading}>
          Reset
        </Button>
      </div>
    </Space>
  );
}
