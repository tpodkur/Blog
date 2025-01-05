import { ConfigProvider, Pagination as AntdPagination } from 'antd';

type PaginationProps = {
  page: number;
  totalItemsCount: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalItemsCount, onPageChange }: PaginationProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            itemBg: '#EBEEF3',
            colorPrimary: '#EBEEF3',
            colorPrimaryHover: '#EBEEF3',
          },
        },
      }}
    >
      <AntdPagination
        current={page}
        defaultCurrent={1}
        total={totalItemsCount}
        pageSize={20}
        showSizeChanger={false}
        onChange={onPageChange}
      />
    </ConfigProvider>
  );
};

export default Pagination;
