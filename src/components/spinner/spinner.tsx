import { Spin } from 'antd';
import type { GetProps } from 'antd';

const Spinner = ({ size }: GetProps<typeof Spin>) => {
  return <Spin size={size} />;
};

export default Spinner;
