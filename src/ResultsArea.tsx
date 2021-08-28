import { Text, SimpleGrid, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from '../src/Card';
import { AnimatePresence, motion } from 'framer-motion';
import { Recipe } from './Interfaces/Types';

interface ResultsAreaProps {
  showEmpty: boolean;
  recipes?: Recipe[];
}

export default function ResultsArea({ recipes, showEmpty }: ResultsAreaProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  useEffect(() => {
    console.log('new recipes are:');
    console.log(recipes);
  }, []);

  return (
    <motion.div>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
      >
        <Text fontFamily={'Lato'} fontSize={'5xl'} mb={'5'}>
          Results
        </Text>
      </motion.div>

      <AnimatePresence>
        {showEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1, ease: 'easeOut', duration: 0.5 } }}
            exit={{ opacity: 0 }}
          >
            <Center h='0'>
              <Text fontSize='2xl' mt='10' fontWeight='100'>
                Search for something
              </Text>
            </Center>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
      >
        {recipes && recipes.length > 0 && (
          <motion.div variants={containerVariants} initial='hidden' animate='show'>
            <SimpleGrid columns={[1, 2, 3]} spacing='40px' overflow='none'>
              {recipes?.map((recipe) => (
                <Card recipe={recipe} key={recipe.idMeal} />
              ))}
            </SimpleGrid>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
