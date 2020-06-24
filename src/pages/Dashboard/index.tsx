import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  ContainerScroll,
  Body,
  TitleHeader,
  IconBack,
  Card,
  ContainerStyle,
  StyledText,
  Text,
} from './styles';

interface Users {
  id: string;
  name: string;
  email: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const [users, setUsers] = useState<Users[]>([]);

  async function requestUsers(): Promise<void> {
    const response = await api.get('/users');

    setUsers(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    requestUsers();
  }, []);

  return (
    <Container>
      <Header>
        <IconBack name="chevron-left" size={30} onPress={signOut} />
        <TitleHeader>DASHBOARD</TitleHeader>
      </Header>
      <Body>
        <ContainerScroll>
          {users.map((user) => (
            <Card
              key={user.id}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <ContainerStyle>
                <StyledText />
                <Text>{user.name}</Text>
                <StyledText />
              </ContainerStyle>
              <ContainerStyle>
                <StyledText />
                <Text>{user.email}</Text>
                <StyledText />
              </ContainerStyle>
              <ContainerStyle>
                <StyledText />
                <Text>{user.category}</Text>
                <StyledText />
              </ContainerStyle>
            </Card>
          ))}
        </ContainerScroll>
      </Body>
    </Container>
  );
};

export default Dashboard;
