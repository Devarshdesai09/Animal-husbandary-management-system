import React from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";

const CardContainer = styled.div`
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  transition: transform 0.3s ease;
  margin:10px;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
  }
`;


const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 1.5rem;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
`;

const CardButton = styled.button`
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Card = (props) => {
  return (
    <CardContainer>
      <Icon icon={props.icon} width="100" height="100"/>
      <CardContent>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>
          {props.description}
        </CardDescription>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
