import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #0C2E3F;
`;

const Sidebar = styled.div`
  width: 15%;
  background-color: #0a2532;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  width: 85%;
  padding: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  min-height: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Sidebar>
        {/* Conteúdo do sidebar será adicionado posteriormente */}
      </Sidebar>
      <MainContent>
        <GridContainer>
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index}>
              {/* Conteúdo dos cards será adicionado posteriormente */}
            </Card>
          ))}
        </GridContainer>
      </MainContent>
    </Container>
  );
};

export default Dashboard; 