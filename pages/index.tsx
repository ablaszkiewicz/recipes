import Head from 'next/head';
import { Container, Text, Input, FormControl, SimpleGrid, HStack, Button, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from '../src/Card';
import { AnimateSharedLayout, motion } from 'framer-motion';
import SearchArea from '../src/SearchArea';
import ResultsArea from '../src/ResultsArea';
import { Recipe, SearchData, SearchType } from '../src/Interfaces/Types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCachedRecipes, setCachedRecipes } from '../src/redux/searchCacheSlice';

export default function Home() {
  const [resultRecipes, setResultRecipies] = useState<Recipe[]>([]);
  const [didInitialSearch, setDidInitialSearch] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const cachedRecipes = useAppSelector(selectCachedRecipes);

  useEffect(() => {
    window.scrollTo(0, 0);
    showCachedSerachResults();
  }, []);

  const showCachedSerachResults = () => {
    if (cachedRecipes.length != 0) {
      setResultRecipies(cachedRecipes);
      setDidInitialSearch(true);
    }
  };

  const submitSearch = async (searchData: SearchData, completedCallback: () => void) => {
    setResultRecipies([]);
    let returnData;
    let data;
    let dataJson;
    switch (+searchData.searchType) {
      case SearchType.Dish:
        if (!searchData.searchBox || searchData.searchBox?.length == 0) {
          setTimeout(() => {
            completedCallback();
          }, 1);

          return;
        }
        data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchData.searchBox);
        dataJson = await data.json();
        returnData = dataJson.meals;
        break;
      case SearchType.Country:
        data = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + searchData.country);
        dataJson = await data.json();
        returnData = dataJson.meals;
        break;
    }

    setResultRecipies(returnData);
    dispatch(setCachedRecipes(returnData));
    completedCallback();
    setDidInitialSearch(true);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.1 }}
    >
      <Container maxW={'5xl'}>
        <AnimateSharedLayout type='switch'>
          <SearchArea submitSearch={submitSearch} />
          <ResultsArea recipes={resultRecipes} showEmpty={!didInitialSearch} />
        </AnimateSharedLayout>
      </Container>
    </motion.div>
  );
}
