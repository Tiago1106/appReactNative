import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background-color: #f4f4f4;
`;

export const Header = styled.View`
  padding: 15px;
  height: 100px;
  width: 100%;
  background-color: #f3802a;
  align-items: center;
  flex-direction: row;
`;

export const TitleHeader = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-left: 105px;
`;

export const IconBack = styled(FeatherIcon)`
  color: #fff;
`;

export const ContainerScroll = styled.ScrollView``;

export const Body = styled.View`
  flex: 1;
  background-color: #f4f4f4;
`;

export const Card = styled.View`
  height: 150px;
  width: 390px;
  background-color: #fff;
  margin: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 15px;
`;

export const ContainerStyle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.View`
  width: 25px;
  height: 8px;
  background-color: #f3802a;
  border-radius: 20px;
  margin: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #000;
`;
