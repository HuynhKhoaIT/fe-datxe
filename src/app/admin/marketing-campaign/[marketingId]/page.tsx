import React from "react";
import { apiUrl } from "@/constants";
import MarketingCampaignForm from "../choose-products/MarketingCampaignForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getDataMarketing(marketingId: number) {
  const res = await fetch(
    `${apiUrl}api/marketing-campaign/${Number(marketingId)}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function MarketingSavePage({
  params,
}: {
  params: { marketingId: number };
}) {
  const marketingDetail = await getDataMarketing(params.marketingId);
  return (
    <div>
      <MarketingCampaignForm isEditing={true} dataDetail={marketingDetail} />
    </div>
  );
}
