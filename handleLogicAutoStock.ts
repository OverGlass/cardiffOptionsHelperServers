import { LOGIC_AUTO_STOCK_JSON_PATH } from "./asyncLogicAutoStock.ts";

interface auto {
  auto_id: string;
  brand: string;
  model: string;
  engine: string;
  version: string;
  gearbox: string;
  reference: string;
  chassis: string;
  plate: string;
  Okm_v0: string;
  color: string;
  type: string;
  fuel: string;
  kind: string;
  transmission: string;
  num_doors: string;
  num_gears: string;
  num_places: string;
  power_dyn: string;
  power_fisc_fr: string;
  power_kwh: string;
  displacement: string;
  emissions_co2_nedc: string;
  emissions_co2_wltp: string;
  equipment: string;
  price_includ_vat: string;
  price_without_vat: string;
  registration_date: string;
  last_registration_date: string;
  availability: string;
  kms: string;
  warranty: string;
  warranty_date: string;
  product_details: string;
  year: string;
  expertise_url: string;
  expertise_price: string;
  natcode: string;
  jatoid: string;
  normative: string;
  catalogue_price: string;
  country: string;
  warranty_kms: string;
  warranty_extra: string;
  photos: Array<string>;
}

const headerTranslate = {
  reference: "Référence",
  brand: "Marque",
  engine: "Moteur",
  version: "Version",
  color: "Couleur",
  Okm_v0: "VO/VN",
  fuel: "Energie",
  kind: "Type",
  availability: "Disponibilité",
  registration_date: "Date d'enregistrement",
  kms: "kms",
  price_without_vat: "Prix HT",
};
async function getLogicAutoStock(): Promise<auto[]> {
  return JSON.parse(await Deno.readTextFile(LOGIC_AUTO_STOCK_JSON_PATH));
}

export async function searchLogicAuto(term: string): Promise<auto[]> {
  const stock = await getLogicAutoStock();
  return stock.filter(
    (x) =>
      `${x.brand} ${x.model}`.toUpperCase().indexOf(term.trim().toUpperCase()) >
      -1
  );
}
