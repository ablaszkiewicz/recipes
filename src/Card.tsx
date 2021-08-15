import { Heading, Avatar, Box, Center, Text, Stack, Button, Link, Badge, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import { Recipe } from './Interfaces/Types';

interface CardProps {
  recipe: Recipe;
}

export default function Card({ recipe }: CardProps) {
  const router = useRouter();

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
  };

  return (
    <motion.div
      key={recipe.strMeal}
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      onClick={() =>
        router.push(
          {
            pathname: `dishes/${recipe.idMeal}`,
          },
          undefined,
          { scroll: false }
        )
      }
    >
      <Center>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'lg'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          cursor={'pointer'}
        >
          <Avatar size={'xl'} src={recipe.strMealThumb} alt={'Avatar Alt'} mb={4} pos={'relative'} />
          <Heading fontSize={'3xl'} fontFamily={'body'} noOfLines={1}>
            {recipe.strMeal}
          </Heading>
          <Text fontSize={'xl'} fontWeight={600} color={'gray.500'} mb={4}>
            Italian
          </Text>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'} fontSize={'md'}>
              #vegetarian
            </Badge>
          </Stack>
        </Box>
      </Center>
    </motion.div>
  );
}
