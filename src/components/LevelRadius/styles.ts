import styled from 'styled-components/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export const Container = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Icon = styled(IconFontAwesome)`
  margin-left: 16px;
`;

export const Text = styled.Text`
  margin-left: 16px;
  font-size: 16px;
  color: #000;
`;
