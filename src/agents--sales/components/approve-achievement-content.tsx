import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Button, Carousel, Typography } from 'antd';
import cx from 'classnames';
import FileViewer from 'src/_shared/components/file-viewer';
import { API_SERVER } from 'src/environment';
import type { SaleAchievement, SaleInfo } from 'src/models';

interface ApproveAchievementProps {
  data: SaleInfo;
  onViewSaleAchievement?: (sale: SaleAchievement) => void;
}

const CustomArrow = ({ className, style, onClick, direction }: any) => {
  const isNext = direction === 'next';
  return (
    <Button
      type="link"
      className={cx(className, '[&::after]:!hidden')}
      style={{
        ...style,
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        width: 36,
        height: 36,
        zIndex: 10,
        [isNext ? 'right' : 'left']: -40,
      }}
      onClick={onClick}
    >
      {isNext ? (
        <RightOutlined style={{ color: 'white', fontSize: 18 }} />
      ) : (
        <LeftOutlined style={{ color: 'white', fontSize: 18 }} />
      )}
    </Button>
  );
};

export default function ApproveAchievementContent({
  data,
  onViewSaleAchievement,
}: ApproveAchievementProps): JSX.Element {
  const { Title } = Typography;
  const handleAfterChange = (current: number) => {
    const achievement = data.sale_achievements[current];
    onViewSaleAchievement?.(achievement);
  };

  return (
    <div className="my-6 px-6">
      <Carousel
        arrows
        infinite={false}
        dots={false}
        draggable={true}
        afterChange={handleAfterChange}
        prevArrow={<CustomArrow direction="prev" />}
        nextArrow={<CustomArrow direction="next" />}
      >
        {data?.sale_achievements?.map((item) => (
          <div key={Math.random()}>
            <div className="grid grid-cols-2 gap-8 mx-1 items-stretch">
              <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Avatar
                    src={`${API_SERVER}${item.achievement_icon_url}`}
                    size={120}
                  />
                  <p className="font-semibold">{item.achievement_name}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Title level={5}>{data.full_name}</Title>
                  <div className="font-medium text-foreground"></div>

                  <div className="space-y-4">
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
                      <span className="text-foreground">
                        {data?.company.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-full w-full flex flex-col justify-center">
                <FileViewer url={item.proof} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
