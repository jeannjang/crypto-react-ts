import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentA: string;
    accentB: string;
    accentC: string;
  }
}
