import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';

const StyleContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

function App() {
  return (
    <StyleContainer>
      <Sidebar />
      <Viewer />
    </StyleContainer>
  );
}

export default App;
