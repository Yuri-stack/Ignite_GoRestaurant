import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import api from '../../services/api';

import { FoodsContainer } from './styles';

interface FoodPlateProps {
  id: number
  name: string
  image: string
  description: string
  price: string
  available: boolean
}

export function Dashboard() {
  const [isFood, setIsFood] = useState<FoodPlateProps[]>([])
  const [isEditingFood, setIsEditingFood] = useState<FoodPlateProps>({} as FoodPlateProps)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods')
      setIsFood(response.data)
    }

    loadFoods()
  }, [])

  async function handleAddFood(food: Omit<FoodPlateProps, 'id' | 'available'>): Promise<void> {
    try {
      // const { name, image, description, price } = food
      const response = await api.post('/foods', {
        ...food,
        available: true
      })

      setIsFood(state => [...state, response.data])

    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: Omit<FoodPlateProps, 'id' | 'available'>): Promise<void> {
    try {
      const response = await api.put(`/foods/${isEditingFood.id}`, {
        ...isEditingFood,
        ...food
      })

      const foodsUpdated = isFood.filter(item => item.id !== isEditingFood.id)

      setIsFood([...foodsUpdated, response.data])

    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = isFood.filter(food => food.id !== id);

    setIsFood(foodsFiltered)
  }

  function toggleModal(): void {
    setIsModalOpen(!isModalOpen)
  }

  function toggleEditModal(): void {
    setIsEditModalOpen(!isEditModalOpen)
  }

  function handleEditFood(food: FoodPlateProps) {
    setIsEditingFood(food)
    setIsEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={isEditingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {isFood &&
          isFood.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
