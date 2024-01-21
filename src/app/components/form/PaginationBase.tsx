import { Flex, Pagination } from "@mantine/core";
export default function PaginationBase({
  activePage,
  setPage,
  totalPage,
}: any) {
  return (
    <Flex justify={"end"} bg={"#fff"}>
      <Pagination
        total={Number(totalPage)}
        value={activePage}
        onChange={setPage}
        mt={"auto"}
      />
    </Flex>
  );
}
