/*

1. Данные храняться в #data
2. Получение и Сохранение данных (#data) в localStorage

3. Получение данных от Сервера в localStorage

*/

class Storage {
    constructor(key, url) {
        if (!key || typeof key != 'string') return;

        this.key = key;
        this.url = url;
    }

    getServerData(url) {
        return fetch(url)
        .then(request => request.json())
        .then(data => data);
    }

    set data(value) {
        if (!value) return;

        value = JSON.stringify(value);

        if (!value || typeof value != 'string') return;

        window.localStorage.setItem(this.key, value);
    }

    get data() {
        let value = window.localStorage.getItem(this.key);

        if (!value) return;

        value = JSON.parse(value);

        return value;
    }

    async getData() {
        let value = window.localStorage.getItem(this.key);

        if (value) {
            value = JSON.parse(value);

            return value;
        }

        value = await this.getServerData(this.url);

        if (value) {
            let valueTmp = value.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    content: item.body
                };
            });

            value = valueTmp;

            this.data = value;

            return value;
        }
    }
}