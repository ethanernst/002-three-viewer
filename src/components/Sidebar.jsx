import { useState } from 'react';

import styled from 'styled-components';
import FileDropZone from './FileDropZone';

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min-content;
  height: min-content;
  padding: 20px;
  margin: 30px;
  border-radius: 25px;
  background-color: #242424;
  text-align: center;
`;

function Sidebar() {
  return (
    <StyleContainer>
      <h1>three-viewer</h1>
      <h3>Options</h3>
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
      <FileDropZone />
    </StyleContainer>
  );
}

export default Sidebar;
