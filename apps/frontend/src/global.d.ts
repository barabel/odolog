/// <reference types="react" />

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

type FCClass<P = object> = React.FC<P & React.PropsWithChildren & {
  className?: string;
}>;

type GetElementTypeFromArray<T> = T extends (infer U)[] ? U : never;
