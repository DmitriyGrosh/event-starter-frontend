import { BellOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { NotificationType } from './types';

export const getIconByType = (type: NotificationType) => {
  switch (type) {
    case 'event':
      return <CalendarOutlined style={{ fontSize: '20px' }} />;
    case 'system':
      return <UserOutlined style={{ fontSize: '20px' }} />;
    case 'reminder':
      return <BellOutlined style={{ fontSize: '20px' }} />;
  }
}; 