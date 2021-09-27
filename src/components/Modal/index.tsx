import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

// Dica: Verifique se na estrutura existe os códigos this.props, vai ajudar para definir essa parte
interface ModalProps{
  children: any
  isOpen: boolean
  setIsOpen: () => void
}

export function Modal({ children, isOpen, setIsOpen }: ModalProps){
  // Dica: toda vez que o código citar this.state deve colocar o useState
  const [modalStatus, setModalStatus] = useState(isOpen)

  useEffect(() => {
    setModalStatus(isOpen)
  }, [isOpen])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}

      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}

    >
      {children}
    </ReactModal>
  )
}