import { apiUrl } from "@/constants";
import RenderContext from "../components/elements/RenderContext";
import LandingPageDesktop from "../layout/desktop/trang-chu";
import LandingPageMobile from "../layout/mobile/trang-chu";
export const revalidate = 0;

async function getData() {
  const garageId = 9;
  const res = await fetch(`${apiUrl}api/product-category?gara=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  let categories = await getData();
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: LandingPageDesktop,
        },
        mobile: {
          defaultTheme: LandingPageMobile,
        },
      }}
      categories={categories}
    />
  );
}
