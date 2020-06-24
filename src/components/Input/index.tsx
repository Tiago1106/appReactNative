import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';
import { Container, TextInput, IconLeft, IconRight } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  iconLeft: string;
  iconRight?: string;
  functionOnPress?: any;
}

interface inputValueReference {
  value: string;
}

interface inputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<inputRef, InputProps> = (
  { name, iconLeft, iconRight, functionOnPress, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<inputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <IconLeft
        name={iconLeft}
        size={25}
        color={isFocused || isFilled ? '#F3802A' : '#312e38'}
      />
      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#312e38"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      {iconRight && (
        <IconRight
          name={iconRight}
          size={25}
          color="#312e38"
          onPress={functionOnPress}
        />
      )}
      {error && <IconRight name="x-circle" size={25} color="#c53030" />}
    </Container>
  );
};

export default forwardRef(Input);
