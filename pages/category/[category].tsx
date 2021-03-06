import { Container, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ResultsArea from '../../src/ResultsArea';
import { Recipe } from '../../src/Interfaces/Types';

interface CategoryPageProps {
  recipesProp: Recipe[];
  category: string;
}

export default function CategoryPage({ recipesProp, category }: CategoryPageProps) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.1 }}
    >
      <Container maxW={'5xl'}>
        <ResultsArea recipes={recipesProp} showEmpty={false} customText={category} />
      </Container>
    </motion.div>
  );
}

export async function getServerSideProps(context: any) {
  const category = context.params.category;

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const recipesProp: Recipe = data.meals;

  return {
    props: { recipesProp, category },
  };
}
