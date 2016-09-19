import {Input, Component, OnInit, OnDestroy} from '@angular/core'
import {DatePipe} from '@angular/common'

@Component({
    selector: 'time-ago',
    template: `{{timeago}}`
})
export class TimeAgo implements OnInit, OnDestroy{
    @Input() time: Date
    @Input() live: boolean = true
    @Input() interval: number = 60 * 1000
    @Input() maxPeriod: number = 365 * 24 * 60 * 60 * 1000
    @Input() afterMaxDateFormat: string = 'medium'
    @Input() suffix: string = 'ago'
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
        
        if (diff > this.maxPeriod){
            let datePipe: DatePipe = new DatePipe('')
            return datePipe.transform(val, this.afterMaxDateFormat)
        }
        
        let period: {[key: string]: number} = {
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
        
        for(i in period){
            if(diff < period[i]){
                return this.makeupStr(j || 'second', Math.round(diff / (period[j] || 1000)))
            }
            j = i
        }
        return this.makeupStr(i, Math.round(diff / period[i]))
    }
    
    makeupStr(unit: string, n: number){
        return n + ' ' + unit + (n != 1 ? 's' : '') + ' ' + this.suffix
    }
    
    supports(obj: any): boolean { 
        return obj instanceof Date || typeof obj === 'number'
    }
    
    ngOnInit(){
        if(this.timer){
            clearInterval(this.timer)
        }
        if(this.time === undefined || this.time === null){
            console.warn(`time property is required.`)
        }else if(!this.supports(this.time)){
            console.error(`${this.time} isn't valid date format.`)
        }else{
            this.transform(this.time)
        }
    }
    
    ngOnDestroy(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }
}
