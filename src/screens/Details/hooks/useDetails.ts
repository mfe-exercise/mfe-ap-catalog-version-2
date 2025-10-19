import { useNavigate, useParams } from 'react-router-dom';
import antiPatternsFiles from '../../../anti-patterns';
import { TAntiPatternsItem } from '../../../components/AntiPatternsList/types';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { EventNameEnum } from '../../../utils/constants';

const data = antiPatternsFiles as TAntiPatternsItem[];

const useDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  const antiPatternsData = useMemo(() => ({
    ...data.filter(
      (item) => item.name.toLocaleLowerCase() === id?.toLocaleLowerCase()
    )[0],
  }), [id]);

  useEffect(() => {
    if (!antiPatternsData) {
      navigate('/catalog');
      return;
    }

    document.title = antiPatternsData.name;
    window.dispatchEvent(new CustomEvent(EventNameEnum.VIEW, {
      detail: { screen: 'details', antiPattern: antiPatternsData.name }
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antiPatternsData]);

  return {
    isOpen,
    onToggle,
    onOpen,
    onClose,
    navigate,
    antiPatternsData,
  };
};

export default useDetails;
