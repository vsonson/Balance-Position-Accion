import { Component, Input, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { NetworkService } from './../network.service';
import { Network } from '../network';
import { GC } from "utils/utils";

let view: FlexboxLayout;



var enums = require("ui/enums");




@Component({
  moduleId: module.id,
  selector: 'network-modal',
  templateUrl: './networkModal.component.html',
  styleUrls: ['./networkModal.component.scss'],
  providers: [NetworkService]
})
export class NetworkModalComponent implements OnInit, OnDestroy {

  public addNetworkForm: boolean = false;
  public turnOffWellness: boolean = false;
  public turnOffBalance: boolean = false;
  public removeNetwork: boolean = false;
  public successMessage: boolean = false;

  public networkName: string;
  public networkEmail: string;
  public networkPhone: string;

  public phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  public nameReg = /^[a-zA-Z]+$/;

  public name: any;
  public submitText: any;
  public network: Network;
  errorStatus: any = {
    name: false,
    validEmailId: false,
    email: false,
    phone: false,
    validPhone: false,


  }

  constructor(private modalDialogParams: ModalDialogParams, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef) {
    let params = this.modalDialogParams.context;
    this.network = new Network();
    if (params.networkName) {
      this.name = params.networkName;
    }
    if (params.data == "addNetwork") {
      this.addNetworkForm = true;
    } else if (params.data == "myBalance") {
      this.turnOffBalance = true;

    } else if (params.data == "myWellness") {
      this.turnOffWellness = true;
    } else if (params.data == "removeNetwork") {
      this.removeNetwork = true;
    } else if (params.data == "successMessage") {
      this.successMessage = true;
    }
  }


  close() {
    this.modalDialogParams.closeCallback();
    this.successMessage = false;

  }

  closeDirectModal() {
    this.modalDialogParams.closeCallback({ force: true });
  }
  closeForm() {
    this.modalDialogParams.closeCallback(true);

  }
  addNetwork() {

    if (this.networkPhone == null || !this.phoneReg.test(this.networkPhone) && this.networkName == "" && this.networkEmail == '' && !(this.networkEmail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
      this.errorStatus.phone = (this.network.phone) ? false : true;
      this.errorStatus.name = this.network.name ? false : true;
      this.errorStatus.email = this.network.email ? false : true;
      this.errorStatus.validEmailId = (this.network.isValidEmail()) ? false : true;

      this.successMessage = false;
    }
    else {
      this.successMessage = true;
      this.closeForm();
    }



  }
  ngOnInit() {
    GC();
  }

  ngOnDestroy() {
    GC();
  }



}