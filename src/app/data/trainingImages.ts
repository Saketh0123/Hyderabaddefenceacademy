import { assetUrl } from "./assetUrl";

const trainingImagePaths: string[] = [
  // Add Training image paths from public/training-images/.
  // Example:
  // "/training-images/training-1.jpg",
  // "/training-images/training-2.jpg",
  "/training-images/C4149T01.JPG",
  "/training-images/C4150T01.JPG",
  "/training-images/C4151T01.JPG",
  "/training-images/C4164T01.JPG",
  "/training-images/C4166T01.JPG",
  "/training-images/C4179T01.JPG",
  "/training-images/C4182T01.JPG",
  "/training-images/C4271T01.JPG",
  "/training-images/C4384T01.JPG",
  "/training-images/C4396T01.JPG",
  "/training-images/DJI_20251026165140_0291_D.JPG",
  "/training-images/DJI_20251026171332_0307_D.JPG",
  "/training-images/DJI_20251120124745_0269_D.JPG",
  "/training-images/DJI_20251120165312_0328_D.JPG",
  "/training-images/DJI_20251130134535_0230_D.JPG",
  "/training-images/DJI_20251130134851_0237_D.JPG",
  "/training-images/DJI_20251130134854_0238_D.JPG",
  "/training-images/_DSC4324.JPG",
  "/training-images/_DSC4325.JPG",
  "/training-images/_DSC4327.JPG",
  "/training-images/_DSC4332.JPG",
  "/training-images/_DSC4349.JPG",
  "/training-images/_DSC4363.JPG",
  "/training-images/_DSC4376.JPG",
  "/training-images/_DSC4397.JPG",
  "/training-images/_DSC4599.JPG",
];

export const trainingImages: string[] = trainingImagePaths.map(assetUrl);
