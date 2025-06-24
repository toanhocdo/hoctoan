import styles from './FlashCards.module.css';
import { useState } from 'react';

interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

interface FlashCardsProps {
  cards: FlashCard[];
}

export default function FlashCards({ cards }: FlashCardsProps) {
  const [flippedCards, setFlippedCards] = useState<{[key: string]: boolean}>({});

  const toggleCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={styles.flashcardsContainer}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${styles.card} ${flippedCards[card.id] ? styles.flipped : ''}`}
          onClick={() => toggleCard(card.id)}
        >
          <div className={styles.cardInner}>
            <div className={styles.cardFront}>
              <div className={styles.content}>{card.question}</div>
            </div>
            <div className={styles.cardBack}>
              <div className={styles.content}>{card.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
