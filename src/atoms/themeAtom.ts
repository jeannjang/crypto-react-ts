import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: sessionStorage.getItem("theme") === "dark", // 초기값 설정
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        // 테마 변경시 실행되는 함수
        sessionStorage.setItem("theme", newValue ? "dark" : "light");
      });
    },
  ],
});
