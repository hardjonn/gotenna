export interface NavigationModel {
  previousUrl: string;
  currentUrl: string;
}

export type NavigationState = NavigationModel | null;
