import EsDictionary from './locale/locale-es.json';
import Temp from './locale/temp.json';

export default class LocaleService {

    constructor() {
        this._baseDict = null;
        this._dict = null;
    }

    get locales() {
        return ['es']
    }

    localesFiltered(configLocale) {
        return this.locales.filter(locName => locName !== configLocale)
    }

    // Dictionary labels

    setDictionary(locale) {
        if (locale === 'es') {
            this._baseDict = {...EsDictionary, ...Temp };
            this._dict = {...EsDictionary, ...Temp };
        }
    }


    t(labelKey) {
        return this._dict[labelKey];
    }

    T(labelKeys) {
        const o = {}
        labelKeys.forEach(labelKey => {
            o[labelKey] = this._dict[labelKey];
        })
        return o;
    }

    D() {
        return this._dict
    }

    extend(dictionary) {
        this._dict = {
            ...this._baseDict,
            ...dictionary
        }
    }



}