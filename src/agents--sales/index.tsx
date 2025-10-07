import { ExportOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Drawer, Form, Input, Modal } from 'antd';
import { isAxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from 'src/_shared/constants';
import { SaleAchievementStatus } from 'src/constants/enums';
import type { InsuranceCompany, SaleAchievement, SaleInfo } from 'src/models';
import {
  approveSaleAchievement,
  getSales,
  rejectSaleAchievement,
} from 'src/services/bo.service';
import { getInsuranceCompanies } from 'src/services/insurance.service';
import { CardContent, FluidPage } from '../_shared/components/PageContent';
import { useLoading } from '../_shared/hooks/useLoading';
import {
  handleErrorNotification,
  handleSuccessNotification,
} from '../_shared/utils';
import ApproveAchievementContent from './components/approve-achievement-content';
import DetailInformation from './components/detail-infomation';
import FilterForm from './components/filter-form';
import SaleList from './components/sale-list';

interface RejectFormValues {
  rejectReason: string;
}

interface FilterParams {
  companyId?: number;
  email: string;
  fullName: string;
  status?: number;
  pageSize: number;
  pageNumber: number;
}

export default function PageAgents(): JSX.Element {
  const [saleData, setSaleData] = useState<SaleInfo[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const { loading, withLoading } = useLoading();
  const [filterParams, setFilterParams] = useState<FilterParams>({
    companyId: undefined,
    email: '',
    fullName: '',
    status: undefined,
    pageSize: ITEMS_PER_PAGE,
    pageNumber: 1,
  });
  const [insuranceCompanies, setInsuranceCompanies] = useState<
    InsuranceCompany[]
  >([]);
  const [companyOptions, setCompanyOptions] = useState<
    Record<string, string | number>[]
  >([]);
  const [selectedSale, setSelectedSale] = useState<SaleInfo>({} as SaleInfo);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSA, setCurrentSA] = useState<SaleAchievement>(
    {} as SaleAchievement,
  );
  const [rejectForm] = Form.useForm<RejectFormValues>();
  const [isModalRejectSAOpen, setIsModalRejectSAOpen] = useState(false);

  const syncSaleAchievementStatus = useCallback(
    (status: SaleAchievementStatus) => {
      const achievementId = currentSA?.id;
      if (!achievementId) return;

      // Update currentSA
      setCurrentSA((prev) => ({ ...prev, status }) as SaleAchievement);

      // Update selectedSale sale_achievements
      setSelectedSale((prev) => {
        if (!prev || !prev.sale_achievements) return prev;
        return {
          ...prev,
          sale_achievements: prev.sale_achievements.map((sa) =>
            sa.id === achievementId ? { ...sa, status } : sa,
          ),
        } as SaleInfo;
      });

      // Update saleData list
      setSaleData((prevList) =>
        prevList.map((sale) => {
          if (sale.id !== selectedSale?.id) return sale;
          return {
            ...sale,
            sale_achievements: sale.sale_achievements.map((sa) =>
              sa.id === achievementId ? { ...sa, status } : sa,
            ),
          } as SaleInfo;
        }),
      );
    },
    [currentSA?.id, selectedSale?.id],
  );

  const fetchSales = useCallback(async (currentFilter?: FilterParams) => {
    try {
      const res = await getSales(currentFilter);
      const saleInfoList: SaleInfo[] = res.data;
      setSaleData(saleInfoList);
      setTotalRecords(res.totalRecords);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        handleErrorNotification(error);
      }
    }
  }, []);

  const fetchCompanies = useCallback(async () => {
    try {
      const res = await getInsuranceCompanies();
      setInsuranceCompanies(res);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        handleErrorNotification(error);
      }
    }
  }, []);

  useEffect(() => {
    withLoading(fetchSales);
    withLoading(fetchCompanies);
  }, [fetchSales, fetchCompanies, withLoading]);

  useEffect(() => {
    if (insuranceCompanies.length > 0) {
      const options = insuranceCompanies.map((item: InsuranceCompany) => ({
        label: item.name,
        value: item.id,
      }));
      setCompanyOptions(options);
    }
  }, [insuranceCompanies]);

  const handleOnSubmitFilter = (params: FilterParams) => {
    setFilterParams({ ...filterParams, ...params });
    fetchSales(params);
  };

  const openModal = () => {
    setModalTitle('Certification Approval');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentSA(selectedSale.sale_achievements[0]);
  };

  const handleOnViewDetail = (record: SaleInfo) => {
    setDrawerVisible(true);
    setSelectedSale(record);
    setCurrentSA(record.sale_achievements[0]);
  };

  const handleOnReviewAchievement = (record: SaleInfo) => {
    setSelectedSale(record);
    openModal();
    setCurrentSA(record.sale_achievements[0]);
  };

  const onViewSA = (record: SaleAchievement) => {
    setCurrentSA(record);
  };

  const approveSA = () => {
    withLoading(async () => {
      try {
        await approveSaleAchievement(currentSA.id);
        syncSaleAchievementStatus(SaleAchievementStatus.Verified);
        handleSuccessNotification({
          description: 'Approve certification successfully!',
        });
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
          handleErrorNotification(error);
        }
      }
    });
  };

  const rejectSA = ({ rejectReason }: RejectFormValues) => {
    withLoading(async () => {
      try {
        await rejectSaleAchievement(currentSA.id, rejectReason);
        syncSaleAchievementStatus(SaleAchievementStatus.Rejected);
        handleSuccessNotification({
          description: 'Reject certification successfully!',
        });
        setIsModalRejectSAOpen(false);
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
          handleErrorNotification(error);
        }
      }
    });
  };

  const isCurrentSAVerified = () =>
    currentSA?.status === SaleAchievementStatus.Verified;
  const isCurrentSARejected = () =>
    currentSA?.status === SaleAchievementStatus.Rejected;

  return (
    <FluidPage>
      <div className="mb-6">
        <div className="mb-2">
          <h1 className="text-2xl font-semibold">Sale Management</h1>
        </div>

        <Breadcrumb
          items={[
            {
              title: 'Agents',
            },
            {
              title: 'Sales',
            },
          ]}
        />
      </div>

      <CardContent>
        <FilterForm
          loading={loading}
          onSubmit={handleOnSubmitFilter}
          companyOptions={companyOptions}
        />

        <div className="px-4 mb-4 w-full flex items-end justify-end">
          <Button
            type="primary"
            icon={<ExportOutlined />}
            className="bg-primary hover:bg-primary/90"
          >
            Export
          </Button>
        </div>

        <SaleList
          loading={loading}
          data={saleData}
          onViewDetail={handleOnViewDetail}
          onReviewAchievement={handleOnReviewAchievement}
          pagination={{
            current: filterParams.pageNumber,
            total: totalRecords,
            onChange: (page, pageSize) => {
              const params = {
                ...filterParams,
                pageSize: pageSize,
                pageNumber: page,
              };
              setFilterParams(params);
              fetchSales(params);
            },
            showTotal: (total) => (
              <div>
                Total <span className="font-semibold">{total}</span> sales
              </div>
            ),
          }}
        />
      </CardContent>

      <Drawer
        title={
          selectedSale && (
            <div className="flex items-center gap-3">
              <Avatar src={selectedSale.logo} size={56} />
              <div>
                <div className="font-medium text-foreground">
                  {selectedSale.full_name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedSale.email}
                </div>
              </div>
            </div>
          )
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
        closable={false}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              size="large"
              onClick={() => setDrawerVisible(false)}
              className="min-w-[120px]"
            >
              Close
            </Button>
          </div>
        }
      >
        <DetailInformation data={selectedSale} onApproveCert={openModal} />
      </Drawer>

      <Modal
        centered
        title={modalTitle}
        open={modalVisible}
        destroyOnHidden={true}
        keyboard={false}
        maskClosable={false}
        onCancel={closeModal}
        width={{
          xs: '90%',
          sm: '80%',
          md: '50%',
        }}
        zIndex={1002}
        classNames={{
          body: 'relative',
        }}
        footer={[
          <Button
            size="large"
            key="cancel"
            disabled={loading}
            onClick={closeModal}
          >
            Cancel
          </Button>,
          <React.Fragment key="action-buttons">
            {!isCurrentSAVerified() && !isCurrentSARejected() && (
              <Button
                size="large"
                key="approve"
                type="primary"
                disabled={loading}
                onClick={approveSA}
              >
                Approve
              </Button>
            )}
            {!isCurrentSAVerified() && !isCurrentSARejected() && (
              <Button
                size="large"
                key="reject"
                danger
                type="primary"
                disabled={loading}
                onClick={() => setIsModalRejectSAOpen(true)}
              >
                Reject
              </Button>
            )}
          </React.Fragment>,
        ]}
      >
        <ApproveAchievementContent
          data={selectedSale}
          onViewSaleAchievement={onViewSA}
        />

        <Modal
          centered
          destroyOnHidden
          maskClosable={false}
          keyboard={false}
          title="Reject Certification"
          open={isModalRejectSAOpen}
          onOk={rejectForm.submit}
          onCancel={() => setIsModalRejectSAOpen(false)}
          okText="Reject"
        >
          <Form
            form={rejectForm}
            layout="vertical"
            onFinish={rejectSA}
            preserve={false}
          >
            <Form.Item
              label="Reject Reason"
              name="rejectReason"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        </Modal>
      </Modal>
    </FluidPage>
  );
}
