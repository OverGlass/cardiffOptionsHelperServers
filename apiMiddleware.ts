import { Status } from "https://deno.land/std@0.73.0/http/http_status.ts";
import {
  Context,
  cardiffFormatter,
  isCardiffFormatterParamTypeSafe,
  fetchLogicAutoPdf,
  getArrayOfAvailableEquiments,
  getArrayOfNotAvailableEquiments,
  getArrayOfOptions,
  getPdfTextFromBinary,
} from "./deps.ts";

export async function $cardiffFormatter(c: Context, next: any) {
  await next();
  const requestBodyValue = await c.request.body()?.value;

  if (!(typeof requestBodyValue === "string"))
    statusResponsesError(c, Status.BadRequest, "Expecting JSON");

  const payload = JSON.parse(requestBodyValue);

  if (!isCardiffFormatterParamTypeSafe(payload))
    statusResponsesError(c, Status.BadRequest, "Missing types");

  c.response.status = 200;
  c.response.type = "json";
  c.response.body = JSON.stringify(cardiffFormatter(payload));
}

export async function $getLogicAutoTextsbyRef(c: Context, next: any) {
  const requestBodyValue = await c.request.body()?.value;

  if (!(typeof requestBodyValue === "string"))
    statusResponsesError(c, Status.BadRequest, "Expecting JSON");

  const payload = JSON.parse(requestBodyValue);
  if (!payload.ref)
    statusResponsesError(c, Status.BadRequest, "Missing ref prop");
  try {
    await next();
    const PDF = await fetchLogicAutoPdf(payload.ref);
    const text = await getPdfTextFromBinary(payload.ref, PDF);
    c.response.status = 200;
    c.response.type = "json";
    c.response.body = JSON.stringify({
      options: getArrayOfOptions(text),
      standardEquipements: getArrayOfAvailableEquiments(text),
      notAvailableStandardEquipements: getArrayOfNotAvailableEquiments(text),
    });
  } catch (e) {
    statusResponsesError(c, Status.BadRequest, e);
  }
}

function statusResponsesError(c: Context, status: number, e: any) {
  console.log(e);
  c.response.status = status;
  c.response.body = JSON.stringify({ error: e.message ? e.message : e });
}
