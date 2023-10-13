import { useState } from 'react';

import styled from 'styled-components';

const StyleContainer = styled.div`
  width: 90%;
  height: 400px;
  margin: 10px;
  border: 5px dashed white;
  transition: all 0.2s;

  background-color: ${({ color }) => color};
`;

const MAX_FILESIZE_IN_BYTES = 10000000;

function FileDropZone() {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = e => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    console.log('Files dropped:', files);

    files && handleFiles(files);
  };

  const handleFiles = files => {
    const file = files[0];
    const fileSize = file.size;

    const allowedFileTypes = ['.obj', '.stl', '.glb', '.gltf'];

    const fileExtension = file.name.split('.').pop();
    const validFile = allowedFileTypes.includes(
      '.' + fileExtension.toLowerCase()
    );

    if (fileSize > MAX_FILESIZE_IN_BYTES) {
      alert('File size exceeds the maximum limit of 10MB.');
      return;
    }

    if (!validFile) {
      alert('Please drop only 3D filetypes (e.g., .obj, .stl, .glb, .gltf).');
      return;
    }

    // Handle the file upload logic here
    console.log('File uploaded:', file);
  };

  return (
    <StyleContainer
      color={dragging ? 'white' : 'transparent'}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" accept=".obj,.stl,.glb,.gltf" onChange={handleDrop} />
    </StyleContainer>
  );
}

export default FileDropZone;
