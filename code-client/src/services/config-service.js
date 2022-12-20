import { reactive } from 'vue'

export default class ConfigService {

    constructor(localeService) {

        this._localeService = localeService

        const locale = 'es';
        this._localeService.setDictionary(locale);
        this._config = reactive({
            locale: locale,
        })
    }

    get config() {
        return this._config
    }




}