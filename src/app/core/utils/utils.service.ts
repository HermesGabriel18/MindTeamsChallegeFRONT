import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor(
        private _router: Router,
        private _sanitizer: DomSanitizer
    ) {}

    get router() {
        return this._router;
    }

    navigate(
        route: string[],
        navigationExtra?: NavigationExtras
    ): Promise<boolean> {
        return this._router.navigate(route, navigationExtra);
    }

    buildParams(params: any) {
        let paramsBuilt: HttpParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                if (params[key] && Array.isArray(params[key])) {
                    params[key].forEach(param => {
                        paramsBuilt = paramsBuilt.append(
                            `${key.toString()}[]`,
                            param
                        );
                    });
                }

                if (
                    params[key] !== null &&
                    params[key] !== undefined &&
                    !Array.isArray(params[key])
                ) {
                    paramsBuilt = paramsBuilt.append(
                        `${key.toString()}`,
                        params[key]
                    );
                }
            }
        }
        return paramsBuilt;
    }

    buildHttpOptions = ({
        pageIndex = null,
        pageSize = null,
        dontPaginate = null,
        filters = null
    }) => ({
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        params: this.buildParams({
            ...(pageIndex && {
                // tslint:disable-next-line: radix
                page: parseInt(pageIndex)
            }),
            ...(pageSize && {
                // tslint:disable-next-line: radix
                per_page: parseInt(pageSize)
            }),
            ...(dontPaginate && {
                dont_paginate: true
            }),
            ...(filters && {
                ...filters
            })
        })
    });

    compare = (
        a: number | string,
        b: number | string,
        isAsc: boolean
    ) =>
        ((typeof a === 'string' ? a.toLocaleLowerCase().trim() : a) <
        (typeof b === 'string' ? b.toLocaleLowerCase().trim() : b)
            ? -1
            : 1) * (isAsc ? 1 : -1);

    orderArray(array: any[], field: string): any[] {
        return array
            .sort((a, b) => {
                return this.compare(a[field], b[field], true);
            })
            .sort((A, B) =>
                A[field].localeCompare(B[field], 'fi', {
                    caseFirst: 'upper'
                })
            );
    }

    OnlyNumber(i) {
        if (i.value.length > 0) {
            i.value = i.value.replace(/[^\d]+/g, '');
        }
    }

    sanitize(url: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(url);
    }

    b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            const slice = byteCharacters.slice(
                offset,
                offset + sliceSize
            );

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    readFile(blob: Blob): Observable<string> {
        return Observable.create(obs => {
            const reader = new FileReader();

            reader.onerror = err => obs.error(err);
            reader.onabort = err => obs.error(err);
            reader.onload = () => obs.next(reader.result);
            reader.onloadend = () => obs.complete();

            return reader.readAsDataURL(blob);
        });
    }

    successAlert = (title: string = '', html: string = '') =>
        Swal.fire(title, html, 'success');

    errorAlert = (title: string = '', html: string = '') =>
        Swal.fire(title, html, 'warning');

    confirmDelete = (title: string = '', text: string = '') =>
        Swal.fire({
            icon: 'question',
            title,
            text,
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        });

    showNotificationError = (
        message: string,
        from = 'bottom',
        align = 'center'
    ) => {
        $.notify(
            {
                icon: 'pe-7s-close-circle',
                message
            },
            {
                type: 'danger',
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    };

    showNotificationSuccess = (
        message: string,
        from = 'top',
        align = 'right'
    ) => {
        $.notify(
            {
                icon: 'pe-7s-check',
                message
            },
            {
                type: 'success',
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    };

    showNotificationInfo = (
        message: string,
        from = 'top',
        align = 'right'
    ) => {
        $.notify(
            {
                icon: 'pe-7s-info',
                message
            },
            {
                type: 'info',
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    };
}
