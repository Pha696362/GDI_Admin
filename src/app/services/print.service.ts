import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class PrintService {

  constructor() { }

  print(section: any, size: any, timeout?: number) {
    if (timeout === undefined) {
      timeout = 5000;
    }
    switch (size) {
      case 'a5':
        $(section).print({
          globalStyles: true,
          mediaPrint: true,
          stylesheet: '/../assets/styles/a5.css',
          iframe: true,
          timeout: timeout,
          append: null,
          prepend: null,
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          title: null,
          noPrintSelector: '.no-print',
          doctype: '<!doctype html>'
        });
        break;
      case 'a4':
        $(section).print({
          globalStyles: true,
          mediaPrint: true,
          stylesheet: '/../assets/styles/a4.css',
          iframe: true,
          timeout: timeout,
          append: null,
          prepend: null,
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          title: null,
          noPrintSelector: '.no-print',
          doctype: '<!doctype html>'
        });
        break;
      case 'a4l':
        $(section).print({
          globalStyles: true,
          mediaPrint: true,
          stylesheet: '/../assets/styles/a4l.css',
          iframe: true,
          timeout: timeout,
          append: null,
          prepend: null,
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          title: null,
          noPrintSelector: '.no-print',
          doctype: '<!doctype html>'
        });
        break;
      case 'a5l':
        $(section).print({
          globalStyles: true,
          mediaPrint: true,
          stylesheet: '/../assets/styles/a5l.css',
          iframe: true,
          timeout: timeout,
          append: null,
          prepend: null,
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          title: null,
          noPrintSelector: '.no-print',
          doctype: '<!doctype html>'
        });
        break;
      case 'rp':
        $(section).print({
          globalStyles: true,
          mediaPrint: true,
          stylesheet: '/../assets/styles/rollpaper.css',
          iframe: true,
          timeout: timeout,
          append: null,
          prepend: null,
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          title: null,
          noPrintSelector: '.no-print',
          doctype: '<!doctype html>'
        });
        break;

      default:
        break;
    }
  }
}
