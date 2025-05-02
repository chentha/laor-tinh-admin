import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AllService {

    baseApi = environment.baseAPI;
    finalBaseApi = this.baseApi
    ValueFilter: any

    productUrl = 'api/products';
    categoryUrl = 'api/categories';
    userUrl = 'api/users'
    orderUrl = 'api/orders'
    roleUrl = 'api/roles'
    reportUrl= 'api/reports';
    favoriteUrl = 'api/favorites';

    //order status
    orderStatusUrl = 'api/orders/order-status'

    //banner
    bannerUrl = 'api/banners'

    //shipping
    shippingUrl = 'api/shippings'

    //Notification
    notificationUrl = 'api/orders/notification'

    constructor(
        private http: HttpClient,
    ) {
    
    }

    getAllDataProduct(url: any, filter?: any) {
        let myParams = new HttpParams();

        if (this.ValueFilter === 'sortDiscount') {
            myParams = myParams.set('sortDiscount', filter);
        }

        if (this.ValueFilter === 'sortPrice') {
            myParams = myParams.set('sortPrice', filter);
        }

        if (this.ValueFilter === 'filterDate') {
            myParams = myParams.set('filterDate', filter);
        }
        
        if (this.ValueFilter === 'filter') {
            myParams = myParams.set('filter', filter);
        }

        //** condition work with array object */
        if (filter) {
            Object.keys(filter).forEach((key) => {
                if (filter[key] != null && !Array.isArray(filter[key])) {
                    myParams = myParams.set(key, filter[key]);
                }
            });
        }

        return this.http.get(this.baseApi + url, { params: myParams })
    }


    getAllDataWithFilter(url: any, filter: any) {
        let myParams = new HttpParams()
        if (filter) {
            Object.keys(filter).forEach(function (key) {
                if (filter[key] != null) {
                    myParams = myParams.append(key, filter[key])
                }
            });
        }
        return this.http.get(this.baseApi + url, { params: myParams })
    }

    getAllData(url: any, filter?: any) {
        let myParams = new HttpParams()
        if (filter) {
            Object.keys(filter).forEach(function (key) {
                if (filter[key] != null) {
                    myParams = myParams.append(key, filter[key])
                }
            });
        }
        return this.http.get(this.finalBaseApi + url, { params: myParams })
    }

    getDataById(url: any, id: any) {
        return this.http.get(this.finalBaseApi + url + id)

    }


    createData(url: any, data: any) {
        return this.http.post(this.finalBaseApi + url, data);
    }

    getData(url: any) {
        return this.http.get(this.finalBaseApi + url);
    }

    editData(url: any, data: any, id: any) {
        return this.http.put(this.finalBaseApi + url + id , data);
    }

    assignDelivery(url: any, data?: any) {
        return this.http.patch(this.finalBaseApi + url, data);
    }

    editOrder(url: any, id?: any, status?:any, data?: any) {
        return this.http.put(this.finalBaseApi + url + id + '/' + status, data);
    }


    editDataPatch(url: any, data: any, id: any) {
        return this.http.patch(this.finalBaseApi + url + id , data);
    }


    deleteData(url: any, id: any) {
        return this.http.delete(this.finalBaseApi + url + id )
    }

    getAllDataWithoutFilter(url: any) {
        return this.http.get(this.finalBaseApi + url)
    }


    getDataDetailById(url: any, id: any, filter?: any) {
        let myParams = new HttpParams()
        if (filter) {
            Object.keys(filter).forEach(function (key) {
                if (filter[key] != null) {
                    myParams = myParams.append(key, filter[key])
                }
            });
        }
        return this.http.get(this.finalBaseApi + url + id, { params: myParams })
    }

    updateFile(url : any, data : any, id : any){ 
        const req = new HttpRequest('patch', this.baseApi + url + id +'/',data, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);     
    }

}


// history params
export class HistoryAgentParams {
    member: number | undefined;
    start_date?: any;
    end_date?: any;
}