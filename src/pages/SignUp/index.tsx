import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';

import { TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import getValidationError from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LevelRadiu from '../../components/LevelRadius';

import {
  Scrow,
  Container,
  ContainerTitle,
  Title,
  DetailTitle,
  ContainerSignIn,
  TextSignIn,
  TextLevel,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface DataApi {
  name: string;
  email: string;
  password: string;
  category: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [passwordView, setpasswordView] = useState(true);
  const handlePasswordView = useCallback((password) => {
    setpasswordView(!password);
  }, []);

  const [nameCategory, setNameCategory] = useState('');
  const [clickRadiusBasico, setClickRadiusBasico] = useState(false);
  const [clickRadiusIntermed, setClickRadiusIntermed] = useState(false);
  const [clickRadiusAvancado, setClickRadiusAvancado] = useState(false);

  const handleSelectRadiusBasico = useCallback((radiusBasico) => {
    setNameCategory('Básico');
    setClickRadiusBasico(!radiusBasico);
    setClickRadiusIntermed(false);
    setClickRadiusAvancado(false);
  }, []);

  const handleSelectRadiusIntermed = useCallback((radiusIntermed) => {
    setNameCategory('Intermediário');
    setClickRadiusIntermed(!radiusIntermed);
    setClickRadiusBasico(false);
    setClickRadiusAvancado(false);
  }, []);

  const handleSelectRadiusAvancado = useCallback((radiusAvancado) => {
    setNameCategory('Avançado');
    setClickRadiusAvancado(!radiusAvancado);
    setClickRadiusBasico(false);
    setClickRadiusIntermed(false);
  }, []);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const newData: DataApi = {
          name: data.name,
          email: data.email,
          password: data.password,
          category: nameCategory,
        };

        await api.post('/users', newData);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação',
        );

        navigation.goBack();
      } catch (err) {
        Alert.alert('Erro no cadastro', 'Occoreu um erro ao fazer o cadastro');
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [navigation, nameCategory],
  );

  return (
    <>
      <Scrow>
        <ContainerTitle>
          <Title>Cadastrar</Title>
          <DetailTitle />
        </ContainerTitle>
        <Container>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              placeholder="Nome"
              name="name"
              iconLeft="user"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
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
            <TextLevel>Qual seu nivel de conhecimento?</TextLevel>
            <LevelRadiu
              title="Básico"
              functionOnPress={() =>
                handleSelectRadiusBasico(clickRadiusBasico)
              }
              icon={clickRadiusBasico ? 'circle' : 'circle-o'}
            />
            <LevelRadiu
              title="Intermediário"
              functionOnPress={() =>
                handleSelectRadiusIntermed(clickRadiusIntermed)
              }
              icon={clickRadiusIntermed ? 'circle' : 'circle-o'}
            />
            <LevelRadiu
              title="Avançado"
              functionOnPress={() =>
                handleSelectRadiusAvancado(clickRadiusAvancado)
              }
              icon={clickRadiusAvancado ? 'circle' : 'circle-o'}
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              CADASTRAR
            </Button>
          </Form>
        </Container>
      </Scrow>
      <ContainerSignIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="chevron-left" size={18} color="#000" />
        <TextSignIn>Voltar para o login</TextSignIn>
      </ContainerSignIn>
    </>
  );
};

export default SignUp;
