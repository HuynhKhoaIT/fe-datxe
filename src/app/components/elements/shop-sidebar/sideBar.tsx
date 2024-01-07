import { SideBarItem } from "./sidebarItem";
export function SideBarFilter({
  data = [],
  filterName = "Filter",
  keyName,
}: any) {
  return (
    <div className="shop-sidebar">
      <div className="shop-widget">
        <h4 className="shop-widget-title">{filterName}</h4>
        <ul>
          {data?.map((item: any, index: number) => (
            <SideBarItem dataDetail={item} key={index} keyName={keyName} />
          ))}
        </ul>
      </div>
    </div>
  );
}
