import { Alert } from 'antd';
import React from 'react';

const WarnAlert: React.FC = () => (
  <Alert
    message='No Movies Found'
    description='Type in your query in search input above.'
    type='warning'
  />
);

export default WarnAlert;
