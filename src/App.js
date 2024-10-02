import styled from "styled-components";
import { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Animation = keyframes`
  0% {  transform: scale(1); }  
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
  `;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: salmon;
  animation: ${Animation} 2s infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box></Box>
    </Wrapper>
  );
}

export default App;
