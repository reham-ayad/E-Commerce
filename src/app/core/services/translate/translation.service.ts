import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import { platform } from 'os';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
 
  constructor(private translate:TranslateService,@Inject(PLATFORM_ID) private Id:object) {
    translate.setDefaultLang('en') ;

if(isPlatformBrowser(Id)){
  this.changeDiection();

}


  }
  

  changeDiection(){
   let save= localStorage.getItem('lang')||'';
   this.translate.use(save);
   if(save=='en'){
    document.documentElement.dir='ltr';
   }
else{
  document.documentElement.dir='rtl';

}



  }
}
