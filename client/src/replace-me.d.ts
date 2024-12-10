declare module 'replace-me' {
    export default class ReplaceMe {
      constructor(element: HTMLElement, options: {
        animation?: string;
        speed?: number;
        separator?: string;
        loopCount?: number | 'infinite';
        autoRun?: boolean;
      });
    }
  }