export interface ActionGroup {
  name: string;
  title: string;
  type?: string;
  class?: string;
  action?: () => void;
}
