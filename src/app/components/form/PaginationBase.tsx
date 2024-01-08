import { Flex, Pagination } from "@mantine/core";
export default function PaginationBase({ activePage, setPage }: any) {
  return (
    <Flex justify={"end"} bg={"#fff"}>
      <Pagination total={3} value={activePage} onChange={setPage} mt={"auto"} />
    </Flex>
  );
}
