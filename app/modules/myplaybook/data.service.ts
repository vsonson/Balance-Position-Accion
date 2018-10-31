import { Injectable } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Injectable()
export class DataService {
    private arrList: ObservableArray<PlayBookList> = new ObservableArray<PlayBookList>();
    getPlayBookList(): PlayBookList[] {
        return [
            { name: "My Mood", type: "General", order: 4, color: "green", img: "res://mood_grey", routerPath: "/myplaybook/mood" },
            { name: "My Sleep", type: "General", order: 0, color: "yellow", img: "res://sleep_grey", routerPath: "/myplaybook/sleep" },
            { name: "My Stress", type: "General", order: 1, color: "red", img: "res://stress_grey", routerPath: '/myplaybook/stress' },
            { name: "My Energy", type: "General", order: 8, color: "green", img: "res://energy_grey", routerPath: '/myplaybook/energy' },
            { name: "My Performance", type: "General", order: 6, color: "yellow", img: "res://performance_grey", routerPath: '/myplaybook/performance' },
            { name: "My Appetite", type: "General", order: 7, color: "red", img: "res://appetite_grey", routerPath: '/myplaybook/appetite' },
            { name: "My Focus", type: "General", order: 3, color: "red", img: "res://focus_grey", routerPath: '/myplaybook/focus' },
            { name: "My Body", type: "General", order: 5, color: "red", img: "res://body_grey", routerPath: '/myplaybook/body' },
            { name: "My Interest", type: "Optional", order: 2, color: "red", img: "res://interest_grey", routerPath: '/myplaybook/interest' },
            { name: "My Injury", type: "Optional", order: 9, color: "red", img: "res://injury_grey", routerPath: '/myplaybook/injury' }
        ];
    }

    getColor(dataPoint: string) {
        this.arrList = new ObservableArray(this.getPlayBookList());
        let getValue: PlayBookList = this.arrList.get(dataPoint);
        // console.log("Iska value"+ getValue.color.toString());
        return "Green";
    }

    getListItem(name: string) {
        for (var i = 0; i < playBookData.data.length; i++) {
            console.log(name, "-->", playBookData.data[i].name === name)
            if (playBookData.data[i].name === name) {
                return playBookData.data[i];
            }
        }

        return null;
    }

    getType() {
        return playBookData.type;
    }

    getUserDetails() {
        return playBookData.userDetails;
    }

}

export class PlayBookList {
    constructor(public name?: string, public type?: string, public color?: string, public order?: number, public img?: string, public routerPath?: string) {
    }
}

class PlayBookData {
    data: PlayBookList[] = [];
    type: string = 'user';
    userDetails: any = {
        name: "User"
    }
}

export const playBookData = new PlayBookData();