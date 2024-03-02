import { Button, Group, Modal } from "@mantine/core";
import { IconBan, IconChevronRight } from "@tabler/icons-react";

export default function ModalCategoriesDLBD({
  openedModalCategories,
  closeModalCategories,
}: any) {
  return (
    <Modal
      title="Đồng bộ danh mục"
      opened={openedModalCategories}
      onClose={closeModalCategories}
      lockScroll={false}
    >
      <div>đồng bộ</div>
    </Modal>
  );
}
