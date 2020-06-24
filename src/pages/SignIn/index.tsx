import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';

import { Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import LogoImg from '../../assets/logo.jpg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Scrow,
  Container,
  ContainerImage,
  ContainerTitle,
  Title,
  DetailTitle,
  ContainerSignUp,
  TextSignUp,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const [passwordView, setpasswordView] = useState(true);
  const handlePasswordView = useCallback((password) => {
    setpasswordView(!password);
  }, []);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        Alert.alert('Aviso', 'Você foi logado com sucesso');
      } catch (err) {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );

  return (
    <>
      <Scrow>
        <Container>
          <ContainerImage>
            <Image source={LogoImg} style={{ width: 300, height: 200 }} />
          </ContainerImage>
        </Container>
        <ContainerTitle>
          <Title>Login</Title>
          <DetailTitle />
        </ContainerTitle>
        <Container>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="E-mail"
              name="email"
              iconLeft="user"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              placeholder="Senha"
              secureTextEntry={passwordView}
              name="password"
              iconLeft="lock"
              iconRight={passwordView ? 'eye' : 'eye-off'}
              functionOnPress={() => handlePasswordView(passwordView)}
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              ENTRAR
            </Button>
          </Form>
        </Container>
      </Scrow>
      <ContainerSignUp onPress={() => navigation.navigate('SignUp')}>
        <TextSignUp>Ainda não possui cadastro? Entre aqui</TextSignUp>
      </ContainerSignUp>
    </>
  );
};

export default SignIn;
