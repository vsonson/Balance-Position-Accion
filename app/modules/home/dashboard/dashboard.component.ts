import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, ViewContainerRef, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { SwipeGestureEventData } from "ui/gestures";

import { GC } from "utils/utils";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { View } from "tns-core-modules/ui/core/view";
import { layout } from "utils/utils";
import { DataPoints } from "../shared/datapoints";
import { DashboardService } from "../shared/dashboard.service";
import { forEach } from "@angular/router/src/utils/collection";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Router } from "@angular/router";
import { ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from "nativescript-angular/router";
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { MyDataModalComponent } from "./myDataModal/myDataModal.component";
import { Loader } from './../../../common/components/loader/loader.service';
import { HomeUI } from './../home-ui.service';
import { alert } from "ui/dialogs";
import { HomeHttpService } from './../home-http.service';

class HomeNavItem {
    constructor(public id: number, public name: string, public color: string, public icon: string, public enabled: boolean) {
        console.log(icon)
    }
}



@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: 'dashboard.component.html',
    providers: [DashboardService],
    styleUrls: ["dashboard.component.css"],
})
export class DashBoardComponent implements OnInit, AfterViewInit, OnDestroy {
    myStr: any;
    successMsg: any;
    isMakeNote: boolean;
    private _mainContentText: string;
    public homeNavItems: Array<HomeNavItem> = [];
    public datapointItems: Array<DataPoints> = [];
    private counter: number;
    public headerLayout = {
        total: 3,
        index: 1,
        swipeDirection: -1
    }

    // list 

