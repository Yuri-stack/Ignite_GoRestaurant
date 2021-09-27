import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

// Dica: Verifique se na estrutura existe os códigos this.props, vai ajudar para definir essa parte
interface FoodPlateProps{
    id: number
    name: string
    image: string
    description: string
    price: string
    available: boolean
}

// Dica: Verifique os campos antes do Modal para saber o que o Componente espera
interface FoodProps{
  food: FoodPlateProps
  handleEditFood: (food: FoodPlateProps) => {}
  handleDelete: (id: number) => {}
}

export function Food({ food, handleEditFood, handleDelete } : FoodProps){
    // Dica: toda vez que o código citar this.state deve colocar o useState
    const [isAvailable, setIsAvailable] = useState(food.available)

    // Verificar pq tem que ser Async
    async function toggleAvailable(): Promise<void> {
        setIsAvailable(!isAvailable)
    }

    function setEditingFood(): void{
        handleEditFood(food);
    }

    return (
        <Container available = { isAvailable }>
            <header>
                <img src={ food.image } alt={ food.name } />
            </header>

            <section className="body">
                <h2>{ food.name }</h2>
                <p>{ food.description }</p>
                <p className="price">
                    R$ <b>{food.price}</b>
                </p>
            </section>

            <section className="footer">
                <div className="icon-container">
                    <button
                        type="button"
                        className="icon"
                        onClick={ () => setEditingFood() }
                        data-testid={`edit-food-${food.id}`}
                    >
                        <FiEdit3 size={ 20 } />
                    </button>

                    <button
                        type="button"
                        className="icon"
                        onClick={ () => handleDelete(food.id)}
                        data-testid={`remove-food-${food.id}`}
                    >
                        <FiTrash size={20} />
                    </button>
                </div>

                <div className="availability-container">
                    <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>
                    <label htmlFor={`available-switch-${food.id}`} className="switch">
                        <input 
                            id={`available-switch-${food.id}`}
                            type="checkbox"
                            checked={isAvailable}
                            onChange={toggleAvailable}
                            data-testid={`change-status-food-${food.id}`}
                        />
                        <span className="slider" />
                    </label>
                </div>
            </section>
        </Container>
    )
}