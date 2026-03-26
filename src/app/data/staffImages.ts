import { assetUrl } from "./assetUrl";

export type StaffImage = {
  id: string;
  image: string;
};

const staffImagePaths: StaffImage[] = [
  // Add staff image entries from public/staff-images/.
  // Example:
  // { id: "staff-1", image: "/staff-images/staff-1.jpg" },
  // { id: "staff-2", image: "/staff-images/staff-2.jpg" },
  { id: "1", image: "/staff-images/1.png" },
  { id: "2", image: "/staff-images/2.png" },
  { id: "3", image: "/staff-images/3.png" },
  { id: "4", image: "/staff-images/4.png" },
  { id: "5", image: "/staff-images/5.png" },
  { id: "6", image: "/staff-images/6.png" },
  { id: "7", image: "/staff-images/7.png" },
  { id: "8", image: "/staff-images/8.png" },
  { id: "9", image: "/staff-images/9.png" },
  { id: "10", image: "/staff-images/10.png" },
];

export const staffImages: StaffImage[] = staffImagePaths.map((staff) => ({
  ...staff,
  image: assetUrl(staff.image),
}));
