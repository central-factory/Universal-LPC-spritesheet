
import { ensureFile, writeJSON } from 'fs-extra';

type AnimationDef = {
  name: string;
  row: number;
  col: number;
  frames: number;
}

type BodyTypeDef = {
  name: string;
  width: number;
  height: number;
  fileWidth: number;
  fileHeight: number;
}

const animations: AnimationDef[] = [
  {
    name: "idle/north",
    row: 0,
    col: 0,
    frames: 4,
  },
];

const bodyTypes: BodyTypeDef[] = [
  {
    name: "female",
    width: 64,
    height: 64,
    fileWidth: 832,
    fileHeight: 1344,
  },
  {
    name: "male",
    width: 64,
    height: 64,
    fileWidth: 832,
    fileHeight: 1344,
  },
];

const generateFrames = (
  fileWidth: number,
  fileHeight: number,
  spriteWidth: number,
  spriteHeight: number,
  animations: AnimationDef[]
) => {
  animations.map((animation) =>
    Array(animation.frames)
      .fill(null)
      .map((frame, index) => ({
        filename: animation.name,
        rotated: false,
        trimmed: false,
        sourceSize: {
          w: fileWidth,
          h: fileHeight,
        },
        spriteSourceSize: {
          x: (animation.col + index) * spriteWidth + index * spriteWidth,
          y: animation.row * spriteHeight,
          w: spriteWidth,
          h: spriteHeight,
        },
        frame: {
          x: (animation.col + index) * spriteWidth + index * spriteWidth,
          y: animation.row * spriteHeight,
          w: spriteWidth,
          h: spriteHeight,
        },
      }))
  );
};

const getFileName = (bodyType: BodyTypeDef) => `/assets/characters/animations/${bodyType.name}/animations.json`;

const generateFileContent = (bodyType: BodyTypeDef, animations: AnimationDef[]) => ({
  textures: [
    {
      image: getFileName(bodyType),
      "format": "RGBA8888",
      "size": {
        "w": bodyType.fileWidth,
        "h": bodyType.fileHeight
      },
      "scale": 1,
      "frames": generateFrames(
        bodyType.fileWidth,
        bodyType.fileHeight,
        bodyType.width,
        bodyType.height,
        animations
      )
    }
  ]
});


(async () => {
  Promise.all(bodyTypes.map(async (bodyType) => {
    const destination = process.cwd() + getFileName(bodyType);
    const content = generateFileContent(bodyType, animations);

    await ensureFile(destination);

    return writeJSON(destination, content, {
      spaces: 2
    });
  }))
})();