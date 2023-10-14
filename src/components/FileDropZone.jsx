import { useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { currentFile } from '../store/settings';

import styled from 'styled-components';

const StyleContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: 5px dashed white;
  transition: all 0.2s;

  input {
    display: none;
  }
`;

function FileDropZone() {
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useAtom(currentFile);

  const inputRef = useRef();

  const ALLOWED_FILETYPES = ['stl', 'obj', 'gltf', 'fbx'];
  const MAX_FILESIZE_IN_BYTES = 10000000;

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

    const droppedFile = e.dataTransfer?.files[0];

    droppedFile && handleFile(droppedFile);
  };

  const handleClick = () => inputRef.current.click();

  const handleUpload = e => {
    e.preventDefault();

    const uploadedFile = e.target?.files[0];

    uploadedFile && handleFile(uploadedFile);
  };

  const handleFile = targetFile => {
    const file = targetFile;
    const fileSize = file.size;

    const fileExtension = file.name.split('.').pop();
    const validFile = ALLOWED_FILETYPES.includes(fileExtension.toLowerCase());

    // check size
    if (fileSize > MAX_FILESIZE_IN_BYTES) {
      alert(
        `File size exceeds the maximum limit of ${
          MAX_FILESIZE_IN_BYTES / 1000000
        }MB.`
      );
      return;
    }

    // check filetype
    if (!validFile) {
      alert(
        'Please choose a supported filetype (e.g., .obj, .stl, .gltf, .fbx).'
      );
      return;
    }

    // set state to file
    setUploadedFile(file);
    console.log('File uploaded:', file);
  };

  return (
    <>
      <h3>Current file:</h3>
      <span>{uploadedFile?.name || '---'}</span>
      <br />
      <StyleContainer
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        onDrop={handleDrop}
      >
        <p>Click or drag file to upload</p>
        <input
          type="file"
          ref={inputRef}
          accept=".obj,.stl,.glb,.gltf,.fbx"
          onChange={handleUpload}
        />
      </StyleContainer>
    </>
  );
}

export default FileDropZone;
