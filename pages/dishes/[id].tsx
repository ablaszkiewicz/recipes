import Head from 'next/head';
import {
  Badge,
  Button,
  Center,
  Container,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { motion } from 'framer-motion';
import { Recipe } from '../../src/Interfaces/Types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addLikedRecipe, removeLikedRecipe, selectLikedRecipes } from '../../src/redux/recipeRatingSlice';

export default function Product() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const [liked, setLiked] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [ingredients, setIngredients] = useState<string[] | undefined>();
  const [tags, setTags] = useState<string[] | undefined>();
  const likedIds = useAppSelector(selectLikedRecipes);

  useEffect(() => {
    console.log('id is ' + id);
    fetchRecipeDetails();
    window.scrollTo(0, 0);
  }, []);

  async function fetchRecipeDetails() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    const recipeTemp: Recipe = data.meals[0];
    const keys = Object.keys(recipeTemp).filter((key) => key.startsWith('strIngredient'));
    const ingredientsTemp: string[] = Array();

    for (let key in keys) {
      const ingredient = data.meals[0][keys[key]];
      if (ingredient == '') break;
      else ingredientsTemp.push(ingredient);
    }

    if (recipeTemp.strTags) {
      setTags(recipeTemp.strTags.split(','));
    }

    console.log(ingredientsTemp);

    setRecipe(recipeTemp);
    setIngredients(ingredientsTemp);
    setLiked(likedIds.includes(+recipeTemp.idMeal));
  }

  const likeClicked = () => {
    setLiked(!liked);
    if (recipe && !liked) {
      dispatch(addLikedRecipe(+recipe.idMeal));
    } else if (recipe && liked) {
      dispatch(removeLikedRecipe(+recipe.idMeal));
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.1 }}
    >
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap' rel='stylesheet' />
      </Head>

      <SimpleGrid h={'100vh'} columns={[1, 2]}>
        <GridItem gridRow={[1, 1]} my={[5, 0]}>
          <Container maxW='3xl'>
            <Center h={[null, '100vh']}>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeOut', duration: 0.3, delay: 0.2 }}
              >
                <Image objectFit='cover' src={recipe?.strMealThumb} />
              </motion.div>
            </Center>
          </Container>
        </GridItem>
        <GridItem my={[5, 0]}>
          <Container maxW='3xl'>
            <Center h={[null, '100vh']}>
              <VStack spacing='5'>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: 'easeOut', duration: 0.3, delay: 0 }}
                >
                  <Text fontFamily={'Lato'} fontSize={['4xl', '5xl']}>
                    {recipe?.strMeal}
                  </Text>
                </motion.div>

                {tags && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeOut', duration: 0.3, delay: 0.1 }}
                  >
                    {tags.map((tag) => (
                      <Badge fontSize='lg' px='2' mx='4'>
                        #{tag}
                      </Badge>
                    ))}
                  </motion.div>
                )}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: 'easeOut', duration: 0.3, delay: 0.2 }}
                >
                  <Text fontSize='xl' fontWeight='bold'>
                    {recipe?.strCategory}
                  </Text>
                </motion.div>
                <HStack>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeOut', duration: 0.3, delay: 0.3 }}
                  >
                    <Button
                      onClick={() =>
                        router.push(
                          {
                            pathname: '/',
                          },
                          undefined,
                          { scroll: false }
                        )
                      }
                      mx={'5'}
                      size='lg'
                    >
                      Back
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeOut', duration: 0.3, delay: 0.4 }}
                  >
                    <Button onClick={() => likeClicked()} mx={'5'} size='lg'>
                      <motion.div key={liked ? 1 : 0} initial={{ y: 20 }} animate={{ y: 0 }}>
                        {liked ? 'Unlike' : 'Like'}
                      </motion.div>
                    </Button>
                  </motion.div>
                </HStack>
              </VStack>
            </Center>
          </Container>
        </GridItem>
        <GridItem my={[5, 0]}>
          <Container maxW='3xl'>
            <Center h={[null, '100vh']}>
              <VStack>
                <Text fontFamily={'Lato'} fontSize={['4xl', '5xl']} w='full' align='center'>
                  Ingredients
                </Text>
                <UnorderedList>
                  {ingredients?.map((ingredient) => (
                    <Badge fontSize='lg' m='2' px='2'>
                      {ingredient}
                    </Badge>
                  ))}
                </UnorderedList>
              </VStack>
            </Center>
          </Container>
        </GridItem>
        <GridItem my={[5, 0]}>
          <Container maxW='3xl'>
            <Center h={[null, '100vh']}>
              <VStack spacing='5'>
                <Text fontFamily={'Lato'} fontSize={['4xl', '5xl']}>
                  Instructions
                </Text>
                <Text fontSize='lg'>{recipe?.strInstructions}</Text>
              </VStack>
            </Center>
          </Container>
        </GridItem>
      </SimpleGrid>
    </motion.div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
