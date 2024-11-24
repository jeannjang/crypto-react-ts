import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  accentA: "lightcoral",
  accentB: "#D3E7F0",
  accentC: "#184E7A",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#f5f6fa",
  accentA: "#e84118", // 라이트 테마의 lightcoral의 어두운 버전
  accentB: "#192a56", // 라이트 테마의 #D3E7F0의 어두운 버전
  accentC: "#74b9ff", // 라이트 테마의 #184E7A의 밝은 버전
};
