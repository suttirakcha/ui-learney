"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Card {
  text: string;
  color: string;
}

interface DisplayedCard extends Card {
  id: number;
  driftX: number;
  driftY: number;
  left: string;
  top: string;
}

interface FloatingCardsAnimationProps {
  cards: Card[];
  className?: string;
}

const CARD_APPEAR_DELAY_MS = 1500;
const CARD_DISPLAY_DURATION_MS = 8000;

function buildCardLayout(index: number) {
  return {
    driftX: index % 2 === 0 ? 18 : -18,
    driftY: index % 3 === 0 ? -14 : 14,
    left: `${12 + ((index * 19) % 62)}%`,
    top: `${10 + ((index * 23) % 56)}%`,
  };
}

export function FloatingCardsAnimation({
  cards = [],
  className = "",
}: FloatingCardsAnimationProps) {
  const [displayedCards, setDisplayedCards] = useState<DisplayedCard[]>([]);
  const nextCardIdRef = useRef(0);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIdsRef.current = [];

    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      const appearanceTimeoutId = window.setTimeout(() => {
        const cardId = nextCardIdRef.current++;
        const nextCard: DisplayedCard = {
          ...card,
          id: cardId,
          ...buildCardLayout(index),
        };

        setDisplayedCards((prev) => [...prev, nextCard]);

        const removalTimeoutId = window.setTimeout(() => {
          setDisplayedCards((prev) => prev.filter((item) => item.id !== cardId));
        }, CARD_DISPLAY_DURATION_MS);

        timeoutIdsRef.current.push(removalTimeoutId);
      }, index * CARD_APPEAR_DELAY_MS);

      timeoutIdsRef.current.push(appearanceTimeoutId);
    });

    return () => {
      timeoutIdsRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      timeoutIdsRef.current = [];
    };
  }, [cards]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {displayedCards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute text-white text-sm md:text-base lg:text-lg font-medium px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl bg-gradient-to-br"
            style={{
              backgroundImage: `linear-gradient(135deg, ${card.color})`,
              left: card.left,
              top: card.top,
              zIndex: 10 - index,
            }}
            initial={{
              scale: 0,
              opacity: 0,
              rotate: -20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              x: [0, card.driftX, 0],
              y: [0, card.driftY, 0],
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              rotate: 20,
              transition: { duration: 0.6 },
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {card.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background particle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-white/30 rounded-full"
            style={{
              left: `${(i * 30) % 100}%`,
              top: `${(i * 25) % 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
