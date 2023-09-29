import sacPoigneeBlancLogo from "../assets/img/Sac_PoignetBlanc_logo.png";
import sacPoigneeBrun from "../assets/img/Sac_PoignetBrun_logo.png";

export const products = [
  {
    id: 1,
    name: "Le sac avec poignet",
    category: "le sac",
    type: "avec poignet",
    price: 12,
    quantity: 1,
    dimensionName: ["standard", "petit model"],
    dimensionStandard: "30-16-40 cm",
    dimensionPetitModel: "10-15-30 cm",
    img: sacPoigneeBlancLogo,
    colorSac: "Blanc",
  },
  {
    id: 2,
    name: "Le sac avec poignet",
    category: "le sac",
    type: "avec poignet",
    price: 12,
    quantity: 1,
    dimensionName: ["standard", "petit model"],
    dimensionStandard: "30-16-40 cm",
    dimensionPetitModel: "10-15-30 cm",
    img: sacPoigneeBrun,
    colorSac: "Brun",
  },
  {
    id: 3,
    name: "Le sac sos",
    category: "le sos",
    type: "",
    price: 24,
    quantity: 1,
    dimensionName: ["standard", "petit model"],
    dimensionStandard: "30-16-40 cm",
    dimensionPetitModel: "10-15-30 cm",
    img: [sacPoigneeBlancLogo, sacPoigneeBrun],
    colorSac: ["Blanc", "Brun"],
  },
];
