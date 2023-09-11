/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageTranslator',
})
export class LanguageTranslatorPipe implements PipeTransform {
  transform(value: any, langArray: any, langVal: any): any {
    const selLang = langArray?.filter((a: any) => langVal === a.cntText);
    if (selLang?.length > 0) {
      return selLang[0].translationText;
    } else {
      return value;
    }
  }
}
