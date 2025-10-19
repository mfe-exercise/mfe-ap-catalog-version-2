import { useEffect } from 'react';
import { EventNameEnum } from '../../../utils/constants';

const useBackground = () => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(EventNameEnum.VIEW, {
      detail: { screen: 'background' }
    }));
  }, []);
};

export default useBackground;
