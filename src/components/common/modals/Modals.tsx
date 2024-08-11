import HomeModals from '@/components/homepage/HomeModals';
import DrawingModal from '@/components/room/DrawingModal';
import useModalStore from '@/store/modalStore';

function Modals() {
  const { modalType, isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  switch (modalType) {
    case 'create':
      return (
        <HomeModals
          isOpen={isOpen}
          onClose={closeModal}
          type='create'
          onConfirm={(roomName) => {
            closeModal();
          }}
        />
      );
    case 'join':
      return (
        <HomeModals
          isOpen={isOpen}
          onClose={closeModal}
          type='join'
          onConfirm={(code) => {
            closeModal();
          }}
        />
      );
    case 'drawing':
      return <DrawingModal isOpen={isOpen} onClose={closeModal} />;
    default:
      return null;
  }
}

export default Modals;