    private animationApplied = false;
    private leftItem: View;
    private rightItem: View;
    private mainView: View;
    swipeIndex: number = -1;
    scrollViewsList = [{ template: 'header' }, { template: 'list' }];


    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private loader: Loader,
        private homeUi: HomeUI,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        page: Page, private router: Router,
        private modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private httpService: HomeHttpService,
        private dashboardService: DashboardService) {
        page.actionBarHidden = true;
        this.initHomeNavItems();
        this.initDataPointItems();
        this.isMakeNote = false;
        this.homeUi.setAppBarTitle("");
    }

    @ViewChild("myListView") listViewComponent: RadListViewComponent;


    onSwipe(args: SwipeGestureEventData) {
        console.log("Swipe!");
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Swipe Direction: " + args.direction);
        this.headerLayout.swipeDirection = args.direction;
        if (args.direction == 2) {
            this.headerLayout.index += 1;
            if (this.headerLayout.index == (this.headerLayout.total + 1))
                this.headerLayout.index = 1;
        }
        if (args.direction == 1) {
            this.headerLayout.index -= 1;
            if (this.headerLayout.index == 0)
                this.headerLayout.index = this.headerLayout.total;
        }

        // this.direction = args.direction;
    }

    initHomeNavItems() {
        this.homeNavItems.push(new HomeNavItem(0, 'usr-info', '', '', true));
        // this.homeNavItems.push(new HomeNavItem(1, 'Mood', '#73fe2a', "~/images/Icons/Mood/noun_1552326_555555.png", true));
        this.homeNavItems.push(new HomeNavItem(1, 'Mood', '#73fe2a', "res://mood_grey", true));
        // this.homeNavItems.push(new HomeNavItem(2, 'Sleep', '#73fe2a', "~/images/Icons/Sleep/noun_510076_555555.png", true));
        this.homeNavItems.push(new HomeNavItem(2, 'Sleep', '#73fe2a', "res://sleep_grey", true));
        // this.homeNavItems.push(new HomeNavItem(3, 'Stress', '#f3554e', '~/images/Icons/Stress/noun_86100_555555.png', true));
        this.homeNavItems.push(new HomeNavItem(3, 'Stress', '#f3554e', 'res://stress_grey', true));
        // this.homeNavItems.push(new HomeNavItem(4, 'Performance', '#f3554e', '~/images/Icons/Performance/noun_113911_555555.png', true));
        this.homeNavItems.push(new HomeNavItem(4, 'Performance', '#f3554e', 'res://performance_grey', true));
        // this.homeNavItems.push(new HomeNavItem(5, 'Body', '#fefc1f', '~/images/Icons/Body/noun_789986_555555.png'));
        // this.homeNavItems.push(new HomeNavItem(6, 'Energy', '#fefc1f', '~/images/Icons/Energy Level/noun_677209_555555.png'));
        // console.log(JSON.stringify(this.homeNavItems))
    }

    initDataPointItems() {
        this.dashboardService.dataPoint(false).subscribe(
            (data) => {
                console.log("datapointsAPI Data -------->" + data);
                let dataP: any[] = data;
                let imgName: string = "";
                for (let i = 0; i < dataP.length; i++) {
                    dataP[i]['disabled'] = !dataP[i].enabled;
                    imgName = dataP[i]['name'];
                    imgName = imgName.toLowerCase();
                    imgName = imgName.replace("appetite", "nutrition");
                    dataP[i]['imageUrl'] = "res://" + imgName + "_grey";
                    delete dataP[i]['enabled'];
                }

                this.datapointItems = dataP;

                console.log("Data Ponuts:", this.datapointItems)

            });
    }


    

    public getMyData() {
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(MyDataModalComponent, options).then(res => {
            console.log(res);
        });
    }


    ngAfterViewInit() {
        this._changeDetectionRef.detectChanges();
        this.loader.hide();
        this.httpService.getAllDataPoints(false).subscribe((res) => {
            let j = this.swipeIndex;
            for (let i = 0; i < res.byteLength; i++) {
                if (res[i].enabled = true && i == j) {
                    console.log("is enable??" + res[i].enabled)
                    this.datapointItems[j].disabled = false;
                }
                else {
                    this.datapointItems[j].disabled = true;
                }
            }
            console.log("success", JSON.stringify(res));
        }, (err) => {
            console.log("err", err)
        })
    }

    getBgColor(clr) {
        let color: string = "";

        switch (clr) {
            case "RED":
                color = "#f4554e"
                break;
            case "GREEN":
                color = "#76fe35"
                break;
            case "GRAY":
                color = "#c7c7c7"
                break;
            case "YELLOW":
                color = "#fefc1f"
                break;

            default:
                color = "#c7c7c7"
                break;
        }
        return color;
    }


    ngOnInit() {
        
    }

    ngOnDestroy() {
        GC();
    }

    turnOffOnDataPoint(event) {
        let i = this.swipeIndex;

        if (this.datapointItems[i].disabled)
            this.datapointItems[i].disabled = false;
        else
            this.datapointItems[i].disabled = true;

        console.log(this.datapointItems[i].disabled);
        console.log(this.datapointItems[i].name);

        this.successMsg = this.datapointItems[i].name + '  Data point changed ';

        this.httpService.createUserDataPoint("GRAY", this.datapointItems[i].name, !this.datapointItems[i].disabled)
            .subscribe((data) => {
                console.log("Success", JSON.stringify(data));
                let options = {
                    title: "Success",
                    message: this.successMsg,
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });

            }, (err) => {
                console.log("Error.................", JSON.stringify(err));
                let options = {
                    title: "Error",
                    message: "Turn on/off data point failed",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });

            })

    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }



    isItemDisabled(args: ListViewEventData) {
        console.log("class", args.index)
    }


    // >> angular-listview-swipe-action-multiple
    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['swipeView'];
        this.mainView = args['mainView'];
        this.leftItem = swipeView.getViewById('left-stack');
        this.rightItem = swipeView.getViewById('right-stack');
        this.swipeIndex = args.index;

        if (args.data.x > 0) {
            var leftDimensions = View.measureChild(
                <View>this.leftItem.parent,
                this.leftItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(this.mainView.getMeasuredHeight(), layout.EXACTLY));
            View.layoutChild(<View>this.leftItem.parent, this.leftItem, 0, 0, leftDimensions.measuredWidth, leftDimensions.measuredHeight);
            this.hideOtherSwipeTemplateView("left");
        } else {
            var rightDimensions = View.measureChild(
                <View>this.rightItem.parent,
                this.rightItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(this.mainView.getMeasuredHeight(), layout.EXACTLY));

            View.layoutChild(<View>this.rightItem.parent, this.rightItem, this.mainView.getMeasuredWidth() - rightDimensions.measuredWidth, 0, this.mainView.getMeasuredWidth(), rightDimensions.measuredHeight);
            this.hideOtherSwipeTemplateView("right");
        }
    }

    private hideOtherSwipeTemplateView(currentSwipeView: string) {
        switch (currentSwipeView) {
            case "left":
                if (this.rightItem.getActualSize().width != 0) {
                    View.layoutChild(<View>this.rightItem.parent, this.rightItem, this.mainView.getMeasuredWidth(), 0, this.mainView.getMeasuredWidth(), 0);
                }
                break;
            case "right":
                if (this.leftItem.getActualSize().width != 0) {
                    View.layoutChild(<View>this.leftItem.parent, this.leftItem, 0, 0, 0, 0);
                }
                break;
            default:
                break;
        }
    }
    // << angular-listview-swipe-action-multiple

    // >> angular-listview-swipe-action-multiple-limits
    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        swipeLimits.threshold = args['mainView'].getMeasuredWidth() * 0.2; // 20% of whole width
        swipeLimits.left = args['mainView'].getMeasuredWidth() * 0.45; // 45% of whole width
        swipeLimits.right = args['mainView'].getMeasuredWidth() * 0.3;
    }
    // << angular-listview-swipe-action-multiple-limits

    public onSwipeCellFinished(args: ListViewEventData) {
        if (args.data.x > 200) {
            console.log("Perform left action");
        } else if (args.data.x < -200) {
            console.log("Perform right action");
        }
        this.animationApplied = false;
    }

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log("Button clicked: " + args.object.id + " for item with index: " + this.listViewComponent.listView.items.indexOf(args.object.bindingContext));
        var index = this.listViewComponent.listView.items.indexOf(args.object.bindingContext);
        if (this.datapointItems[index].disabled) return; //do nothing on disabled
        this.router.navigate(["/track/" + this.datapointItems[index].name.toLocaleLowerCase()]);
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onMakeNoteClick(args: ListViewEventData) {
        var index = this.listViewComponent.listView.items.indexOf(args.object.bindingContext);
        if (this.datapointItems[index].disabled) return; //do nothing on disabled
        this.isMakeNote = true;
        this.myStr = { "title": this.datapointItems[index].name, "imgURL": this.datapointItems[index].imageUrl, "isDialogVisible": this.isMakeNote };
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: this.myStr }
        };

        this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

        });
    }

    public onRightSwipeClick(args) {
        console.log("Button clicked: " + args.object.id + " for item with index: " + this.listViewComponent.listView.items.indexOf(args.object.bindingContext));
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }


    public onItemSwiping(args: ListViewEventData) { //do disable / enable swipe based on disabled property of DataPoints
        args.returnValue = true;
    }

    turnOffDataPoint(ev) {
        if (this.datapointItems[this.swipeIndex].disabled)
            this.datapointItems[this.swipeIndex].disabled = true;
        else
            this.datapointItems[this.swipeIndex].disabled = false;
    }

    public itemTapEvents(event: ListViewEventData) {
        console.log("selected");
    }

    public onTap(event: ListViewEventData) {
        console.log("tapped item " + event.index);
        if (this.datapointItems[event.index].disabled) return; //do nothing on disabled
        this.router.navigate(["/datapoints/" + this.datapointItems[event.index].name.toLocaleLowerCase()]);
    }


    getLabelForTurnData(ev) {
        console.log(ev.index, "---------------")
    }
   


}
// << sidedrawer-getting-started-angular
