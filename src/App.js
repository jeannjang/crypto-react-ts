import styled from "styled-components";
import { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Animation = keyframes`
  0% {  transform: scale(1); }  
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
  `;

const Emoji = styled.span`
  font-size: 40px;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: salmon;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${Animation} 2s infinite;
  ${Emoji} {
    &:hover {
      opacity: 0.5;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>👀</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
