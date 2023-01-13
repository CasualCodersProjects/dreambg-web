// creates the image URL from the folder and file name
import { PUBLIC_R2_URL } from "@/constants/r2";

export const createImageURL = (
  folder: string,
  fileName: string,
  resolution = ""
) => {
  if (resolution) {
    // add -resolution to the folder
    folder = folder + "-" + resolution;
    // replace the ending of the file (either .png or .jpeg) with -resolution.ending
  }
  return `${PUBLIC_R2_URL}/${folder}/${fileName}`;
};
