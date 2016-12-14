import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";

import {Hero} from"./hero";
@Injectable()
export class HeroService{
    private BASE_URL="https://hero-merge.herokuapp.com/";
    private API_KEY_URL="https://hero-merge.herokuapp.com/getApiKey";
    private API_KEY:string;
    private headers=new Headers({'Content-Type':'application/json'});
    constructor(private http:Http){   }
    getHeroes():Promise<Hero[]>{
        return this.getApiKey()
                .then(key=>{
                    this.API_KEY=key;
                    let heroUrl=this.BASE_URL+this.API_KEY+'/heroes';
                    return this.http.get(heroUrl)
                            .toPromise()
                            .then(response=>response.json() as Hero[])
                            .catch(this.handleError);  
                    })
                    .catch(this.handleError)
    }
    getApiKey():Promise<any>{
       /* return Promise.resolve(this.API_KEY);*/
        if(this.API_KEY!=null){
           // console.log("Existing key: "+this.API_KEY);
            return Promise.resolve(this.API_KEY);
        }
        return this.http.get(this.API_KEY_URL)
            .toPromise()
            .then(response=>response.json().apiKey)
            .catch(this.handleError)
    }
    handleError(error:any):Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
    addHero(hero:Hero):Promise<any>{
       // console.log(hero);
        return this.getApiKey()
                .then(key=>{
                    let heroUrl=this.BASE_URL+key+'/heroes';
                    return this.http.post(heroUrl, hero, this.headers)
                            .toPromise()
                            .then(response=>response.json())
                            .catch(this.handleError);  
                    })
                    .catch(this.handleError)
    }
}