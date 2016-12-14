import {Component, OnInit, Input} from "@angular/core";
import {HeroService} from "./hero.service";
import {Hero} from "./hero";

@Component({
    selector:"hero-detail",
    templateUrl:"app/hero-detail.component.html"
})
export class HeroDetailComponent{
    @Input()
    hero:Hero;
    @Input()
    readOnly:boolean=true;

    error:string;
    constructor(private heroService:HeroService){}
    addHero():void{
        this.heroService.addHero(this.hero)
    }
    addPower(p):void{
        p=p.trim();
        if(p==""){
            return;
        }

        let idx=this.hero.powers.indexOf(p);
        
        if(idx<0){
            this.hero.powers.push(p);
        }
    }
    deletePower(p):void{
        let idx=this.hero.powers.indexOf(p);
        if(idx>=0){
            this.hero.powers.splice(idx,1);
        }
    }
    addWeakness(w):void{
        w=w.trim()
        if(w==""){
            return;
        }
        let idx=this.hero.weaknesses.indexOf(w);
        if(idx<0){
            this.hero.weaknesses.push(w);
        }
    }
    deleteWeakness(w):void{
      //  console.log(w);
        let idx=this.hero.weaknesses.indexOf(w);
        if(idx>=0){
            this.hero.weaknesses.splice(idx,1);
        }
    }
}