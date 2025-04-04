import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atoms/themeAtom";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilState } from "recoil";
import styled from "styled-components";

//define the global styles
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.accentC};
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  color: ${(props) => props.theme.textColor};
  z-index: 9999;
  transition: all 0.3s ease;
`;

function App() {
  // const isDark = useRecoilValue(isDarkAtom);
  // const setIsDark = useSetRecoilState(isDarkAtom);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ThemeToggle onClick={toggleTheme}>{isDark ? "☼" : "⏾"}</ThemeToggle>
      <Router />
    </ThemeProvider>
  );
}

export default App;
