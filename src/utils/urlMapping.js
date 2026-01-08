// URL mapping utility for language pages
// Maps new SEO-friendly URLs to internal language/page type

const languageMap = {
  'french': 'french',
  'german': 'german',
  'spanish': 'spanish',
  'english': 'english',
  'japanese': 'japanese',
  'korean': 'korean',
  'mandarin': 'mandarin',
};

// Main language page URLs
export const getLanguageMainUrl = (language) => {
  const lang = language.toLowerCase();
  return `/online-${lang}-classes`;
};

// Kids page URLs
export const getLanguageKidsUrl = (language) => {
  const lang = language.toLowerCase();
  return `/online-${lang}-classes-for-kids`;
};

// Adults page URLs
export const getLanguageAdultsUrl = (language) => {
  const lang = language.toLowerCase();
  return `/online-${lang}-classes-for-adults`;
};

// Study abroad URLs
export const getLanguageStudyAbroadUrl = (language) => {
  const lang = language.toLowerCase();
  return `/online-${lang}-classes-to-study-abroad`;
};

// Level URLs mapping
const levelUrlMap = {
  french: {
    beginner: ['french-beginner-level-a1-a2'],
    intermediate: ['french-intermediate-level-b1-b2'],
    advanced: ['french-advanced-level-c1-c2'],
  },
  german: {
    beginner: ['german-beginner-level-a1-a2'],
    intermediate: ['german-for-intermediate-level-b1-b2'],
    advanced: ['german-advanced-level-c1-c2'],
  },
  spanish: {
    beginner: ['spanish-beginner-level-a1-a2'],
    intermediate: ['spanish-intermediate-level-b1-b2'],
    advanced: ['spanish-advanced-level-c1-c2'],
  },
  korean: {
    beginner: ['korean-beginner-topik1-level1-2', 'korean-beginner-topik1-1-2'],
    intermediate: ['korean-intermediate-level-topik2-3-4', 'korean-intermediate-topik2-3-4'],
    advanced: ['korean-advanced-level-topik2-5-6', 'korean-advanced-topik2-5-6'],
  },
  mandarin: {
    beginner: ['mandarin-beginner-level-hsk1-hsk2', 'mandarin-beginner-hsk1-hsk2'],
    intermediate: ['mandarin-intermediate-level-hsk3-hsk4', 'mandarin-intermediate-hsk3-hsk4'],
    advanced: ['mandarin-advanced-level-hsk5-hsk6', 'mandarin-advanced-hsk5-hsk6'],
  },
  japanese: {
    beginner: ['japanese-beginner-n5-level', 'japanese-beginner-n5'],
    intermediate: ['japanese-intermediate-level-n4-n3', 'japanese-intermediate-n4-n3'],
    advanced: ['japanese-advanced-level-n2-n1', 'japanese-advanced-n2-n1'],
  },
  english: {
    beginner: ['english-beginner-level-a1-a2', 'english-beginner-a1-a2'],
    intermediate: ['english-intermediate-level-b1-b2', 'english-intermediate-b1-b2'],
    advanced: ['english-advanced-level-c1-c2', 'english-advanced-c1-c2'],
  },
};

// Exam URLs mapping
const examUrlMap = {
  french: {
    proficiency: ['delf-proficiency-exam', 'dalf-proficiency-exam', 'tef-proficiency-exam'],
    preparation: ['delf-preparation-classes', 'dalf-preparation-classes', 'tef-preparation-classes'],
  },
  german: {
    preparation: ['goethe-preparation-classes'],
  },
  spanish: {
    preparation: ['siele-preparation-classes'],
  },
  korean: {
    preparation: ['topik-preparation-classes', 'dele-preparation-classes'],
  },
  mandarin: {
    preparation: ['hsk-preparation-classes'],
  },
  japanese: {
    preparation: ['jlpt-prepration-classes'],
  },
  english: {
    preparation: ['ielts-preparation-classes', 'toefl-preparation-classes'],
  },
};

// Parse URL to get language and page type
export const parseLanguageUrl = (urlPath) => {
  // Remove leading slash
  const path = urlPath.replace(/^\//, '');
  
  // Check for main language pages
  for (const [lang, langKey] of Object.entries(languageMap)) {
    if (path === `online-${langKey}-classes`) {
      return { language: lang, pageType: 'main', ageGroup: null };
    }
    if (path === `online-${langKey}-classes-for-kids`) {
      return { language: lang, pageType: 'main', ageGroup: 'kids' };
    }
    if (path === `online-${langKey}-classes-for-adults`) {
      return { language: lang, pageType: 'main', ageGroup: 'adults' };
    }
    if (path === `online-${langKey}-classes-to-study-abroad`) {
      return { language: lang, pageType: 'study-abroad', ageGroup: null };
    }
  }
  
  // Check for level pages
  for (const [lang, levels] of Object.entries(levelUrlMap)) {
    for (const [level, urls] of Object.entries(levels)) {
      if (urls.includes(path)) {
        return { language: lang, pageType: 'level', level, ageGroup: null };
      }
    }
  }
  
  // Check for exam pages
  for (const [lang, exams] of Object.entries(examUrlMap)) {
    for (const [examType, urls] of Object.entries(exams)) {
      if (urls.includes(path)) {
        return { language: lang, pageType: 'exam', examType, ageGroup: null };
      }
    }
  }
  
  return null;
};

// Get level URL for a language
export const getLevelUrl = (language, level) => {
  const lang = language.toLowerCase();
  const levels = levelUrlMap[lang];
  if (levels && levels[level]) {
    return `/${levels[level][0]}`;
  }
  return null;
};

// Get exam URL for a language
export const getExamUrl = (language, examType, examName) => {
  const lang = language.toLowerCase();
  const exams = examUrlMap[lang];
  if (exams && exams[examType]) {
    // Try to find matching exam name
    const examUrl = exams[examType].find(url => 
      url.includes(examName.toLowerCase())
    );
    if (examUrl) {
      return `/${examUrl}`;
    }
    // Return first available
    return `/${exams[examType][0]}`;
  }
  return null;
};

// Export all URL mappings for reference
export { levelUrlMap, examUrlMap, languageMap };

