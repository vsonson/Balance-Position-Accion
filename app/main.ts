import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";

import "rxjs/add/operator/do";

platformNativeScriptDynamic().bootstrapModule(AppModule);
