class Serializable {
    fillFromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}

export class UserToken extends Serializable {
    id_token:string;
    GetToken(): string { return this.id_token };
}


