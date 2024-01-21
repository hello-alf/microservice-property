export class UploadPhotoCommand {
  constructor(
    public readonly files: Express.Multer.File[],
    public readonly id: string,
  ) {}
}
