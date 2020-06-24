import styled from 'styled-components/native';

export const Scrow = styled.ScrollView`
  background-color: #fff;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 20px;
`;

export const ContainerImage = styled.View`
  margin-top: 70px;
  flex: 1;
`;

export const ContainerTitle = styled.View`
  background-color: #fff;
  padding: 20px;
`;

export const DetailTitle = styled.View`
  width: 110px;
  height: 12px;
  background-color: #f3802a;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

export const TextLevel = styled.Text`
  margin-top: 12px;
  font-size: 18px;
  color: #000;
`;

export const ContainerSignIn = styled.TouchableOpacity`
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 0;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  background-color: #c4c4c4;
  height: 54px;
`;

export const TextSignIn = styled.Text`
  color: #000;
  font-size: 16px;
  margin-left: 16px;
`;
