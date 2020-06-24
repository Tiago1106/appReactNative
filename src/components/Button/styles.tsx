import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 370px;
  height: 50px;
  background: #f3802a;
  border-radius: 10px;
  margin-top: 20px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #0f0f0f;
  font-size: 25px;
  font-weight: bold;
`;
