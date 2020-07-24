declare module "react-types" {
  export type useStatePair<T> = [
    T,
    import("react").Dispatch<import("react").SetStateAction<T>>
  ];

  export interface StyledComponent {
    style?: import("react").CSSProperties;
  }
}
