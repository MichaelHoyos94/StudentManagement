import React from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
const languajes = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
];

export default function LanguajeSwitcher() {
    const { i18n, t } = useTranslation();
    const changeLanguage = (e) => {
        const selectedLang = e.target.value;
        i18n.changeLanguage(selectedLang);
        localStorage.setItem('lang', selectedLang)
    }
    return (
        <div>
            <label>
                {t('Language')}:
            </label>
            <select onChange={changeLanguage} value={i18n.language}>
                {languajes.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
