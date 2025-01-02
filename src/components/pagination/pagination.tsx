import { Pagination as AntdPagination } from 'antd';

type PaginationProps = {
  page: number;
  totalItemsCount: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalItemsCount, onPageChange }: PaginationProps) => {
  return (
    <AntdPagination
      current={page}
      defaultCurrent={1}
      total={totalItemsCount}
      pageSize={20}
      showSizeChanger={false}
      onChange={onPageChange}
    />
  );
};

export default Pagination;
