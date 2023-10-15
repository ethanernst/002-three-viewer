import { useAtom } from 'jotai';
import { lights, scale, wireframe } from '../store/settings';

import styled from 'styled-components';
import FileDropZone from './FileDropZone';

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: min-content;
  padding: 20px;
  margin: 30px;
  border-radius: 25px;
  background-color: #242424;
  text-align: center;

  p {
    line-height: 1;
  }
`;

function Sidebar() {
  const [lightsToggle, setLightsToggle] = useAtom(lights);
  const [wireframeToggle, setWireframeToggle] = useAtom(wireframe);
  const [scaleValue, setScaleValue] = useAtom(scale);

  const handleWireframeToggle = e => {
    if (wireframeToggle !== e.target.checked) {
      setWireframeToggle(!wireframeToggle);
    }
  };

  const handleLightsToggle = e => {
    if (lightsToggle !== e.target.checked) {
      setLightsToggle(!lightsToggle);
    }
  };

  const handleScaleSlider = e => {
    setScaleValue(e.target.value);
  };

  return (
    <StyleContainer>
      <h1>three-viewer</h1>
      <h4>
        Orbit with left click, pan with right click, zoom with mouse wheel.
      </h4>
      <p>Wireframe</p>
      <input
        type="checkbox"
        checked={wireframeToggle}
        onChange={handleWireframeToggle}
      />
      <p>Lights</p>
      <input
        type="checkbox"
        checked={lightsToggle}
        onChange={handleLightsToggle}
      />
      <p>Scale: {scaleValue}</p>
      <input
        type="range"
        min={0.5}
        max={1.5}
        step={0.1}
        value={scaleValue}
        onChange={handleScaleSlider}
      />
      <FileDropZone />
    </StyleContainer>
  );
}

export default Sidebar;
