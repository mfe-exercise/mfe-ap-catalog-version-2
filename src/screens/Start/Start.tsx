import React from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';

import {
  Title,
} from './styles';
import useStart from './hooks/useStart';

function Catalog() {
  const {
    handleStartClick,
    id,
  } = useStart();

  return (
    <Flex flexDirection="column">
      <Title>
        Iniciar Atividade
      </Title>

      <Input
        mt="16px"
        mb="24px"
        type={'number'}
        placeholder="Matrícula"
        ref={id}
      />

      <Button
        onClick={handleStartClick}
      >
        Iniciar
      </Button>
    </Flex>
  );
}

export default Catalog;
