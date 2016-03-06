import {
  isDate,
  isNumber,
  isPresent,
  Date,
  DateWrapper,
  isBlank
} from 'angular2/src/facade/lang'
import {Input, Component, OnInit, OnDestroy} from 'angular2/core'
import {DatePipe} from 'angular2/common'

@Component({
    selector: 'time-ago',
    template: `{{timeago}}`
})
export class TimeAgo implements OnInit, OnDestroy{
    @Input() date: Date
    @Input() live: boolean = true
    @Input() interval: number = 60 * 1000
    @Input() maxPeried: number = 365 * 24 * 60 * 60 * 1000
    @Input() afterMaxDateFormat: string = 'medium'
    @Input() sufix: string = 'ago'
    private timeago: string
    private timer: any
    
    transform(val){
       this.timeago = this.getTimeAgo(val)
       if(this.live){
           this.timer = setInterval(()=> {
               this.timeago = this.getTimeAgo(val)
           }, this.interval)
       }
    }
    
    getTimeAgo(val){
        let diff: number = new Date().getTime() - new Date(val).getTime()
        
        if (diff > this.maxPeried){
            let datePipe: DatePipe = new DatePipe()
            return datePipe.transform(val, [this.afterMaxDateFormat])
        }
        
        let peried: {[key: string]: number} = {
            second: 1000,
            minute: 60 * 1000,
            hour: 60 * 60 * 1000,
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 1000 * 60,
            month: 30 * 24 * 60 * 1000 * 60,
            year: 365 * 24 * 60 * 1000 * 60
        },
        i: string,
        j: string
        
        for(i in peried){
            if(diff < peried[i]){
                return this.makeupStr(j || 'minute', Math.round(diff / (peried[j] || 1)))
            }
            j = i
        }
        return this.makeupStr(i, Math.round(diff / peried[i]))
    }
    
    makeupStr(unit: string, n: number){
        return n + ' ' + unit + (n > 1 ? 's' : '') + ' ' + this.sufix
    }
    
    supports(obj: any): boolean { 
        return isDate(obj) || isNumber(obj) 
    }
    
    ngOnInit(){
        if(this.timer){
            clearInterval(this.timer)
        }
        if(isBlank(this.date)){
            console.warn(`date property is required.`)
        }else if(!this.supports(this.date)){
            console.error(`${this.date} isn't valid date format.`)
        }else{
            this.transform(this.date)
        }
    }
    
    ngOnDestroy(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }
}