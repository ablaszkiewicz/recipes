import Head from 'next/head';
import { Container, Text, Input, FormControl, SimpleGrid, HStack, Button, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from '../src/Card';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { SearchData, SearchType } from './Interfaces/Types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCachedSearchBox, setCachedSearchBox } from './redux/searchCacheSlice';

interface SearchAreaProps {
  submitSearch(searchData: SearchData, completedCallback: () => void): void;
}

export default function SearchArea(searchAreaProps: SearchAreaProps) {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Dish);
  const [searchBox, setSearchBox] = useState<string>('');
  const [country, setCountry] = useState<string>('Polish');
  const [ingredient, setIngredient] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const cachedSearchbox = useAppSelector(selectCachedSearchBox);
  const dispatch = useAppDispatch();

  useEffect(() => {
    retrieveCachedData();
  }, []);

  const retrieveCachedData = () => {
    setSearchBox(cachedSearchbox);
  };

  const searchClicked = () => {
    let data: SearchData = {
      searchType: searchType,
      searchBox: searchBox,
      ingredient: ingredient,
      country: country,
    };

    searchAreaProps.submitSearch(data, hideLoadingAnimation);

    setShowLoading(true);
    dispatch(setCachedSearchBox(searchBox));
  };

  const hideLoadingAnimation = () => {
    setShowLoading(false);
  };

  return (
    <>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Text fontFamily={'Lato'} fontSize={'5xl'} mt={'15'}>
          Search
        </Text>
      </motion.div>

      <motion.div
        initial={{ x: -30, opacity: 0, scale: 1 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
      >
        <FormControl id='email'>
          <HStack mb='2'>
            {searchType == SearchType.Dish && (
              <Input type='email' value={searchBox} onChange={(e) => setSearchBox(e.target.value)} />
            )}
            {searchType == SearchType.Ingredient && (
              <Select value={ingredient} onChange={(e) => setIngredient(e.target.value)}>
                <option value='potatos'>Potatos</option>
                <option value='salt'>Salt</option>
                <option value='pepper'>Pepper</option>
              </Select>
            )}
            {searchType == SearchType.Country && (
              <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value='Polish'>Polish</option>
                <option value='Canadian'>Canadian</option>
                <option value='American'>American</option>
                <option value='British'>British</option>
                <option value='Croatian'>Croatian</option>
                <option value='Chinese'>Chinese</option>
                <option value='Dutch'>Dutch</option>
              </Select>
            )}
            <Select
              width='sm'
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as unknown as SearchType)}
            >
              <option value={SearchType.Dish}>Dish</option>
              {/* <option value={SearchType.Ingredient}>Ingredient</option> */}
              <option value={SearchType.Country}>Country</option>
            </Select>
            <Button minWidth={'80px'} onClick={() => searchClicked()} isLoading={showLoading}>
              Search
            </Button>
          </HStack>
        </FormControl>
      </motion.div>
      <AnimatePresence>
        {searchType == SearchType.Dish && (
          <motion.div
            initial={{ opacity: 0, y: -20, maxHeight: 0 }}
            animate={{ opacity: 1, y: 0, maxHeight: 50 }}
            exit={{ opacity: 0, y: -20, maxHeight: 0 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          >
            <HStack>
              <Select>
                <option value='all'>All</option>
                {/* <option value='liked'>Liked</option>
                <option value='notLiked'>Not liked</option> */}
              </Select>
            </HStack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
