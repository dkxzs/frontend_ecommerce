import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteProduct } from "../../../../services/productServices";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { toast } from "react-toastify";

const ModalDeleteProduct = (props) => {
  const {
    openModalDelete,
    setOpenModalDelete,
    dataDelete,
    setDataDelete,
    refetch,
  } = props;

  const mutation = useMutationHook((id) => deleteProduct(id), {
    onSuccess: (data) => {
      if (+data.EC === 0) {
        toast.success(data.EM);
        setDataDelete({});
        refetch();
      } else {
        toast.error(data.EM);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(dataDelete);
    setOpenModalDelete(false);
  };

  return (
    <>
      <Modal
        show={openModalDelete}
        size="lg"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có muốn xoá sản phẩm này không ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={(e) => handleSubmit(e)}>
                Có
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
