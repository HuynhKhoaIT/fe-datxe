import { Button, Group, Modal } from "@mantine/core";
import { IconBan, IconChevronRight } from "@tabler/icons-react";

export default function ModalDeleteProduct({
  openedDeleteProduct,
  closeDeleteProduct,
  handleDeleteProduct,
  deleteRow,
}: any) {
  return (
    <Modal
      title="Xoá sản phẩm"
      opened={openedDeleteProduct}
      onClose={closeDeleteProduct}
      lockScroll={false}
    >
      <div>Bạn có muốn xoá không?</div>
      <Group justify="end" style={{ marginTop: 10 }}>
        <Button
          size="lg"
          radius={0}
          variant="filled"
          key="cancel"
          onClick={closeDeleteProduct}
          color="red"
          leftSection={<IconBan />}
        >
          Huỷ bỏ
        </Button>
        <Button
          size="lg"
          radius={0}
          style={{ marginLeft: "12px" }}
          onClick={() => {
            closeDeleteProduct();
            handleDeleteProduct(deleteRow);
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
