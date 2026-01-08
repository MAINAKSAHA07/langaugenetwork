import React from 'react';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';
import LanguagePage from './LanguagePage';
import KidsLanguagePage from './KidsLanguagePage';
import { parseLanguageUrl } from '../utils/urlMapping';

const LanguagePageWrapper = () => {
  const [searchParams] = useSearchParams();
  const { language } = useParams();
  const location = useLocation();
  const ageParam = searchParams.get('age');

  // Parse the URL path to determine page type
  const urlInfo = parseLanguageUrl(location.pathname);
  
  // Legacy support: Check if URL ends with -kids or has age=kids param
  const isLegacyKidsPage = language?.endsWith('-kids') || ageParam === 'kids';
  
  // New URL structure: Check if it's a kids page
  const isKidsPage = urlInfo?.ageGroup === 'kids' || isLegacyKidsPage;

  if (isKidsPage) {
    return <KidsLanguagePage />;
  }

  // Otherwise show regular adult page
  return <LanguagePage />;
};

export default LanguagePageWrapper;
