import HomeModals from '@/components/homepage/HomeModals';
import AttendanceInfoModal from '@/components/room/AttendanceInfoModal';
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
          onConfirm={() => {
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
          onConfirm={() => {
            closeModal();
          }}
        />
      );
    case 'drawing':
      return <DrawingModal isOpen={isOpen} onClose={closeModal} />;
    case 'info':
      return <AttendanceInfoModal isOpen={isOpen} onClose={closeModal} />;
    default:
      return null;
  }
}

export default Modals;
