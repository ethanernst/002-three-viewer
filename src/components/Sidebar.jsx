import { useState } from 'react';

import styled from 'styled-components';

const StyleContainer = styled.div`
  width: 500px;
  height: 50%;
  margin: 30px;
  background-color: darkslategray;
  border-radius: 25px;
  text-align: center;
`;

function Sidebar() {
  const [fileUrl, setFileUrl] = useState('');

  return (
    <StyleContainer>
      <h1>three-viewer</h1>
      <br />
      <h3>Options</h3>
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
      <br />
      <h3>Upload</h3>
      <input
        type="file"
        name="modelUpload"
        onChange={event => {
          console.log(event.target.files[0]);
          setFileUrl(event.target.files[0]);
        }}
      />
    </StyleContainer>
  );
}

export default Sidebar;
