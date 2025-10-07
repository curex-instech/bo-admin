import { Button, Divider } from 'antd';
import type { SaleInfo } from 'src/models';
import CertificateItems from './certificate-items';

export default function DetailInformation({
  data,
  onApproveCert,
}: {
  data: SaleInfo;
  onApproveCert?: () => void;
}): JSX.Element {
  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Personal information
        </h3>
        <div className="space-y-4 px-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Phone</span>
            <span className="text-foreground font-mono">
              {data?.phone_number}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Email</span>
            <span className="text-foreground">{data?.email}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Insurance Company</span>
            <span className="text-foreground">{data?.company.name}</span>
          </div>
        </div>
      </section>

      {/* Certification / Rewards */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Certification / Rewards
        </h3>
        <div className="mb-6">
          <CertificateItems data={data?.sale_achievements || []} />
        </div>
        {data?.sale_achievements.length > 0 && (
          <div className="flex justify-end">
            <Button
              type="primary"
              size="middle"
              onClick={onApproveCert}
              className="bg-primary hover:bg-primary/90"
            >
              Review Certs / Rewards
            </Button>
          </div>
        )}
      </section>

      <Divider className="bg-border my-8" />

      {/* Customer Information */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Customer information
        </h3>
        <div className="space-y-4 px-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Customers</span>
            <span className="text-foreground font-semibold">
              {data?.num_customers}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Contracts</span>
            <span className="text-foreground font-semibold">
              {data?.num_contracts}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
