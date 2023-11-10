import sacPoigneeBlancLogo from "../assets/img/Sac_PoignetBlanc.png";
import sacPoigneeBrun from "../assets/img/Sac_PoignetBrun.png";
import sacPoigneePlatBlanc from "../assets/img/Sac_PoignetBlanc.png";

export const products = [
  {
    id: 1,
    name: "Le sac avec poignet",
    category: "le sac",
    type: "avec poignet",
    price: 12,
    dataColor: "#E8EBFA",
    quantity: 1,
    dimensions: [
      { dimensionName: "standard", dimensionsCM: "30-16-40 cm" },
      { dimensionName: "petit model", dimensionsCM: "10-15-30 cm" },
    ],
    img: [sacPoigneeBlancLogo, sacPoigneeBrun],
    colorSac: ["Blanc", "Brun"],
  },

  {
    id: 2,
    name: "Le sac sos",
    category: "le sos",
    type: "sos",
    dataColor: "#E8EBFA",
    price: 24,
    quantity: 1,
    dimensionName: ["standard", "petit model"],
    dimensionStandard: "30-16-40 cm",
    dimensionPetitModel: "10-15-30 cm",
    img: [sacPoigneeBlancLogo, sacPoigneeBrun],
    colorSac: ["Blanc", "Brun"],
  },
];
