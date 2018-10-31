import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { WebView, LoadEventData } from "ui/web-view";
import { Page } from "ui/page";
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-playbook-focus",
    templateUrl: './in-app-browser.component.html',
    styleUrls: ['./in-app-browser.component.css']

})
export class InAppBrowserComponent implements AfterViewInit {
    url: string;
    @ViewChild("myWebView") webViewRef: ElementRef;
    constructor(private routerExtensions: RouterExtensions, private page: Page, private activeRouter: ActivatedRoute){
        this.page.actionBarHidden = false;
        this.url = (this.activeRouter.params['_value'].url);
    }


    ngAfterViewInit() {
        let webview: WebView = this.webViewRef.nativeElement;
        webview.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            let message;
            if (!args.error) {
                message = "WebView finished loading of " + args.url;
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            console.log("WebView message - " + message, webview.android.getTitle());
        });
    }

    goBack() {
        this.routerExtensions.back();
    }
}
