import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface InputProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<InputProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-width: 2px;
  border-color: #312e38;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #f3802a;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #312e38;
  font-size: 16px;
`;

export const IconLeft = styled(FeatherIcon)`
  margin-right: 12px;
`;

export const IconRight = styled(FeatherIcon)`
  margin-left: 12px;
`;
