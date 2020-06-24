import React from 'react';

import { Container, Icon, Text } from './styles';

interface LevelRadiusProps {
  title: string;
  icon: string;
  functionOnPress?: any;
}

const LevelRadius: React.FC<LevelRadiusProps> = ({
  title,
  icon,
  functionOnPress,
}) => {
  return (
    <Container>
      <Icon name={icon} size={20} onPress={functionOnPress} />
      <Text>{title}</Text>
    </Container>
  );
};

export default LevelRadius;
