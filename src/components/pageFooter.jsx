import React from 'react';
import { Segment, Container, List, Divider, Icon } from 'semantic-ui-react';

const PageFooter = () => {
  return (
    <Segment style={{ padding: '0em 0em 5em 0em' }} vertical>
      <Container textAlign='center'>
        <Divider section />
        <List horizontal divided link size='small'>
          <List.Item content={`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`}/>
          <List.Item as='a' href='https://github.com/chohner/doko-butler' target="_blank">
            <Icon name='github'/> github
          </List.Item>
          <List.Item as='a' href='https://chohner.com' target="_blank" content={"made by chohner"}/>
        </List>
      </Container>
    </Segment>
  );
};

export default PageFooter;
