import sacPlat3d from "../assets/objects/sacPlat.gltf";
import sacSOS from "../assets/objects/sacSOS.gltf";
import sacTors from "../assets/objects/sacTors.gltf";

export const products = [
  {
    id: 1,
    name: "Le sac avec poignet",
    category: "le sac",
    objet: sacPlat3d,
    type: "plat",
    price: 12,
    quantity: 1,
    dimensions: [
      { dimensionName: "standard", dimensionsCM: "30-16-40 cm" },
      { dimensionName: "petit model", dimensionsCM: "10-15-30 cm" },
    ],
    colorSac: [
      { colorName: "Blanc", colorData: "#ffffff" },
      { colorName: "Brown", colorData: "#d7ae55" },
    ],
  },
  {
    id: 2,
    name: "Le SOS",
    category: "le sac",
    objet: sacSOS,
    type: "sos",
    price: 12,
    quantity: 1,
    dimensions: [
      { dimensionName: "standard", dimensionsCM: "30-16-40 cm" },
      { dimensionName: "petit model", dimensionsCM: "10-15-30 cm" },
    ],
    colorSac: [
      { colorName: "Blanc", colorData: "#ffffff" },
      { colorName: "Brown", colorData: "#d7ae55" },
    ],
  },
  {
    id: 3,
    name: "Le Torsade",
    category: "le sac",
    objet: sacTors,
    type: "tors",
    price: 12,
    quantity: 1,
    dimensions: [
      { dimensionName: "standard", dimensionsCM: "30-16-40 cm" },
      { dimensionName: "petit model", dimensionsCM: "10-15-30 cm" },
    ],
    colorSac: [
      { colorName: "Blanc", colorData: "#ffffff" },
      { colorName: "Brown", colorData: "#d7ae55" },
    ],
  },
];
