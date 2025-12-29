import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import LanguagePage from './LanguagePage';
import KidsLanguagePage from './KidsLanguagePage';

const LanguagePageWrapper = () => {
  const [searchParams] = useSearchParams();
  const { language } = useParams();
  const ageParam = searchParams.get('age');

  // Check if URL ends with -kids or has age=kids param
  const isKidsPage = language?.endsWith('-kids') || ageParam === 'kids';

  if (isKidsPage) {
    return <KidsLanguagePage />;
  }

  // Otherwise show regular adult page
  return <LanguagePage />;
};

export default LanguagePageWrapper;
