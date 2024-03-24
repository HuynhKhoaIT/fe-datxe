import { Button, Group, Modal } from "@mantine/core";
import { IconBan, IconChevronRight } from "@tabler/icons-react";

export default function ModalDeleteItem({
  openedDeleteItem,
  closeDeleteItem,
  handleDeleteItem,
  deleteRow,
}: any) {
  return (
    <Modal
      title="Xoá sản phẩm"
      opened={openedDeleteItem}
      onClose={closeDeleteItem}
      lockScroll={false}
    >
      <div>Bạn có muốn xoá không?</div>
      <Group justify="end" style={{ marginTop: 10 }}>
        <Button
          size="lg"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          variant="filled"
          key="cancel"
          onClick={closeDeleteItem}
          color="red"
          leftSection={<IconBan />}
        >
          Huỷ bỏ
        </Button>
        <Button
          size="lg"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          style={{ marginLeft: "12px" }}
          onClick={() => {
            closeDeleteItem();
            handleDeleteItem(deleteRow);
          }}
          variant="filled"
          leftSection={<IconChevronRight />}
        >
          Tiếp tục
        </Button>
      </Group>
    </Modal>
  );
}
