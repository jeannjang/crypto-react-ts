import React, { useState } from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  keyframes,
} from "styled-components";

const darkTheme = {
  colors: {
    bgColor: "black",
    txtColor: "white",
  },
};

const lightTheme = {
  colors: {
    bgColor: "white",
    txtColor: "darkslategray",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.bgColor};
    color: ${(props) => props.theme.colors.txtColor};
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.txtColor};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 60px;
  background-color: ${(props) => props.theme.colors.bgColor};
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

const ThemeToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Title>React Styled Components</Title>
        <Box>
          <Emoji>👀</Emoji>
        </Box>
        <ThemeToggleButton onClick={toggleTheme}>
          Toggle Theme
        </ThemeToggleButton>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
