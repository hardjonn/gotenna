import { NavigationEffects } from './navigation.effects';
import { UiEffects } from './ui.effects';
import { ErrorEffects } from './error.effects';
import { UserEffects } from './user.effects';
import { ImageEffects } from './image.effects';

export const rootEffects: any[] = [
  NavigationEffects,
  UiEffects,
  ErrorEffects,
  UserEffects,
  ImageEffects,
];

export * from './navigation.effects';
export * from './ui.effects';
export * from './error.effects';
export * from './config.effects';
export * from './login.effects';
export * from './upload.effects';
