// react-app-env.d.ts

/// <reference types="react-scripts" />

declare module '*.png' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpg' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpeg' {
    const value: any;
    export = value;
  }
  
  declare module '*.gif' {
    const value: any;
    export = value;
  }
  
  declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }