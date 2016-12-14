import {Component, OnInit, ElementRef, Renderer, ViewChild} from "@angular/core";
import {HeroService} from "./hero.service";
import {Hero} from "./hero";
import {Hero_Attribute} from "./hero_attr";

@Component({
    moduleId:module.id,
    selector: "hero-list",
    templateUrl:"./heroes.component.html"
})
export class HeroesComponent implements OnInit{
    heroes:Hero[]=[];
    selectedHero:Hero;
    heroesToMerge:Hero[]=[];
    attributesToMerge:Hero_Attribute;
    error:string;
    newHeroError:string;
    constructor(private heroService:HeroService,
                private elementRef:ElementRef,
                private renderer:Renderer){}
    ngOnInit():void{
        this.heroService.getHeroes().then(heroes=>{this.heroes=heroes});
    }
    onSelectHero(hero: Hero):void{
        this.selectedHero=hero;
    }
    newHero():void{
        this.selectedHero=new Hero();
        //console.log(this.selectedHero);
    }
    updateMergeHeroes(hero, event){
        event.stopPropagation();
        if(event.target.checked){
            this.heroesToMerge.push(hero);
        }else{
            let idx=this.heroesToMerge.indexOf(hero);
            this.heroesToMerge.splice(idx,1);
        }
       // console.log(this.heroesToMerge);
    }
    mergeHeroes():void{
        if(this.heroesToMerge.length!=2){
            this.error="Please choose TWO heroes to merge."
        }
        else{
            this.error="";
          //  console.log("Merging heroes....", this.attributesToMerge);
            this.selectedHero=new Hero();
            if(this.attributesToMerge){
                this.selectedHero.attributes=this.attributesToMerge
            }else{
                this.selectedHero.attributes=this.heroesToMerge[0].attributes;
            }
            let powers=this.heroesToMerge[0].powers.concat(this.heroesToMerge[1].powers)
            this.selectedHero.powers=this.deDuplicates(powers);
            let weaknesses=this.heroesToMerge[0].weaknesses.concat(this.heroesToMerge[1].weaknesses)
            this.selectedHero.weaknesses=this.deDuplicates(weaknesses);
         }
    }
    
    isHeroChecked(hero):boolean{
        let idx=this.heroesToMerge.indexOf(hero);
        return idx>=0;
    }
    deDuplicates(a:string[]):string[]{
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }
    onSubmitHero(hero:Hero):void{
        if(hero.powers.length>5){
            this.newHeroError="The hero can not have more than five powers."
            return;
        }
        this.newHeroError=null;
        this.heroService.addHero(hero).then(data=>{
            this.heroes.push(data)});
    }
    onClickItem(hero):void{
       let idx=this.heroesToMerge.indexOf(hero);
       if(idx<0 && this.heroesToMerge.length<2){
           this.heroesToMerge.push(hero);
       }
       if(idx>=0){
           this.heroesToMerge.splice(idx,1);
       }
    }
}