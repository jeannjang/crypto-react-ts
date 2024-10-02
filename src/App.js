import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;
const Btn = styled.button`
  background-color: ${(props) => props.bgColor};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px;
`;

function App() {
  return (
    <Father>
      <Btn bgColor="red">버튼1</Btn>
      <Btn as="a" href="/" bgColor="blue">
        버튼2
      </Btn>
    </Father>
  );
}

export default App;
