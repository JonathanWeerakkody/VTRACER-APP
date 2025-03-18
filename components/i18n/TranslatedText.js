// components/i18n/TranslatedText.js
import React from 'react';
import { useLanguage } from './LanguageContext';
import { getTranslation } from './translations';

export default function TranslatedText({ id, defaultText }) {
  const { language } = useLanguage();
  return <>{getTranslation(language, id, defaultText)}</>;
}
