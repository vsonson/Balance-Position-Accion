import { Component, ViewContainerRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { ModalComponent } from "../modal/modal.component";
import { DeactivateModalComponent } from "../deactivateModal/deactivateModal.component";
import { DeactivateAccountModalComponent } from "../deactivateAccountModal/deactivateAccountModal.component";
import { DeactivateFormModalComponent } from "../deactivateFormModal/deactivateFormModal.component";
import { TimePickerComponent } from '../timepickerModal/timepicker.component';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import * as imagepicker from "nativescript-ssi-imagepicker";
import { Switch } from "ui/switch";

import { TimePicker } from "ui/time-picker";
import { UserService } from "../../auth/shared/user/user.service";
import { SharedService } from '../../../common/services/services-index';
import { User } from "../../auth/shared/user/user";
import { Loader } from '../../../common/components/loader/loader.service';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { constants } from '../../../common/constants/messages';
import { confirm } from "ui/dialogs";
import { Navigation } from './../../../common/services/common.service';
import { DrawerHttpService } from './../drawer-http-service';
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";

import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './setting.component.html',
    providers: [UserService, SharedService],
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, AfterViewInit, OnDestroy {

    public edit: boolean = true;
    public isNameEdit: boolean = false;
    public alertName: boolean = false;
    public alertPhone: boolean = false;
    public isAddEmail: boolean = false;
    public alertEmail: boolean = false;
    public scheck: boolean;
    public fcheck: boolean;
    public emailAdded: boolean = false;
    public name: string;
    public country: string;
    public state: string;
    public gender: string;
    public educationLevel: string;
    public dateOfBirth: string;
    public primarySport: string;
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 30;
    public currentTrackTime: string;
    public currentPracticeTime: string;
    public isPhoneEdit: boolean = false;
    public isPasswordEdit
    public phone: string;
    public email: string;
    public userInfoJson: any;
    public phoneReg: any
    public nameReg : any;
    public latestId:number;
        user: User;
    constantsMessage: any = constants;
    public profileImgB64: string;





    constructor(private userService: UserService,
        private router: RouterExtensions,
        page: Page, private modalDialogService: ModalDialogService, private navigation: Navigation,
        private viewContainerRef: ViewContainerRef, private loader: Loader, private sharedService: SharedService, private httpService: DrawerHttpService) {
        this.user = new User();
        page.actionBarHidden = true;
        this.name = "Kara Stroupl";
        this.imageSrc = "res://profile_grey";
        this.phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        this.nameReg = /^[a-z ,.'-]+$/i;


        this.currentTrackTime = this.convertTime(new Date());
        this.currentPracticeTime = this.convertTime(new Date());
       //this.latestId=13;
       
      
        this.initialize();
       
        

    }

    ngOnInit() {
    
    }

    ngOnDestroy() {
        GC();
    }

    ngAfterViewInit() {
        this.loader.hide();
        this.getUserInfo();
    }

    convertTime(value) {
        var hours = new Date(value).getHours();
        var minutes: any = new Date(value).getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    back() {
        this.router.back();
    }
    editname() {

        this.isNameEdit = true;
        this.edit = false;
        console.log(this.edit);
    }

    changeName() {

        if (this.name == null || !this.nameReg.test(this.name)) {
            this.alertName = true;
            return false
        }
        else {
            this.alertName = false;
            this.isNameEdit = false;
            this.edit = true;
            //this.updateName();
        }

    }

    editphone() {
        this.isPhoneEdit = true;
    }

    changephone() {
        if (this.phone == null || !this.phoneReg.test(this.phone)) {
            this.alertPhone = true;
            return false
        }
        else {
            this.alertPhone = false;
            this.isPhoneEdit = false;
            this.updateUser();

        }
    }

    clearName() {
        this.name = null;
    }

    addemail() {
        this.isAddEmail = true;
    }
    changeEmail() {
        if (this.email == '') {
            this.alertEmail = true;
        }
        else if (this.email == ' ') {
            this.alertEmail = true;
        }
        else if (!(this.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
            this.alertEmail = true;

        }
        else {
            this.updateUser();
            this.alertEmail = false;
            this.isAddEmail = false;
            this.emailAdded = true;
        }
    }

    clearEmail() {
        this.email = "";
    }

    clearPhone() {
        this.phone = null;
    }

    public onFirstChecked(args) {
        let firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            this.fcheck = true;
            this.currentTrackTime = this.convertTime(new Date());
        } else {
            this.fcheck = false;
        }
    }

    public onSecondChecked(args) {
        let secondSwitch = <Switch>args.object;
        if (secondSwitch.checked) {
            this.scheck = true;
            this.currentPracticeTime = this.convertTime(new Date());
        } else {
            this.scheck = false;
        }
    }


    openModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: this.user, phone:this.phone, name:this.name }
        };

        this.modalDialogService.showModal(ModalComponent, options).then(() => {
            this.initialize()
        });
    }

    openDeactivateAccountModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(DeactivateAccountModalComponent, options).then((result) => {

            this.openDeactivateModal();
        });
    }

    openDeactivateFormModal() {

        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(DeactivateFormModalComponent, options).then(() => {
            this.sharedService.removeToken();
            this.router.navigate(['/auth/signin'], {clearHistory: true});
        });
    }

    openDeactivateModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(DeactivateModalComponent, options).then((result) => {

            if(result) this.openDeactivateFormModal();
        });
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.imageSrc = null;
                return context.present();
            })
            .then((selection) => {

                that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
                console.log("that.imageSrc", that.imageSrc);
                // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                selection.forEach(function (element) {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                that.imageAssets = selection; selection.forEach(function (element) {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                that.imageAssets = selection;
                this.updateUser();
            }).catch(function (e) {
                console.log(e);
            });
    }

    showTimePicker(type, remindeType) {
        console.log('showpicker is calling');
        let dataTime = (type == 'Track' ? this.currentTrackTime : this.currentPracticeTime)
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: dataTime, reminderLabel: remindeType }
        };
        this.modalDialogService.showModal(TimePickerComponent, options).then((res) => {
            if (res.status == "new") {
                if (type == 'Track') {
                    this.currentTrackTime = this.convertTime(new Date(res.selTime));
                }
                else {
                    this.currentPracticeTime = this.convertTime(new Date(res.selTime));
                }
            }
            else {
                if (type == 'Track') {
                    this.currentTrackTime = res.selTime
                }
                else {
                    this.currentPracticeTime = this.convertTime(res.selTime);
                }
            }
        });
    }

    getUserInfo() {
        this.loader.show('Loading...');
        let userId:number;
        userId = this.latestId;
        console.log("id going to api",userId);
        this.userService.getUserInfo(userId)
            .subscribe((res) => {
                this.loader.hide();
                console.log("Get User Info", JSON.stringify(res));
                if (res) {
                    this.userInfoJson = res;
                    this.primarySport = res.primarySport;
                    this.country = res.country;
                    this.state = res.state;
                    this.gender = res.gender;
                    console.log("Gender",res.gender);
                    this.dateOfBirth = res.dateOfBirth;
                    this.educationLevel = res.educationLevel;
                    this.phone = res.phone;
                   
                    this.sharedService.setUserInfo(this.user);
                }
            }, (err) => {
                this.loader.hide();
                console.log("err")
            })

    }

    initialize()
    {
        this.httpService.getAllUserInfos().subscribe((data)=>
        {
            let intializeResponse: any[] = JSON.parse(JSON.stringify(data));
            this.latestId = parseInt(JSON.stringify(intializeResponse[intializeResponse.length-1].id));
            console.log("Id==============",this.latestId)
            this.getUserInfo();
        }, (err) => {
            console.log("Error", JSON.stringify(err));
           
        })
    }

    updateUser() {
      
       
        this.httpService.updateUserInfo(this.phone,this.primarySport,this.country,this.state,this.gender,this.dateOfBirth,this.educationLevel)
            .subscribe((data) => {
                console.log("Update User Info Success", JSON.stringify(data));
                let updateResponse: any = JSON.parse(JSON.stringify(data));
                console.log("latest id",updateResponse.id);
                 this.latestId = updateResponse.id;
                let options = {
                    title: "Success",
                    message: "Updated Successfully",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });
            }, (err) => {
                console.log("Error", JSON.stringify(err));
                let options = {
                    title: "Error",
                    message: "Error While udate",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });
            })
    }
    updateName() {
      
       
        this.httpService.updateUserName(this.name)
            .subscribe((data) => {
                console.log("Update User Name Success", JSON.stringify(data));
            
                let options = {
                    title: "Success",
                    message: "Updated Successfully",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });
            }, (err) => {
                console.log("Error", JSON.stringify(err));
                let options = {
                    title: "Error",
                    message: "Error While udate",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });
            })
    }
    getName() {
        this.loader.show('Loading...');
    
        this.httpService.getUserName()
            .subscribe((res) => {
                this.loader.hide();
                console.log("Get User Name...", JSON.stringify(res));
                
            }, (err) => {
                this.loader.hide();
                console.log("err")
            })

    }
    goBack() {
        this.router.navigate(['/home/dashboard']);
      }
   
}

