import { useCallback, useRef } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface FoodPlateProps{
  id: number
  name: string
  image: string
  description: string
  price: string
  available: boolean
}

interface ModalEditFoodProps{
  isOpen: boolean
  setIsOpen: () => void
  editingFood: FoodPlateProps
  handleUpdateFood: (food: Omit<FoodPlateProps, 'id' | 'available'>) => void
}

export function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood } : ModalEditFoodProps){

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: Omit<FoodPlateProps, 'id' | 'available'>) => {
      handleUpdateFood(data)
      setIsOpen()
    },[handleUpdateFood, setIsOpen]
  )

  return (
    <Modal isOpen={ isOpen } setIsOpen={ setIsOpen }>
      <Form ref={ formRef } onSubmit={ handleSubmit } initialData={ editingFood }>

        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}