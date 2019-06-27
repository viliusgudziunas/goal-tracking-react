import React from 'react'
import { List, Header } from 'semantic-ui-react';

export const Goals = ({ goals }) => {
    return (
      <List>
        {goals.map(goal => {
          return (
            <List.Item key={goal.id}>
              <Header>{goal.name}</Header>
            </List.Item>
          )
        })}
      </List>
    )
};