// @path: @/app/lib/builder/errors.ts
export class DuplicateSceneIdError extends Error {
  constructor(sceneId: string) {
    super(`Scene ${sceneId} already exists`);
  }
}